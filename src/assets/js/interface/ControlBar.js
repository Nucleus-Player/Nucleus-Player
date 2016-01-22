const controlBar = document.querySelector('.controls');
const min = controlBar.querySelector('#min');
const max = controlBar.querySelector('#max');
const close = controlBar.querySelector('#close');

// DEV: Fire the correct window controlling events when our controls buttons
//      are clicked
if (min) {
  min.addEventListener('click', () => {
    Emit.send('window:minimize', window.WINDOW_ID || null);
  });
}
if (max) {
  max.addEventListener('click', () => {
    Emit.send('window:maximize', window.WINDOW_ID || null);
  });
}
if (close) {
  close.addEventListener('click', () => {
    Emit.send('window:close', window.WINDOW_ID || null);
  });
}
