import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { ShortUrlProvider } from './components/ShortUrlContext'; // Import ShortUrlProvider
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ShortUrlProvider> {/* Wrap App with ShortUrlProvider */}
      <App />
    </ShortUrlProvider>
  </BrowserRouter>
);
