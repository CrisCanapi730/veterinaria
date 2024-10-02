import Footer from './Footer';
import Header from './Header';
import './styles/App.css';
import Usuarios from './Usuarios';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Bienvenido a la Veterinaria Patito</h1>
        <Usuarios />
      </main>
      <Footer />
    </div>
  );
}

export default App;