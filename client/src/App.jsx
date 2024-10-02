import { Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Usuarios from './Usuarios';
import './styles/App.css';
import './styles/Footer.css';
import './styles/Header.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
