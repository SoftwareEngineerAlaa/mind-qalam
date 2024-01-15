import React, { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ThoughtsContext } from "../../Context/ThoughtContext";

function AnalyzeMood() {
  const chartRef = useRef(null);
  const { thoughts } = useContext(ThoughtsContext);

  function processThoughtsData(thoughts) {
    const latestThoughts = thoughts.slice(-15); // Get the latest 15 thoughts
    const dates = latestThoughts.map((thought) => thought.inputDate);
    const values = latestThoughts.map((thought) => {
      // Logic to determine if the thought is positive or negative
      // For example, you might assign +1 for positive, -1 for negative
      return thought.feelings.includes("Happiness") ? 1 : -1;
    });

    return { dates, values };
  }

  useEffect(() => {
    const processedData = processThoughtsData(thoughts);
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: processedData.dates,
          datasets: [
            {
              label: "Feelings",
              data: processedData.values,
              // Add other dataset properties as needed
            },
          ],
        },
        options: {
          // Your chart options
        },
      });
    }
  }, [thoughts]);

  return (
    <div>
      <h1>AnalyzeMood</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default AnalyzeMood;
