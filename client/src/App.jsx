import { Route, Routes } from 'react-router-dom';
import Citas from './Citas';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Mascotas from './Mascotas';
import Productos from './Productos';
import './styles/App.css';
import './styles/Footer.css';
import './styles/Header.css';
import Usuarios from './Usuarios';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/citas" element={<Citas />} />


        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
