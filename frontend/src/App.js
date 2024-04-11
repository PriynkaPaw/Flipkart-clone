import logo from './logo.svg';
import './App.css';
import Nav from '../src/component/Nav'
import Header from './component/Header';
import Carousel from './component/Carousel';
import Cart from './component/Cart';
import ElectronicsCartHolder from './component/ElectronicsCartHolder';
import Footer from './component/Footer';
import Routing from './router/Routing';
function App() {
  return (
    <div className="App">
      <Routing />
   
    </div>
  );
}

export default App;
