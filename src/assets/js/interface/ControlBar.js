const controlBar = document.querySelector('.controls');
const controls = controlBar.querySelectorAll('.control');

// DEV: Fire the correct window controlling events when our controls buttons
//      are clicked
controls[0].addEventListener('click', Emit.send.bind(Emit, 'window:minimize'));
controls[1].addEventListener('click', Emit.send.bind(Emit, 'window:maximize'));
controls[2].addEventListener('click', Emit.send.bind(Emit, 'window:close'));
