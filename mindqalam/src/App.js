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

// TODO MUST DO:
// TODO 1- confirmation notification for each action made by the user
// TODO 2- Create a cool logo
// TODO 4- Create a cool favicon
// TODO 1- Create cool CSS
// TODO 8- Create a cool color theme
// TODO 9- Create a cool font

// TODO Possible improvements:
// TODO 1- report sentence in Analyze and ?Dashboard?, mostly feeling since and least feeling since
// TODO 2- create a set of predefined responces for the compination of feelings and their frequency in Analyze Mood
// TODO 3- REMIND the user to move bad thoughts to dark chest
// TODO 4- Create a guide how to use website
// TODO 5- color emotions according to their emotion
// TODO 6- add a shining effect to Love and positive emotions
// TODO 7- Show the user the most used words in their thoughts and suggest them to use more positive words in the Analyze Mood
// TODO 8- Give a tip by create a negative and positive word list and suggest the user to use positive words
// TODO and not to use negative words
// TODO 9- in the DARK CHEST make the theme scary and dark with sound effects (Locking, Unlocking)
// TODO 10- in the forgotten list make the thoughts look like they are forgotten
// TODO by adding a dust effect to them and make them look like they are old
// TODO 11- create an amazing visualization for the user to see their thoughts
// TODO like a tree or a flower or a galaxy or a universe or a brain
// TODO most importantly animated with differenciation between positive and negative thoughts

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
