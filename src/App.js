import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuestionsList from "./QuestionsList";
import Proggress from "./Proggress";
import FinshScreen from "./FinshScreen";
import NextButton from "./NextButton";
import Timer from "./Timer";
import Footer from "./Footer";

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
      console.log(state);
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

function App() {
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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Proggress
              index={index}
              questionsNum={questionsNum}
              questions={questions}
              currPoints={points}
              answer={answer}
              scoredPoints={scoredPoints}
            />
            <QuestionsList
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer timerDown={timerDown} dispatch={dispatch} />
              {answer !== null && (
                <NextButton
                  answer={answer}
                  dispatch={dispatch}
                  index={index}
                  questionsNum={questionsNum}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinshScreen
            scoredPoints={scoredPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
