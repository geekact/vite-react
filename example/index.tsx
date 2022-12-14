import ReactDom from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = ReactDom.createRoot(container);

root.render(<App />);
