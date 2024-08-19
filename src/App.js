import RoutesFile from "./Routes";
import "./App.css";
import NavBar from "./components/header/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import UserActivityTracker from "./components/utils/UserActivityTracker";

function App() {
  return (
    <>
      <Router>
        <UserActivityTracker />
        <RoutesFile />
      </Router>
    </>
  );
}

export default App;
