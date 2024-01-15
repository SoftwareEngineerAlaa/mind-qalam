import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "../CustomHooks/useLocalStorage";

export const ThoughtsContext = createContext();

export const ThoughtsProvider = ({ children }) => {
  const [thoughts, setThoughts] = useLocalStorage("userThoughts", []);
  const [forgottenThoughts, setForgottenThoughts] = useLocalStorage(
    "forgottenThoughts",
    []
  );
  const [lockedThoughts, setLockedThoughts] = useLocalStorage(
    "lockedThoughts",
    []
  );

  const [feelingsFrequency, setFeelingsFrequency] = useLocalStorage(
    "feelingsFrequency",
    {}
  );

  useEffect(() => {
    updateFeelingsFrequency();
  }, [thoughts]);

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
  };

  const rememberThought = (thoughtId) => {
    const updatedThoughts = forgottenThoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    const rememberedThought = forgottenThoughts.find(
      (thought) => thought.id === thoughtId
    );
    setForgottenThoughts(updatedThoughts);
    setThoughts((prev) => [...prev, rememberedThought]);
  };

  const lockThought = (thoughtId) => {
    const updatedThoughts = thoughts.filter(
      (thought) => thought.id !== thoughtId
    );
    const lockedThought = thoughts.find((thought) => thought.id === thoughtId);
    setThoughts(updatedThoughts);
    setLockedThoughts((prev) => [...prev, lockedThought]);
  };

  const deleteThought = (thoughtId) => {
    const updatedForgottenThoughts = forgottenThoughts.filter((thought) => {
      return thought && thought.id !== thoughtId;
    });
    setForgottenThoughts(updatedForgottenThoughts);
  };

  const deleteLockedThought = (thoughtId) => {
    const updatedLockedThoughts = lockedThoughts.filter((thought) => {
      return thought && thought.id !== thoughtId;
    });
    setLockedThoughts(updatedLockedThoughts);
  };

  return (
    <ThoughtsContext.Provider
      value={{
        thoughts,
        addThought,
        forgottenThoughts,
        forgetThought,
        deleteThought,
        rememberThought,
        lockThought,
        deleteLockedThought,
        lockedThoughts,
        feelingsFrequency,
      }}
    >
      {children}
    </ThoughtsContext.Provider>
  );
};

export default ThoughtsProvider;
