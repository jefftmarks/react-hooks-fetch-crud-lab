import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleDelete(deletedId) {
    fetch(`http://localhost:4000/questions/${deletedId}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        const newQuestions = questions.filter(question => {
          return question.id !== deletedId;
        })
        setQuestions(newQuestions);
      })
  }

  function handleChangeAnswer(correctIndex, changedId) {
    fetch(`http://localhost:4000/questions/${changedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"correctIndex": parseInt(correctIndex)})
    })
      .then(res => res.json())
      .then(updatedQuestion => {
        const newQuestions = questions.map(question => {
          if (question.id === changedId) {
            return updatedQuestion;
          } else {
            return question;
          }
        })
        setQuestions(newQuestions);
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onClickDelete={handleDelete}
            onChangeAnswer={handleChangeAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
