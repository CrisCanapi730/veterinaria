import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Footer from './Footer.jsx';
import './Header.css';
import Header from './Header.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <App />
    <Footer/>
  </StrictMode>,
)