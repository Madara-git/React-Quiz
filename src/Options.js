import { useQuestion } from "./context/QuestionContext";

function Options({ question }) {
  const { answer, dispatch } = useQuestion();
  return (
    <div className="options">
      {question.options.map((answers, i) => (
        <button
          onClick={() => dispatch({ type: "answer", payload: i })}
          key={answers}
          disabled={answer && true}
          className={`btn btn-option ${answer === i ? `answer` : ""} ${
            answer !== null
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {answers}
        </button>
      ))}
    </div>
  );
}

export default Options;
