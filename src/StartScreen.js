import { useQuestion } from "./context/QuestionContext";

function StartScreen() {
  const { dispatch, questionsNum } = useQuestion();
  function handleStartGame() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsNum} QuStartestions to test your react mastery</h3>
      <button onClick={handleStartGame} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
