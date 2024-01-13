import React, { createContext, useState } from "react";
import useLocalStorage from "../CustomHooks/useLocalStorage";

export const ThoughtsContext = createContext();

export const ThoughtsProvider = ({ children }) => {
  const [thoughts, setThoughts] = useLocalStorage("userThoughts", []);
  const [forgottenThoughts, setForgottenThoughts] = useLocalStorage(
    "forgottenThoughts",
    []
  );
  const [feelingsFrequency, setFeelingsFrequency] = useLocalStorage(
    "feelingsFrequency",
    {}
  );

  const calculateFeelingsFrequency = () => {
    const frequency = {};
    thoughts.forEach((thought) => {
      thought.feelings.forEach((feeling) => {
        frequency[feeling] = (frequency[feeling] || 0) + 1;
      });
    });
    return frequency;
  };

  const updateFeelingsFrequency = () => {
    const newFrequency = calculateFeelingsFrequency();
    setFeelingsFrequency(newFrequency);
  };

  const addThought = (newThought) => {
    setThoughts((prevThoughts) => [...prevThoughts, newThought]);
    updateFeelingsFrequency();
  };

  const forgetThought = (thoughtId) => {
    const updatedThoughts = thoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    const forgottenThought = thoughts.find(
      (thought) => thought.id === thoughtId
    );
    setThoughts(updatedThoughts);
    setForgottenThoughts((prev) => [...prev, forgottenThought]);
    updateFeelingsFrequency();
  };

  const deleteThought = (thoughtId) => {
    const updatedForgottenThoughts = forgottenThoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    setForgottenThoughts(updatedForgottenThoughts);
    updateFeelingsFrequency();
  };

  return (
    <ThoughtsContext.Provider
      value={{
        thoughts,
        addThought,
        forgottenThoughts,
        forgetThought,
        deleteThought,
        feelingsFrequency,
      }}
    >
      {children}
    </ThoughtsContext.Provider>
  );
};

export default ThoughtsProvider;
