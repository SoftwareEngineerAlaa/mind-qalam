import React, { useContext, useEffect, useState } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import GaugeMeter from "../GaugeMeter/GaugeMeter";
import "./Dashboard.css";

const Dashboard = () => {
  const { feelingsFrequency } = useContext(ThoughtsContext);
  const [totalFeelingsFrequency, setTotalFeelingsFrequency] = useState(0);

  useEffect(() => {
    // Calculate total feelings frequency when feelingsFrequency changes
    const totalFrequency = Object.values(feelingsFrequency).reduce(
      (total, freq) => total + freq,
      0
    );
    setTotalFeelingsFrequency(totalFrequency);
  }, [feelingsFrequency]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="first-row">
        <div className="thoughts-stats-container boxing">
          <h3 className="total-stats-title">Total Stats</h3>
          <div className="thoughts-stats">
            <h3>
              <span className="number-span">15</span> Thoughs
            </h3>
            <h3>
              <span className="number-span">20</span> Fogotten thoughs
            </h3>
            <h3>
              <span className="number-span">5</span> Locked thoughs
            </h3>
          </div>
        </div>
        <div className="gauge-meter boxing">
          <h3>Mood Meter for the last 5 thoughts</h3>
          <GaugeMeter
            lowerValue={50}
            higherValue={-50}
            // total positive frequency - total negative frequency out of 100%
            currentValue={25}
          />
          <h3>Mostly: Positive</h3>
        </div>
      </div>

      <div className="total-feelings">
        {/* <h3>Feelings Stats</h3> */}
        <div className="feelings-stats">
          <div className="positive boxing">
            <h3 className="positive-stats">
              Positive Types <span className="number-span">3</span>
              <br className="br"></br>
              Frequency Counter<span className="number-span">3</span>
            </h3>
            <div className="feelings-display">
              <h4 className="feel-content">
                Love <span className="number-span">3</span>
              </h4>
              <h4 className="feel-content">
                Joy <span className="number-span">3</span>
              </h4>
              <h4 className="feel-content">
                Optimism <span className="number-span">3</span>
              </h4>
            </div>
          </div>
          <div className="negative boxing">
            <h3 className="negative-stats">
              Negative Types <span className="number-span">3</span> <br />
              Frequency Counter <span className="number-span">3</span>
            </h3>
            <div className="feelings-display">
              <h4 className="feel-content">
                Anger <span className="number-span">3</span>
              </h4>
              <h4 className="feel-content">
                Sad <span className="number-span">3</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="lastest-thought-container boxing">
        <h3 className="lastest-thought-title">Latest Thought</h3>
        <p className="lastest-thought">
          Latest thought hereLatest thought hereLatest thought hereLatest
          thought hereLatest thought heret thought hereLatest thought hereLatest
          thought hereLatest thought hereLatest thought here
        </p>
      </div>

      {/* <img
        className="mind-qalam-big-logo"
        src="https://i.imgur.com/2ZQ9QpQ.png"
        alt="dashboard"
      /> */}
      {/* <div className="documentation">Documentation</div> */}
    </div>
  );
};

export default Dashboard;

{
  /* <h3>Feelings Frequency</h3> */
}
{
  /* <div>
        {Object.entries(feelingsFrequency).map(([feeling, frequency]) => (
          <p key={feeling}>{`${feeling}: ${frequency}`}</p>
        ))}
      </div> */
}
{
  /* <p>Total Feelings Count: {totalFeelingsFrequency}</p> */
}
{
  /* TODO Other dashboard content to be completed */
}
{
  /* <GaugeMeter lowerValue={0} higherValue={100} currentValue={50} /> */
}
