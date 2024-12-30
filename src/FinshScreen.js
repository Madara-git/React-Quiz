const initial = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highScore: 0,
};

function FinshScreen({ points, scoredPoints, highScore, dispatch }) {
  const percentage = (points / scoredPoints) * 100;
  console.log(percentage);
  return (
    <>
      <div className="result">
        <p>
          You scored {points} out of {scoredPoints}({Math.ceil(percentage)}%)
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
