import { useQuestion } from "./context/QuestionContext";

function NextButton() {
  const { dispatch, answer, index, questionsNum } = useQuestion();
  if (answer === null) return;

  if (index < questionsNum - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn "
      >
        Next
      </button>
    );

  if (index === questionsNum - 1)
    return (
      <button onClick={() => dispatch({ type: "finished" })} className="btn ">
        finish
      </button>
    );
}

export default NextButton;
