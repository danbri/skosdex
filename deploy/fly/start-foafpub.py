"""Start the installed discussion release from the persistent volume at boot.

Application code and configuration run only as the unprivileged service user.
Missing installation files do not prevent the main SKOSDEX services from starting.
"""
from pathlib import Path
import os
import pwd
import socket
import subprocess
import sys

root = Path('/data/foafpub')
required = [root / 'current/server.mjs', root / 'runtime/node', root / 'server.env', root / 'supervisor.py']
if not all(path.is_file() for path in required):
    print('[foafpub] no complete persistent installation; skipping', flush=True)
    sys.exit(0)

pidfile = root / 'supervisor.pid'
try:
    pid = int(pidfile.read_text())
    command = Path(f'/proc/{pid}/cmdline').read_bytes().split(b'\0')
    if str(root / 'supervisor.py').encode() in command:
        print('[foafpub] supervisor already running', flush=True)
        sys.exit(0)
except (OSError, ValueError):
    pass

with socket.socket() as probe:
    if probe.connect_ex(('127.0.0.1', 8000)) == 0:
        sys.exit('[foafpub] port 8000 is occupied; leaving its process alone')
try:
    account = pwd.getpwnam('foafpub')
except KeyError:
    subprocess.run(['useradd', '--system', '--no-create-home', '--home-dir', str(root),
                    '--shell', '/usr/sbin/nologin', 'foafpub'], check=True)
    account = pwd.getpwnam('foafpub')

# Service UIDs can differ between image versions. Never follow volume symlinks
# while restoring ownership; the code is subsequently executed after dropping UID.
os.chown(root, account.pw_uid, account.pw_gid, follow_symlinks=False)
for directory, directories, files in os.walk(root, followlinks=False):
    for name in directories + files:
        os.chown(Path(directory) / name, account.pw_uid, account.pw_gid, follow_symlinks=False)
(root / 'server.env').chmod(0o600)
subprocess.Popen(['python3', str(root / 'supervisor.py')], stdin=subprocess.DEVNULL,
                 stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                 start_new_session=True, user=account.pw_uid, group=account.pw_gid,
                 extra_groups=[])
print('[foafpub] started persistent discussion release as service user', flush=True)
