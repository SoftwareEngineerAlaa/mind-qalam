import React, { useContext } from "react";
import Thought from "../Thought/Thought";
import "./BrowseThoughts.css";
import { ThoughtsContext } from "../../Context/ThoughtContext";

function BrowseThoughts() {
  const { thoughts, forgottenThoughts, forgetThought, deleteThought } =
    useContext(ThoughtsContext);

  return (
    <div className="thoughts-list-container">
      {thoughts.length === 0 ? (
        <h1 className="no-thoughts-message">
          You have no thoughts yet, add some!
        </h1>
      ) : (
        <>
          <h1>Browse Thoughts</h1>
          {thoughts.map((thought) => (
            <Thought
              key={thought.id}
              {...thought}
              forgetThought={forgetThought}
            />
          ))}
        </>
      )}

      {forgottenThoughts.length === 0 ? (
        <h1 className="no-thoughts-message"></h1>
      ) : (
        <>
          <h1>Forgotten Thoughts</h1>
          {forgottenThoughts.map((thought) => (
            <Thought
              key={thought.id}
              {...thought}
              deleteThought={deleteThought}
              isForgotten
            />
          ))}
        </>
      )}
    </div>
  );
}

export default BrowseThoughts;
