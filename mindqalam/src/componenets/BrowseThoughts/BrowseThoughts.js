import React, { useContext, useState } from "react";
import Thought from "../Thought/Thought";
import "./BrowseThoughts.css";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import { Link } from "react-router-dom";

function BrowseThoughts() {
  const {
    thoughts,
    forgottenThoughts,
    forgetThought,
    deleteThought,
    lockThought,
  } = useContext(ThoughtsContext);

  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [currentForgottenIndex, setCurrentForgottenIndex] = useState(0);

  // Navigate to the next or previous thought
  const navigateThought = (isNext, isForgotten = false) => {
    if (isForgotten) {
      const newIndex = isNext
        ? (currentForgottenIndex + 1) % forgottenThoughts.length
        : (currentForgottenIndex - 1 + forgottenThoughts.length) %
          forgottenThoughts.length;
      setCurrentForgottenIndex(newIndex);
    } else {
      const newIndex = isNext
        ? (currentThoughtIndex + 1) % thoughts.length
        : (currentThoughtIndex - 1 + thoughts.length) % thoughts.length;
      setCurrentThoughtIndex(newIndex);
    }
  };

  // Check if the thoughts or forgottenThoughts arrays are null or undefined
  if (!thoughts || !forgottenThoughts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="thoughts-list-container">
      {/* Regular Thoughts */}
      {thoughts.length === 0 ? (
        <h1 className="no-thoughts-message">
          You have no thoughts yet, <Link to={"/"}>add some!</Link>
        </h1>
      ) : (
        <div>
          <h2 className="thoughts-list-title">Here are your Thoughts</h2>
          <div className="thoughts-list">
            <h1
              className="left-arrow-btn"
              onClick={() => navigateThought(false)}
            >
              ⟨
            </h1>
            <Thought
              {...thoughts[currentThoughtIndex]}
              forgetThought={forgetThought}
              lockThought={lockThought}
              isForgotten={false}
            />
            <h1
              className="right-arrow-btn"
              onClick={() => navigateThought(true)}
            >
              ⟩
            </h1>
          </div>
        </div>
      )}

      {/* Forgotten Thoughts */}
      {forgottenThoughts.length === 0 ? null : (
        <div className="forgotten-list">
          <h2 className="thoughts-list-title">Forgotten Thoughts</h2>
          <h2
            className="left-arrow-btn"
            onClick={() => navigateThought(false, true)}
          ></h2>
          <Thought
            {...forgottenThoughts[currentForgottenIndex]}
            deleteThought={deleteThought}
            isForgotten={true}
          />
          <h2
            className="right-arrow-btn"
            onClick={() => navigateThought(true, true)}
          ></h2>
        </div>
      )}
    </div>
  );
}

export default BrowseThoughts;
