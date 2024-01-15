import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { ThoughtsContext } from "../../Context/ThoughtContext";
import "./AnalyzeMood.css";

function AnalyzeMood() {
  const chartRef = useRef(null);
  const { thoughts } = useContext(ThoughtsContext);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    if (myChart !== null) {
      myChart.destroy();
    }

    const processedData = processThoughtsData(thoughts);

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: processedData.dates,
        datasets: [
          {
            label: `Mood Swings: ${
              processedData.scores.reduce((a, b) => a + b, 0) > 0
                ? "Mostly Positive"
                : "Mostly Negative"
            }`,
            data: processedData.scores,
            backgroundColor: processedData.scores.map((value) =>
              value >= 0 ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
            ),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                if (value > 0) return "Positive";
                if (value < 0) return "Negative";
                return "Neutral";
              },
            },
          },
        },
      },
    });

    setMyChart(newChart);

    return () => {
      if (newChart !== null) {
        newChart.destroy();
      }
    };
  }, [thoughts]);

  return (
    <div>
      <h1>Analyze Mood</h1>
      <canvas ref={chartRef} className="mood-chart"></canvas>
    </div>
  );
}

export default AnalyzeMood;

function processThoughtsData(thoughts) {
  const latestThoughts = thoughts.slice(-15);

  const positiveFeelings = [
    "Happy",
    "Thankful",
    "Love",
    "Joy",
    "Trust",
    "Anticipation",
    "Optimism",
  ];
  const negativeFeelings = [
    "Sadness",
    "Fear",
    "Disgust",
    "Anger",
    "Pessimism",
    "Frustration",
    "Shame",
    "Guilt",
  ];

  const scores = latestThoughts.map((thought) => {
    let score = 0;
    thought.feelings.forEach((feeling) => {
      if (positiveFeelings.includes(feeling)) score++;
      if (negativeFeelings.includes(feeling)) score--;
    });
    return score;
  });

  const dates = latestThoughts.map((thought) => {
    const date = new Date(thought.inputDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  });

  return { dates, scores };
}
