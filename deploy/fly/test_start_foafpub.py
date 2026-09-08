"""Boot regression checks; no real processes, users or persistent files are changed."""
from contextlib import ExitStack
from pathlib import Path
from types import SimpleNamespace
from unittest import TestCase, main
from unittest.mock import patch, MagicMock
import runpy

SCRIPT = Path(__file__).with_name('start-foafpub.py')

class BootTests(TestCase):
    def invoke(self, *, installed=True, running=False, occupied=False):
        with ExitStack() as stack:
            stack.enter_context(patch('pathlib.Path.is_file', return_value=installed))
            stack.enter_context(patch('pathlib.Path.read_text', return_value='1234'))
            stack.enter_context(patch('pathlib.Path.read_bytes', return_value=b'python3\0/data/foafpub/supervisor.py\0' if running else b'unrelated-process\0'))
            stack.enter_context(patch('pathlib.Path.chmod'))
            stack.enter_context(patch('pwd.getpwnam', return_value=SimpleNamespace(pw_uid=123, pw_gid=456)))
            stack.enter_context(patch('os.walk', return_value=[('/data/foafpub', ['current'], ['server.env'])]))
            chown = stack.enter_context(patch('os.chown'))
            popen = stack.enter_context(patch('subprocess.Popen'))
            sock = MagicMock()
            sock.__enter__.return_value.connect_ex.return_value = 0 if occupied else 111
            stack.enter_context(patch('socket.socket', return_value=sock))
            exit_code = None
            try:
                runpy.run_path(str(SCRIPT), run_name='__main__')
            except SystemExit as error:
                exit_code = error.code
            return exit_code, popen, chown

    def test_missing_installation_does_not_block_host(self):
        code, popen, chown = self.invoke(installed=False)
        self.assertEqual(code, 0)
        popen.assert_not_called()
        chown.assert_not_called()

    def test_existing_supervisor_is_not_duplicated(self):
        code, popen, _ = self.invoke(running=True)
        self.assertEqual(code, 0)
        popen.assert_not_called()

    def test_occupied_port_is_left_alone(self):
        code, popen, _ = self.invoke(occupied=True)
        self.assertIn('occupied', code)
        popen.assert_not_called()

    def test_replacement_image_starts_after_dropping_privileges(self):
        code, popen, chown = self.invoke()
        self.assertIsNone(code)
        options = popen.call_args.kwargs
        self.assertEqual(options['user'], 123)
        self.assertEqual(options['group'], 456)
        self.assertEqual(options['extra_groups'], [])
        self.assertTrue(options['start_new_session'])
        self.assertTrue(all(call.kwargs['follow_symlinks'] is False for call in chown.call_args_list))

if __name__ == '__main__':
    main()
