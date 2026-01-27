import React from 'react'
import './index.css';
import { createRoot } from 'react-dom/client' // Use this specific import
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'

// 1. Target the root element
const container = document.getElementById('root');

// 2. Create the React root
const root = createRoot(container);

// 3. Render your app through the root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();