import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      {/* TODO Logo to be added */}
      <Link className="button-26" to="/Dashboard">
        <button className="btn">
          <span className="button-26__text">Dashboard</span>
        </button>
      </Link>
      <Link className="button-26" to="/AddThought">
        <button className="btn">
          <span className="button-26__text">Add Thought</span>
        </button>
      </Link>
      <Link className="button-26" to="/BrowseThoughts">
        <button className="btn">
          <span className="button-26__text">Browse Thoughts</span>
        </button>
      </Link>

      <Link className="button-26" to="/Visualize">
        <button className="btn">
          <span className="button-26__text">Visualize Thoughts</span>
        </button>
      </Link>

      <Link className="button-26" to="/AnalyzeMood">
        <button className="btn">
          <span className="button-26__text">Analyze Mood</span>
        </button>
      </Link>
      <Link className="button-26" to="/DarkChest">
        <button className="btn">
          <span className="button-26__text">Dark Chest</span>
        </button>
      </Link>
    </div>
  );
}

export default NavBar;

// function NavBar() {
//   return (
//     <div className="nav-bar">
//       {/* TODO Logo to be added */}
//       <Link className="button-26" to="/Dashboard">
//         <button className="dashboard-btn">
//           <span className="button-26__text">Dashboard</span>
//         </button>
//       </Link>
//       <Link className="button-26" to="/">
//         <button className="thought-btn">
//           <span className="button-26__text">Add Thought</span>
//         </button>
//       </Link>
//       <Link className="button-26" to="/BrowseThoughts">
//         <button className="browse-btn">
//           <span className="button-26__text">Browse Thoughts</span>
//         </button>
//       </Link>

//       <Link className="button-26" to="/Visualize">
//         <button className="visualize-btn">
//           <span className="button-26__text">Visualize Thoughts</span>
//         </button>
//       </Link>

//       <Link className="button-26" to="/AnalyzeMood">
//         <button className="analyze-btn">
//           <span className="button-26__text">Analyze Mood</span>
//         </button>
//       </Link>
//       <Link className="button-26" to="/DarkChest">
//         <button className="dark-chest-btn">
//           <span className="button-26__text">Dark Chest</span>
//         </button>
//       </Link>
//     </div>
//   );
// }
