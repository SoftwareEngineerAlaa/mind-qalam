import React, { useContext } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";

const Dashboard = () => {
  const { feelingsFrequency } = useContext(ThoughtsContext);

  // Calculate total feelings frequency
  const totalFeelingsFrequency = Object.values(feelingsFrequency).reduce(
    (total, freq) => total + freq,
    0
  );

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Feelings Frequency</h3>
      <div>
        {Object.entries(feelingsFrequency).map(([feeling, frequency]) => (
          <p key={feeling}>{`${feeling}: ${frequency}`}</p>
        ))}
      </div>
      <p>Total Feelings Count: {totalFeelingsFrequency}</p>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
