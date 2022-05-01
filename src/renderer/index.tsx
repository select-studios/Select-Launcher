/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
