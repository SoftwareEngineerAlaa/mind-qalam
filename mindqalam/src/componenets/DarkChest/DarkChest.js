import React, { useContext } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import Thought from "../Thought/Thought";

const DarkChest = () => {
  const { lockedThoughts } = useContext(ThoughtsContext);

  if (!lockedThoughts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark-chest-container">
      <h1>Locked Thoughts in the Dark Chest</h1>
      {lockedThoughts.length === 0 ? (
        <p>No thoughts locked yet.</p>
      ) : (
        lockedThoughts.map(
          (thought) =>
            thought && ( // Check if thought is not null
              <Thought key={thought.id} {...thought} isInDarkChest={true} />
            )
        )
      )}
    </div>
  );
};

export default DarkChest;
