#!/usr/bin/env python3
# Shared embedding model for skosdex. The corpus builder (embed_scheme.py) and the
# query sidecar (embed_query.py) MUST use the identical model, pooling, and prompt
# convention or their vectors won't be comparable — so it lives in one place.
#
# Model: intfloat/multilingual-e5-large-instruct  (Microsoft; fine-tune of Meta's
# XLM-RoBERTa-large). MIT. 1024-dim, ~100 languages incl. Finnish.
#   - mean pooling over masked tokens, then L2-normalize
#   - DOCUMENTS (concept labels) are embedded with NO prefix
#   - QUERIES are embedded with the e5-instruct template:
#       "Instruct: {task}\nQuery: {text}"
# Runs on CPU via onnxruntime + HF tokenizers. Model files load from
# SKOSDEX_MODEL_DIR (default ~/.cache/skosdex-e5): a pre-quantized model_int8.onnx
# is used if present (smaller/faster), else the fp32 model.onnx (fetched if absent).
import os, urllib.request, numpy as np, onnxruntime as ort
from tokenizers import Tokenizer

MODEL = 'multilingual-e5-large-instruct'
DIR = os.environ.get('SKOSDEX_MODEL_DIR', os.path.expanduser('~/.cache/skosdex-e5'))
MAXLEN = int(os.environ.get('SKOSDEX_EMB_MAXLEN', '192'))
# task description prepended to free-text queries (documents get none)
TASK = os.environ.get('SKOSDEX_EMB_TASK',
    'Given a search query, retrieve SKOS concepts (controlled-vocabulary terms) matching its meaning')
BASE = 'https://huggingface.co/intfloat/multilingual-e5-large-instruct/resolve/main'
FILES = {
    'model.onnx':      f'{BASE}/onnx/model.onnx',
    'model.onnx_data': f'{BASE}/onnx/model.onnx_data',
    'tokenizer.json':  f'{BASE}/onnx/tokenizer.json',
}


def _ensure():
    os.makedirs(DIR, exist_ok=True)
    tok_path = os.path.join(DIR, 'tokenizer.json')
    if not os.path.exists(tok_path) or os.path.getsize(tok_path) < 1000:
        urllib.request.urlretrieve(FILES['tokenizer.json'], tok_path)
    int8 = os.path.join(DIR, 'model_int8.onnx')
    if os.path.exists(int8) and os.path.getsize(int8) > 1_000_000:
        return int8, tok_path
    for n in ('model.onnx', 'model.onnx_data'):
        p = os.path.join(DIR, n)
        if not os.path.exists(p) or os.path.getsize(p) < 1000:
            urllib.request.urlretrieve(FILES[n], p)
    return os.path.join(DIR, 'model.onnx'), tok_path


_tok = _sess = _innames = _dim = None


def load():
    global _tok, _sess, _innames, _dim
    if _sess is not None:
        return
    model_path, tok_path = _ensure()
    _tok = Tokenizer.from_file(tok_path)
    _tok.enable_truncation(max_length=MAXLEN)
    _tok.enable_padding(pad_id=1, pad_token='<pad>')          # XLM-R pad id
    # CPU by default; on a GPU box set SKOSDEX_EMB_PROVIDERS=CUDAExecutionProvider
    # (needs onnxruntime-gpu) to embed the corpus orders of magnitude faster.
    providers = [p.strip() for p in os.environ.get(
        'SKOSDEX_EMB_PROVIDERS', 'CPUExecutionProvider').split(',') if p.strip()]
    _sess = ort.InferenceSession(model_path, providers=providers)
    _innames = {i.name for i in _sess.get_inputs()}
    d = _sess.get_outputs()[0].shape[-1]
    _dim = d if isinstance(d, int) else 1024


def fmt_query(text):
    return f'Instruct: {TASK}\nQuery: {text}'


def embed(texts, is_query=False):
    """Embed a list of strings -> (n, dim) float32, L2-normalized. Queries get the
    e5-instruct template; documents (concept labels) are passed through verbatim."""
    load()
    batch = [fmt_query(t) for t in texts] if is_query else list(texts)
    enc = _tok.encode_batch(batch)
    ii = np.array([e.ids for e in enc], dtype=np.int64)
    mm = np.array([e.attention_mask for e in enc], dtype=np.int64)
    feed = {'input_ids': ii, 'attention_mask': mm}
    if 'token_type_ids' in _innames:
        feed['token_type_ids'] = np.zeros_like(ii)
    out = _sess.run(None, feed)[0]
    m = mm[:, :, None].astype(np.float32)
    v = (out * m).sum(1) / np.clip(m.sum(1), 1e-9, None)      # masked mean pool
    v /= np.clip(np.linalg.norm(v, axis=1, keepdims=True), 1e-9, None)  # L2
    return v.astype(np.float32)


def dim():
    load()
    return _dim
