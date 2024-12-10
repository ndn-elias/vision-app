import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './pages/Main';
import './assets/style.scss';

function render() {
    const target = document.querySelector('#root');
    const root = createRoot(target);
    root.render(<Main />);
}
render();