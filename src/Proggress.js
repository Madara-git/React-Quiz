function Proggress({ index, questionsNum, currPoints, answer, scoredPoints }) {
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
