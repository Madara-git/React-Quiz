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
import { useQuestion } from "./context/QuestionContext";

function App() {
  const { status, answer } = useQuestion();
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "start" && (
          <>
            <Proggress />
            <QuestionsList />

            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
        {status === "finished" && <FinshScreen />}
      </Main>
    </div>
  );
}

export default App;
