/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "../components/appQuiz.scss";

// Header Component: Displays the heading of the quiz app.
function Header() {
  return (
    <div className="heading--container">
      <h1>QUIZ APP</h1>
      <p>Simple React Quiz APP</p>
    </div>
  );
}

// ScoreBoard Component: Displays information about the current question index and the user's score.
function ScoreBoard({ data, index, score }) {
  return (
    <div className="score--board">
      <p>
        Question {index} of {data.length}
      </p>
      <p>Score: {score}</p>
    </div>
  );
}

// QuestionsBox Component: Displays the current question along with the options.
function QuestionsBox({
  data,
  index,
  question,
  score,
  onIndexChange,
  onQuestionChange,
  onScoreChange,
}) {
  if (score === 50) {
    return <Win />;
  }
  return (
    <div className="questions--box">
      {question.question}
      {/* Nested Questions component to handle rendering options */}
      <Questions
        data={data}
        index={index}
        question={question}
        score={score}
        onIndexChange={onIndexChange}
        onQuestionChange={onQuestionChange}
        onScoreChange={onScoreChange}
      />
    </div>
  );
}

// Questions Component: Renders a list of options for the current question.
function Questions({
  data,
  index,
  question,
  score,
  onIndexChange,
  onQuestionChange,
  onScoreChange,
}) {
  // Handles the user's selection of an option and updates the state accordingly.
  const handleSelected = (e) => {
    if (question.answer === e.target.value) {
      // Move to the next question, update the index, and increase the score.
      onQuestionChange(data[index]);
      onIndexChange(index <= 9 ? index + 1 : index);
      onScoreChange(score + 5);
    }
  };
  // Generates options list for the current question.
  const options = question.options.map((option, index) => {
    return (
      <li key={`${question.id}-${index}`} className="option--list-item">
        {index + 1}
        <label
          htmlFor={`option${question.id}-${index}`}
          className="option--label"
        >
          <input
            type="radio"
            id={`option${question.id}-${index}`}
            name="answer"
            value={option}
            className="option"
            onChange={handleSelected}
          />
          {option}
        </label>
      </li>
    );
  });

  return (
    <form className="options">
      <ul>{options}</ul>
    </form>
  );
}

const Win = () => {
  return <h1>YOU WIN!!!</h1>;
};
// QuizApp Component: Manages the overall state of the quiz app using the useState hook.
function QuizApp({ data }) {
  const [index, setIndex] = useState(1);
  const [question, setQuestion] = useState(data[index - 1]);
  const [score, setScore] = useState(0);

  return (
    <div className="quiz--container">
      {/* Render Header component */}
      <Header />
      {/* Render ScoreBoard component with relevant data */}
      <ScoreBoard data={data} index={index} score={score} />
      {/* Render QuestionsBox component with relevant data and callback functions */}
      <QuestionsBox
        data={data}
        index={index}
        question={question}
        onIndexChange={setIndex}
        onQuestionChange={setQuestion}
        score={score}
        onScoreChange={setScore}
      />
    </div>
  );
}

export default QuizApp;
