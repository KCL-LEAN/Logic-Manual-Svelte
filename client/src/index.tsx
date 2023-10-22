import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.module.css';
import App from './EditorViewport';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<React.StrictMode><App /></React.StrictMode>);
