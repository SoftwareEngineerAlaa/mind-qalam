import React, { useContext, useState, useEffect } from "react";
import { ThoughtsContext } from "../../Context/ThoughtContext"; // Update the path accordingly
import "./VisualizeThoughts.css";

// TODO mostly feeling since and least feeling since
// TODO create a set of predefined responces for the compination of feelings and their frequency
// TODO Add DARK CHEST and remove bad thoughts from mainlist to dark chest
// TODO suggest the user to move bad thoughts to dark chest
// TODO color emotions according to their emotion
// TODO add a shining effect to Love and positive emotions
// TODO Let the user see how positive and negative emotions they have via line graph
// TODO add a button to show the user the most used words in their thoughts
// TODO create a negative and positive word list and suggest the user to use positive words
// TODO and not to use negative words
// TODO in the DARK CHEST make the theme scary and dark
// TODO in the forgotten list make the thoughts look like they are forgotten
// TODO by adding a dust effect to them and make them look like they are old
// TODO create an amazing visualization for the user to see their thoughts
// TODO like a tree or a flower or a galaxy or a universe or a brain

function VisualizeThoughts() {
  const { feelingsFrequency } = useContext(ThoughtsContext);
  const [circles, setCircles] = useState([]);
  const stageSize = [780, 500];
  const maxAttempts = 500; // Increased max attempts

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
    </div>
  );
}

export default VisualizeThoughts;
