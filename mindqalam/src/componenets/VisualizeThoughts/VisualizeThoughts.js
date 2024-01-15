import React, { useContext, useState, useEffect } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext"; // Update the path accordingly
import "./VisualizeThoughts.css";
import { Link } from "react-router-dom";

function VisualizeThoughts() {
  const { feelingsFrequency } = useContext(ThoughtsContext);
  const [circles, setCircles] = useState([]);
  const stageSize = [780, 500];
  // const maxAttempts = 500; // Increased max attempts

  useEffect(() => {
    createCircles();
  }, [feelingsFrequency]);

  const calculateRadius = (frequency, totalFrequency) => {
    // Reduce the multiplier to decrease the size of the circles
    return Math.sqrt((frequency / totalFrequency) * 1000) * 5; // Reduced size
  };

  const positionCircle = (newCircle, circles) => {
    const stagePadding = 10; // Padding to prevent circles from touching the stage boundaries

    // Check if the new circle overlaps with any existing circles
    const isOverlap = circles.some((circle) => {
      const distance = Math.sqrt(
        Math.pow(circle.x - newCircle.x, 2) +
          Math.pow(circle.y - newCircle.y, 2)
      );
      return distance < circle.radius + newCircle.radius;
    });

    // If overlap occurs, reposition the new circle
    if (isOverlap) {
      newCircle.x =
        Math.random() *
          (stageSize[0] - newCircle.radius * 2 - stagePadding * 2) +
        newCircle.radius +
        stagePadding;
      newCircle.y =
        Math.random() *
          (stageSize[1] - newCircle.radius * 2 - stagePadding * 2) +
        newCircle.radius +
        stagePadding;
      return positionCircle(newCircle, circles); // Recursively reposition the circle
    }

    // Check if the new circle is within the stage boundaries
    if (
      newCircle.x - newCircle.radius < stagePadding ||
      newCircle.x + newCircle.radius > stageSize[0] - stagePadding ||
      newCircle.y - newCircle.radius < stagePadding ||
      newCircle.y + newCircle.radius > stageSize[1] - stagePadding
    ) {
      newCircle.x =
        Math.random() *
          (stageSize[0] - newCircle.radius * 2 - stagePadding * 2) +
        newCircle.radius +
        stagePadding;
      newCircle.y =
        Math.random() *
          (stageSize[1] - newCircle.radius * 2 - stagePadding * 2) +
        newCircle.radius +
        stagePadding;
      return positionCircle(newCircle, circles); // Recursively reposition the circle
    }

    return newCircle;
  };

  const createCircles = () => {
    const totalFrequency = Object.values(feelingsFrequency).reduce(
      (total, freq) => total + freq,
      0
    );
    const newCircles = [];
    Object.entries(feelingsFrequency).forEach(([emotion, frequency]) => {
      const radius = calculateRadius(frequency, totalFrequency);
      let newCircle = {
        emotion,
        radius,
        x: Math.random() * (stageSize[0] - radius * 2) + radius,
        y: Math.random() * (stageSize[1] - radius * 2) + radius,
      };
      newCircle = positionCircle(newCircle, newCircles);
      newCircles.push(newCircle);
    });
    setCircles(newCircles);
  };

  return (
    <div className="visualize-container">
      <h1>Visualize Thoughts</h1>
      {circles.length === 0 ? (
        <h1 className="no-thoughts-message">
          You have not enought thoughts to visualize,{" "}
          <Link to={"/"}>add some!</Link>
        </h1>
      ) : (
        <div
          className="visualization-stage"
          style={{ width: stageSize[0], height: stageSize[1] }}
        >
          {circles.map((circle, index) => (
            <div
              key={index}
              className="circle"
              style={{
                width: circle.radius * 2,
                height: circle.radius * 2,
                left: circle.x - circle.radius,
                top: circle.y - circle.radius,
              }}
            >
              {circle.emotion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VisualizeThoughts;
