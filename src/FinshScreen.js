import { useQuestion } from "./context/QuestionContext";

function FinshScreen() {
  const { points, scoredPoints, highScore, dispatch } = useQuestion();
  const percentage = (points / scoredPoints) * 100;
  return (
    <>
      <div className="result">
        <p>
          You scored {points} out of {scoredPoints} ({Math.ceil(percentage)}%)
        </p>
      </div>
      <p className="highscore"> highscore {highScore} points</p>
      <button onClick={() => dispatch({ type: "reset" })} className="btn">
        Rest
      </button>
    </>
  );
}

export default FinshScreen;
