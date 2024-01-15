import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AddNewThought from "./componenets/add_new_thought/AddNewThought";
import Dashboard from "./componenets/Dashboard/Dashboard";
import VisualizeThoughts from "./componenets/VisualizeThoughts/VisualizeThoughts";
import BrowseThoughts from "./componenets/BrowseThoughts/BrowseThoughts";
import AnalyzeMood from "./componenets/AnalyzeMood/AnalyzeMood";
import NavBar from "./componenets/NavBar/NavBar";
import { ThoughtsProvider } from "./Context/ThoughtContext";
import DarkChest from "./componenets/DarkChest/DarkChest";

function App() {
  return (
    <div className="App">
      <Router>
        <ThoughtsProvider>
          <RoutesWithNavBar />
        </ThoughtsProvider>
      </Router>
    </div>
  );
}

function RoutesWithNavBar() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<AddNewThought />} />
        <Route path={"/Dashboard" || "/dashboard"} element={<Dashboard />} />
        <Route path="/Visualize" element={<VisualizeThoughts />} />
        <Route path="/BrowseThoughts" element={<BrowseThoughts />} />
        <Route path="/AnalyzeMood" element={<AnalyzeMood />} />
        <Route path="/DarkChest" element={<DarkChest />} />
      </Routes>
    </>
  );
}

export default App;
