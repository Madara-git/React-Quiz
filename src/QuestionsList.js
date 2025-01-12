import { useQuestion } from "./context/QuestionContext";
import Options from "./Options";

function QuestionsList() {
  const { questions, index } = useQuestion();
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options question={questions[index]} />
    </div>
  );
}

export default QuestionsList;
