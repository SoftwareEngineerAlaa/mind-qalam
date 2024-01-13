import React from "react";
import "./Thought.css";

function Thought({
  id,
  category, // This is currently unused but kept for future use
  feelings = [], // Array of feelings
  inputDate,
  content,
  forgetThought,
  deleteThought,
  isForgotten,
}) {
  // Function to format the feelings array into a string
  const formatFeelings = (feelings) => feelings.join(", ");

  return (
    <div className="thought-container">
      <div className="thought-info">
        {/* Category - Currently not used, but can be displayed if needed */}
        <div className="info-piece">
          <h5>Category:</h5>
          <h5>{category || "N/A"}</h5>
        </div>

        {/* Possible Mood - Display feelings */}
        <div className="info-piece">
          <h5>Possible Mood:</h5>
          <h5>{formatFeelings(feelings)}</h5>
        </div>

        {/* Date Added */}
        <div className="info-piece">
          <h5>Date Added:</h5>
          <h5>{inputDate}</h5>
        </div>
      </div>

      {/* Thought Content */}
      <p className="thought-content">{content}</p>

      {/* Thought Actions */}
      <div className="thought-actions">
        {!isForgotten && (
          <button
            className="forget-thought-btn"
            onClick={() => forgetThought(id)}
          >
            Forget Thought
          </button>
        )}
        {isForgotten && (
          <button
            className="delete-thought-btn"
            onClick={() => deleteThought(id)}
          >
            Delete Thought
          </button>
        )}
        {/* Additional button for locking the thought, if needed */}
        <button className="lock-thought-btn">
          LOCK THOUGHT IN THE DARK CHEST
        </button>
      </div>
    </div>
  );
}

export default Thought;
