import React, { useContext } from "react";
import "./Thought.css";
import { ThoughtsContext } from "../../Context/ThoughtContext";

function Thought({
  id,
  feelings = [],
  inputDate,
  content,
  isForgotten,
  isInDarkChest = false,
}) {
  const {
    forgetThought,
    deleteThought,
    rememberThought,
    lockThought,
    deleteLockedThought,
  } = useContext(ThoughtsContext);

  const formatFeelings = (feelings) => feelings.join(", ");

  return (
    <div className="thought-container">
      <div className="thought-info">
        <div className="info-piece">
          <h5>Possible Mood:</h5>
          <h5>{formatFeelings(feelings)}</h5>
        </div>
        <div className="info-piece">
          <h5>Date Added:</h5>
          <h5>{inputDate}</h5>
        </div>
      </div>

      <p className="thought-content">{content}</p>

      <div className="thought-actions">
        {!isForgotten && !isInDarkChest && (
          <div>
            <button
              className="forget-thought-btn"
              onClick={() => forgetThought(id)}
            >
              Forget Thought
            </button>
            <button
              className="lock-thought-btn"
              onClick={() => lockThought(id)}
            >
              Lock Thought in the Dark Chest
            </button>
          </div>
        )}
        {isInDarkChest && (
          <div className="dark-list">
            <button
              className="delete-dark-thought-btn"
              onClick={() => deleteLockedThought(id)}
            >
              Delete Dark Thought
            </button>
          </div>
        )}

        {isForgotten && (
          <div className="forgotten-list">
            <button
              className="delete-thought-btn"
              onClick={() => deleteThought(id)}
            >
              Delete Thought
            </button>
            <button
              className="remember-thought-btn"
              onClick={() => rememberThought(id)}
            >
              Remember Thought
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Thought;
