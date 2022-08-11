import React from "react";

function QuestionItem({ question, onClickDelete, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={event => onChangeAnswer(event.target.value, id)}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onClickDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
