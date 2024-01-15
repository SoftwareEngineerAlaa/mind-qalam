import React, { useContext, useEffect, useState } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext";

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
    <div>
      <h2>Dashboard</h2>
      <h3>Feelings Frequency</h3>
      <div>
        {Object.entries(feelingsFrequency).map(([feeling, frequency]) => (
          <p key={feeling}>{`${feeling}: ${frequency}`}</p>
        ))}
      </div>
      <p>Total Feelings Count: {totalFeelingsFrequency}</p>
      {/* TODO Other dashboard content to be completed */}
    </div>
  );
};

export default Dashboard;
