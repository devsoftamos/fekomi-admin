 import RoutesFile from './Routes';
import './App.css';
import NavBar from './components/header/NavBar';
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  
  return (
    <>
      
      <Router>
      <RoutesFile />
    </Router>
      
    </>
  );
}

export default App;
