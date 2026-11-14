import './style.css';
import pairs from './words.json';

const KEY = 'wavelength-state-v1';
const $ = (id) => document.getElementById(id);

function shuffle(n) {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let state;
try { state = JSON.parse(localStorage.getItem(KEY)); } catch {}
if (!state || state.order?.length !== pairs.length) {
  state = { order: shuffle(pairs.length), pos: 0 };
}
const save = () => localStorage.setItem(KEY, JSON.stringify(state));

function render() {
  const p = pairs[state.order[state.pos]];
  $('wa').textContent = p.a;
  $('wb').textContent = p.b;
  $('counter').textContent = `${state.pos + 1} / ${pairs.length}`;
  $('prev').disabled = state.pos === 0;
  save();
}

function next() {
  state.pos++;
  if (state.pos >= pairs.length) state = { order: shuffle(pairs.length), pos: 0 };
  render();
}
function prev() {
  if (state.pos > 0) { state.pos--; render(); }
}

$('next').onclick = next;
$('prev').onclick = prev;

let sx = null;
addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
addEventListener('touchend', (e) => {
  if (sx == null) return;
  const dx = e.changedTouches[0].clientX - sx;
  sx = null;
  if (dx < -60) next(); else if (dx > 60) prev();
});

if ('wakeLock' in navigator) {
  const lock = () => navigator.wakeLock.request('screen').catch(() => {});
  lock();
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && lock());
}

render();
