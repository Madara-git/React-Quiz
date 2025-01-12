import { useQuestion } from "./context/QuestionContext";

function Proggress() {
  const { index, questionsNum, currPoints, answer, scoredPoints } =
    useQuestion();
  return (
    <header className="progress">
      <progress max={questionsNum} value={index + Number(answer !== null)} />
      <p>
        {index + 1} / {questionsNum}
      </p>
      <p>
        {currPoints} / {scoredPoints}
      </p>
    </header>
  );
}

export default Proggress;
