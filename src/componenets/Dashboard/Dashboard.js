import React, { useContext, useEffect, useState } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import GaugeMeter from "../GaugeMeter/GaugeMeter";
import "./Dashboard.css";

const Dashboard = () => {
  const { thoughts, forgottenThoughts, lockedThoughts, feelingsFrequency } =
    useContext(ThoughtsContext);

  const [totalFeelingsFrequency, setTotalFeelingsFrequency] = useState(0);

  useEffect(() => {
    const totalFrequency = Object.values(feelingsFrequency).reduce(
      (total, freq) => total + freq,
      0
    );
    setTotalFeelingsFrequency(totalFrequency);
  }, [feelingsFrequency]);

  const calculateMoodMeterValue = (thoughts) => {
    let moodValue = 0;
    const lastFiveThoughts = thoughts.slice(0, 5);

    lastFiveThoughts.forEach((thought) => {
      thought.feelings.forEach((feeling) => {
        if (isFeelingPositive(feeling)) {
          moodValue += 1;
        } else {
          moodValue -= 1;
        }
      });
    });
    console.log(moodValue);

    return moodValue * 10;
  };

  const isFeelingPositive = (feeling) => {
    const positiveFeelings = [
      "Happy",
      "Thankful",
      "Love",
      "Trust",
      "Joy",
      "Optimism",
      "Anticipation",
      "Surprise",
    ];
    return positiveFeelings.includes(feeling);
  };

  const positiveFeelings = {};
  const negativeFeelings = {};

  Object.entries(feelingsFrequency).forEach(([feeling, frequency]) => {
    if (isFeelingPositive(feeling)) {
      positiveFeelings[feeling] = frequency;
    } else {
      negativeFeelings[feeling] = frequency;
    }
  });

  let moodMeterValue = calculateMoodMeterValue(thoughts);
  console.log(moodMeterValue);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="first-row">
        <div className="thoughts-stats-container boxing">
          <h3 className="total-stats-title">Total Stats</h3>
          <div className="thoughts-stats">
            <h3>
              <span className="number-span">{thoughts.length}</span> Thoughts
            </h3>
            <h3>
              <span className="number-span">{forgottenThoughts.length}</span>{" "}
              Forgotten Thoughts
            </h3>
            <h3>
              <span className="number-span">{lockedThoughts.length}</span>{" "}
              Locked Thoughts
            </h3>
          </div>
        </div>
        {/* Gauge Meter */}
        <div className="gauge-meter boxing">
          <h3>Mood Meter for the last 5 thoughts</h3>
          <GaugeMeter
            lowerValue={50}
            higherValue={-50}
            // currentValue={moodMeterValue}
            currentValue={10} // for the showcase
          />
          <h3>
            Mostly:{" "}
            <span className="mood-pos-neg">
              {isFeelingPositive ? "Positive" : "Negative"}
            </span>
          </h3>
        </div>
      </div>
      <div className="total-feelings">
        <div className="feelings-stats">
          {/* Positive feelings stats */}
          <div className="positive boxing">
            <h3 className="positive-stats">
              Positive Types{" "}
              <span className="number-span">
                {Object.keys(positiveFeelings).length}
              </span>
              <br />
              Frequency Counter{" "}
              <span className="number-span">
                {Object.values(positiveFeelings).reduce((a, b) => a + b, 0)}
              </span>
            </h3>
            <div className="feelings-display">
              {Object.entries(positiveFeelings).map(([feeling, frequency]) => (
                <h4 key={feeling} className="feel-content-positive">
                  {feeling} <span className="number-span">{frequency}</span>
                </h4>
              ))}
            </div>
          </div>

          {/* Negative feelings stats */}
          <div className="negative boxing">
            <h3 className="negative-stats">
              Negative Types{" "}
              <span className="number-span">
                {Object.keys(negativeFeelings).length}
              </span>
              <br />
              Frequency Counter{" "}
              <span className="number-span">
                {Object.values(negativeFeelings).reduce((a, b) => a + b, 0)}
              </span>
            </h3>
            <div className="feelings-display">
              {Object.entries(negativeFeelings).map(([feeling, frequency]) => (
                <h4 key={feeling} className="feel-content-negative">
                  {feeling} <span className="number-span">{frequency}</span>
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lastest-thought-container boxing">
        <h3 className="lastest-thought-title">Latest Thought</h3>
        <p className="lastest-thought">
          {thoughts[0]?.content || "No thoughts available"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
