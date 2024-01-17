import React, { useContext, useState, useEffect } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import Thought from "../Thought/Thought";
import "./DarkChest.css";
import backgroundImage from "../../assets/darkChestBackground.png";

const DarkChest = () => {
  const { lockedThoughts } = useContext(ThoughtsContext);
  const [currentLockedIndex, setCurrentLockedIndex] = useState(0);
  const [keySequence, setKeySequence] = useState("");
  const [showThoughts, setShowThoughts] = useState(false);
  const [visited, setVisited] = useState(false);

  const navigateLockedThought = (isNext) => {
    const newIndex = isNext
      ? (currentLockedIndex + 1) % lockedThoughts.length
      : (currentLockedIndex - 1 + lockedThoughts.length) %
        lockedThoughts.length;
    setCurrentLockedIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeySequence((prev) => (prev + e.key).toLowerCase().slice(-4));
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (keySequence === "show") {
      setShowThoughts(true);
    }
    const timer = setTimeout(() => {
      setVisited(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keySequence]);

  const handleKeepInchest = () => {
    setShowThoughts(false);
  };

  const thoughtClass = showThoughts ? "appear-thought" : "hide-thought";

  if (!lockedThoughts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark-chest-container">
      {lockedThoughts.length === 0 ? (
        <p>No thoughts locked yet.</p>
      ) : (
        <>
          <h1>Locked Thoughts are inside the Dark Chest</h1>
          <div className="dark-thought-container">
            <div className={visited ? thoughtClass : "dark-thought"}>
              <h1
                className="left-arrow-btn"
                onClick={() => navigateLockedThought(false)}
              >
                ⟨
              </h1>
              <Thought
                {...lockedThoughts[currentLockedIndex]}
                isInDarkChest={true}
              />
              <h1
                className="right-arrow-btn"
                onClick={() => navigateLockedThought(true)}
              >
                ⟩
              </h1>
            </div>
            {showThoughts && (
              <button onClick={handleKeepInchest} className="keep-in-chest-btn">
                Put back in the Dark chest
              </button>
            )}
            {!showThoughts && (
              <div className="show-hint">
                <h2 className="hint">To preview Dark Thought type</h2>
                <h1 className="hint">S H O W</h1>
              </div>
            )}
          </div>
        </>
      )}
      <img
        className="background-image"
        src={backgroundImage}
        alt="dark chest"
      />
    </div>
  );
};

export default DarkChest;
