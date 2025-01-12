const { createContext, useContext, useEffect, useReducer } = require("react");

const QuestionContext = createContext();
const initial = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highScore: 0,
  timerDown: null,
};
function renducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "datafailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        timerDown: state.questions.length * 30,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
        timerDown: null,
      };

    case "timer":
      return {
        ...state,
        timerDown: state.timerDown - 1,
        status: state.timerDown === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("UNKNOWN VALUE");
  }
}

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, timerDown },
    dispatch,
  ] = useReducer(renducer, initial);

  const questionsNum = questions.length;
  const scoredPoints = questions
    .map((question) => question.points)
    .reduce((acc, point) => acc + point, 0);

  useEffect(() => {
    fetchQuestions();
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8001/questions`);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (er) {
        console.log(er);
        dispatch({ type: "error" });
      }
    }
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timerDown,
        questionsNum,
        scoredPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("useQuestion must be used within a QuestionProvider");
  return context;
}

export { useQuestion, QuestionProvider };
