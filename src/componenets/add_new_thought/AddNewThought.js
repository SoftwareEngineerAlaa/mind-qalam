import React, { useEffect, useState, useContext } from "react";
import { v4 as idGenerator } from "uuid";
import { Link, Navigate } from "react-router-dom";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import "./AddNewThought.css";

function AddNewThought() {
  const [thoughtContent, setThoughtContent] = useState("");
  const [showFeelings, setShowFeelings] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [returnBtn, setReturnBtn] = useState("Nothing in my mind right now");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isThoughtSaved, setIsThoughtSaved] = useState(false);

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
    setShowFeelings(true);
  }

  function handleAddFeeling() {
    const newThought = {
      id: idGenerator(),
      content: thoughtContent,
      feelings: selectedFeelings,
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
    setSuccessMessage("✅Thought Saved Successfully");
    setTimeout(() => {
      setRedirectToDashboard(true);
    }, 2000); // Redirect after 2 seconds
    setThoughtContent("");
    setSelectedFeelings([]);
    setShowFeelings(false);
  }

  const feelingsList = [
    "Happy",
    "Thankful",
    "Love",
    "Trust",
    "Joy",
    "Optimism",
    "Anticipation",
    "Surprise",
    "Sadness",
    "Fear",
    "Disgust",
    "Anger",
    "Pessimism",
    "Frustration",
    "Shame",
    "Guilt",
  ];

  const feelingsType = {
    positive: feelingsList.slice(0, 8),
    negative: feelingsList.slice(8, 16),
  };

  function getFeelingClassName(feeling) {
    if (feelingsType.positive.includes(feeling)) {
      return "positive-feeling";
    } else if (feelingsType.negative.includes(feeling)) {
      return "negative-feeling";
    }
    return "";
  }

  function handleFeelingSelection(feeling) {
    setSelectedFeelings((prev) => {
      if (prev.includes(feeling)) {
        return prev.filter((f) => f !== feeling);
      } else {
        return [...prev, feeling];
      }
    });
  }

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  if (isThoughtSaved) {
    return (
      <div className="success-message">
        ✅Thought Saved Successfully
        <br />
        you can see it in Browse Thoughts Page
      </div>
    );
  }

  return (
    <div className="add-new-thought-container">
      {successMessage && (
        <div className="success-message">
          <h1>{successMessage}</h1>
        </div>
      )}
      {!showFeelings ? (
        <>
          <input
            value={thoughtContent}
            onChange={(e) => setThoughtContent(e.target.value)}
            className="input"
            type="text"
            id="thought"
            name="thought"
            placeholder="Write your thought here..."
            autoComplete="off"
          />
          {thoughtContent.length > 0 && (
            <button
              onClick={handleSaveThought}
              className="save-input-btn"
              type="button"
            >
              Save This Thought
            </button>
          )}
        </>
      ) : (
        <>
          <label>
            How do you feel when writing this thought?
            <br />
            You could choose more than one:
          </label>
          <div className="feelings-list">
            {feelingsList.map((feeling) => (
              <div key={feeling}>
                <input
                  type="checkbox"
                  className="checkbox-btn"
                  id={feeling}
                  name={feeling}
                  checked={selectedFeelings.includes(feeling)}
                  onChange={() => handleFeelingSelection(feeling)}
                />
                <label
                  className={getFeelingClassName(feeling)}
                  htmlFor={feeling}
                >
                  {feeling}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddFeeling}
            className="add-feeling-btn"
            type="button"
            disabled={selectedFeelings.length === 0}
          >
            {selectedFeelings.length === 0
              ? "Select one or several Feelings"
              : `Attach Feeling${
                  selectedFeelings.length > 1 ? "s and Save" : " and Save"
                }`}
          </button>
        </>
      )}
      <Link className="nothing-link" to="/dashboard">
        <button className="nothing-now-btn" type="button">
          {returnBtn}
        </button>
      </Link>
    </div>
  );
}

export default AddNewThought;
