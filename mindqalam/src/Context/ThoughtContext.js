import React, { createContext, useState } from "react";
import useLocalStorage from "../CustomHooks/useLocalStorage";

export const ThoughtsContext = createContext();

export const ThoughtsProvider = ({ children }) => {
  const [thoughts, setThoughts] = useLocalStorage("userThoughts", []);
  const [forgottenThoughts, setForgottenThoughts] = useLocalStorage(
    "forgottenThoughts",
    []
  );
  const [feelingsFrequency, setFeelingsFrequency] = useState({});

  // Function to calculate feelings frequency
  const calculateFeelingsFrequency = () => {
    const frequency = {};
    thoughts.forEach((thought) => {
      thought.feelings.forEach((feeling) => {
        frequency[feeling] = (frequency[feeling] || 0) + 1;
      });
    });
    return frequency;
  };

  // Call this function to update the feelings frequency state
  const updateFeelingsFrequency = () => {
    const newFrequency = calculateFeelingsFrequency();
    setFeelingsFrequency(newFrequency);
  };

  // Function to add a new thought
  const addThought = (newThought) => {
    setThoughts((prevThoughts) => [...prevThoughts, newThought]);
    updateFeelingsFrequency(); // Update frequency after adding a thought
  };

  // Function to forget a thought
  const forgetThought = (thoughtId) => {
    const updatedThoughts = thoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    const forgottenThought = thoughts.find(
      (thought) => thought.id === thoughtId
    );
    setThoughts(updatedThoughts);
    setForgottenThoughts((prev) => [...prev, forgottenThought]);
    updateFeelingsFrequency(); // Update frequency after forgetting a thought
  };

  // Function to delete a thought
  const deleteThought = (thoughtId) => {
    const updatedForgottenThoughts = forgottenThoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    setForgottenThoughts(updatedForgottenThoughts);
    updateFeelingsFrequency(); // Update frequency after deleting a thought
  };

  return (
    <ThoughtsContext.Provider
      value={{
        thoughts,
        addThought,
        forgottenThoughts,
        forgetThought,
        deleteThought,
        feelingsFrequency, // Provide feelings frequency data to the context
      }}
    >
      {children}
    </ThoughtsContext.Provider>
  );
};

export default ThoughtsProvider;
