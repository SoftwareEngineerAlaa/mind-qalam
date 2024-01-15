import React, { useEffect, useState, useContext } from "react";
import { v4 as idGenerator } from "uuid";
import { Link } from "react-router-dom";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import "./AddNewThought.css";

function AddNewThought() {
  const [thoughtContent, setThoughtContent] = useState("");
  const [showFeelings, setShowFeelings] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [returnBtn, setReturnBtn] = useState("Nothing in my mind right now");

  useEffect(() => {
    const interval = setInterval(() => {
      setReturnBtn((prevBtn) =>
        prevBtn === "Nothing in my mind right now"
          ? "Go to Dashboard"
          : "Nothing in my mind right now"
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const { addThought } = useContext(ThoughtsContext);

  function handleSaveThought() {
    setShowFeelings(true); // Transition to feelings selection
  }

  function handleAddFeeling() {
    const newThought = {
      id: idGenerator(),
      content: thoughtContent,
      feelings: selectedFeelings, // Store selected feelings
      inputDate: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    addThought(newThought);
    setThoughtContent("");
    setSelectedFeelings([]);
    setShowFeelings(false); // Optionally reset to initial state
  }

  const feelingsList = [
    "Happiness",
    "Sadness",
    "Fear",
    "Disgust",
    "Anger",
    "Surprise",
    "Love",
    "Joy",
    "Trust",
    "Anticipation",
    "Optimism",
    "Pessimism",
    "Frustration",
    "Shame",
    "Guilt",
  ];

  function handleFeelingSelection(feeling) {
    setSelectedFeelings((prev) => {
      if (prev.includes(feeling)) {
        return prev.filter((f) => f !== feeling);
      } else {
        return [...prev, feeling];
      }
    });
  }

  return (
    <div className="add-new-thought-container">
      {!showFeelings ? (
        <>
          <label className="input-label" htmlFor="thought">
            Type what do you have in mind?
          </label>
          <input
            value={thoughtContent}
            onChange={(e) => setThoughtContent(e.target.value)}
            className="input"
            type="text"
            id="thought"
            name="thought"
          />
          <button
            onClick={handleSaveThought}
            className="save-input-btn"
            type="button"
          >
            Save This Thought
          </button>
        </>
      ) : (
        <>
          <label>How do you feel? Choose one or more:</label>
          <div className="feelings-list">
            {feelingsList.map((feeling) => (
              <div key={feeling}>
                <input
                  type="checkbox"
                  id={feeling}
                  name={feeling}
                  checked={selectedFeelings.includes(feeling)}
                  onChange={() => handleFeelingSelection(feeling)}
                />
                <label htmlFor={feeling}>{feeling}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddFeeling}
            className="add-feeling-btn"
            type="button"
          >
            Add Feeling
          </button>
        </>
      )}
      <Link to="/dashboard">
        <button className="nothing-now-btn" type="button">
          {returnBtn}
        </button>
      </Link>
    </div>
  );
}

export default AddNewThought;
