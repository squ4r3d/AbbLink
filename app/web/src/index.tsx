import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //Appコンポーネントをインポート

//html上の書き出す場所を指定
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

//Appコンポーネントを呼び出す
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);