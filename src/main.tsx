import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './components/Toast';
import './index.css';

window.addEventListener('error', (event) => {
  document.body.innerHTML = `<pre style="padding:20px;color:red;white-space:pre-wrap;font-size:16px">STARTUP ERROR:\n${event.error?.stack || event.message}</pre>`;
});

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = `<pre style="padding:20px;color:red;white-space:pre-wrap;font-size:16px">PROMISE ERROR:\n${event.reason?.stack || event.reason}</pre>`;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}
