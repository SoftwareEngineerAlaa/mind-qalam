import React, { useContext } from "react";
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

  // Check if the thoughts or forgottenThoughts arrays are null or undefined
  if (!thoughts || !forgottenThoughts) {
    return <div>Loading...</div>; // Or any other placeholder content
  }

  return (
    <div className="thoughts-list-container">
      {/* Regular Thoughts */}
      {thoughts.length === 0 ? (
        <h1 className="no-thoughts-message">
          You have no thoughts yet, <Link to={"/"}>add some!</Link>
        </h1>
      ) : (
        <>
          <h1>Browse Thoughts</h1>
          {thoughts.map(
            (thought) =>
              thought && ( // Check if thought is not null
                <Thought
                  key={thought.id}
                  {...thought}
                  forgetThought={forgetThought}
                  lockThought={lockThought}
                  isForgotten={false}
                />
              )
          )}
        </>
      )}

      {/* Forgotten Thoughts */}
      {forgottenThoughts.length === 0 ? null : (
        <>
          <h1>Forgotten Thoughts</h1>
          {forgottenThoughts.map(
            (thought) =>
              thought && ( // Check if thought is not null
                <Thought
                  key={thought.id}
                  {...thought}
                  deleteThought={deleteThought}
                  isForgotten={true}
                />
              )
          )}
        </>
      )}
    </div>
  );
}

export default BrowseThoughts;
