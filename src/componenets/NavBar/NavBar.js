import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      {/* TODO Logo to be added */}
      <Link className="button-nav" to="/Dashboard">
        <button className="btn">
          <span className="button-text">Dashboard</span>
        </button>
      </Link>
      <Link className="button-nav" to="/AddThought">
        <button className="btn">
          <span className="button-text">Add Thought</span>
        </button>
      </Link>
      <Link className="button-nav" to="/BrowseThoughts">
        <button className="btn">
          <span className="button-text">Browse Thoughts</span>
        </button>
      </Link>

      <Link className="button-nav" to="/Visualize">
        <button className="btn">
          <span className="button-text">Visualize Thoughts</span>
        </button>
      </Link>

      <Link className="button-nav" to="/AnalyzeMood">
        <button className="btn">
          <span className="button-text">Analyze Mood</span>
        </button>
      </Link>
      <Link className="button-nav-dark" to="/DarkChest">
        <button className="btn-dark">
          <span className="button-text-dark">Dark Chest</span>
        </button>
      </Link>
    </div>
  );
}

export default NavBar;
