import React, { useContext } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import Thought from "../Thought/Thought";
import "./DarkChest.css";
import backgroundImage from "../../assets/darkChestBackground.png";

const DarkChest = () => {
  const { lockedThoughts } = useContext(ThoughtsContext);

  if (!lockedThoughts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark-chest-container">
      <h1>Locked Thoughts are inside the Dark Chest</h1>
      {lockedThoughts.length === 0 ? (
        <p>No thoughts locked yet.</p>
      ) : (
        <div className="dark-thought">
          {lockedThoughts.map(
            (thought) =>
              thought && (
                <Thought key={thought.id} {...thought} isInDarkChest={true} />
              )
          )}
        </div>
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
