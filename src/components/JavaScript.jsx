import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import data from "../data/data.json";
import { MdNightsStay } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { CiCircleCheck } from "react-icons/ci";

function JavaScript() {
  const { themes, setThemes } = useContext(UserContext);

  const themeToggle = () => {
    const newtheme = themes ? false : true;
    setThemes(newtheme);
  };

  useEffect(() => {
    if (themes) {
      document.body.classList = "";
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [themes]);

  const questions = data[2].questions;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [nonSelectedAnswer, setNonSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false); // Track quiz completion

  const handleSelectAnswer = (option, optionIndex) => {
    if (!statusDisabled) {
      setSelectedIndex(optionIndex);
      setSelectedAnswer(option);
    }
  };

  const submitAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const correctIndex = questions[currentQuestionIndex].options.findIndex(
      (option) => option === correctAnswer
    );

    if (selectedAnswer == null) {
      alert("Please choose an option");
    } else {
      if (selectedAnswer === correctAnswer) {
        setAnswerStatus("correct");
      } else {
        setAnswerStatus("incorrect");
        setNonSelectedAnswer(correctIndex);
      }
      setStatusDisabled(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizComplete(true); // Mark the quiz as complete
    } else {
      setAnswerStatus(null);
      setSelectedIndex(null);
      setSelectedAnswer(null);
      setStatusDisabled(false);
      setNonSelectedAnswer(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-[100vh] ">
      {!quizComplete ? (
        <>
          <div className="sm:h-[15vh] h-[10vh] flex  justify-around  items-center">
            <div
              className={`flex sm:gap-2 gap-1 sm:h-[50px] sm:w-[250px] w-[110px] h-[30px] rounded-2xl ${
                themes ? "bg-violet-500" : "bg-orange-400 text-white"
              } px-2 items-center`}
            >
              <img
                src={data[2].icon}
                className={`sm:h-[35px] sm:w-[35px] h-5 w-5 p-1 rounded-md ${
                  themes ? "bg-stone-200" : "bg-orange-500"
                }`}
              />
              <p
                className={`sm:text-[25px] text-[13px] ${
                  themes ? "text-black" : "text-white"
                }`}
              >
                {data[2].title}
              </p>
            </div>
            <div className="flex gap-2">
              <MdNightsStay
                className={`sm:h-[25px] sm:w-[25px] h-4 w-4 ${
                  themes ? "text-black" : "text-white"
                }`}
              />
              <div
                onClick={themeToggle}
                className={`sm:w-[50px] sm:h-[25px] w-[30px] h-[16px] relative rounded-l-full rounded-r-full ${
                  themes ? "bg-violet-900" : "bg-orange-500"
                } `}
              >
                <div
                  className={`sm:h-[20px] sm:w-[20px] w-3 h-3 absolute top-[50%] ${
                    themes ? "right-[6%]" : "left-[6%]"
                  }  translate-y-[-50%]  active:transition-transform rounded-full bg-white`}
                ></div>
              </div>
              <MdOutlineLightMode
                className={`sm:h-[25px] sm:w-[25px] h-4 w-4 ${
                  themes ? "text-black" : "text-white"
                }`}
              />
            </div>
          </div>
          <div className="w-full sm:h-[85vh] grid place-items-center sm:grid-cols-2 grid-cols-1 ">
            <div className="w-full sm:h-[85vh] flex flex-col sm:gap-10 gap-3 sm:mt-0 mt-4 justify-evenly items-center mb-5">
              <div
                className={`w-full font-semibold grid place-items-center  ${
                  themes ? "text-black" : "text-white"
                }`}
              >
                <i className="sm:text-[20px] text-[10px]">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </i>
                <p className="sm:text-[25px] text-[11px] text-center">
                  {questions[currentQuestionIndex].question}
                </p>
              </div>

              <div>
                <input
                  type="range"
                  min="1"
                  max={questions.length}
                  value={currentQuestionIndex + 1}
                  readOnly
                  className="sm:w-[300px] w-[250px] "
                />
              </div>
            </div>
            <div className="w-full sm:h-[85vh] grid place-items-center ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitAnswer();
                }}
              >
                {questions[currentQuestionIndex].options.map(
                  (option, optionIndex) => {
                    const isCorrect =
                      answerStatus === "correct" &&
                      selectedIndex === optionIndex;
                    const isIncorrect =
                      answerStatus === "incorrect" &&
                      selectedIndex === optionIndex;
                    const nonSelected =
                      answerStatus === "incorrect" &&
                      nonSelectedAnswer === optionIndex;

                    return (
                      <div
                        key={option}
                        onClick={() => handleSelectAnswer(option, optionIndex)}
                        className={`sm:w-[400px] sm:h-14 w-[250px] h-6 flex items-center justify-between rounded-xl outline-none border-2  shadow-md  hover:cursor-pointer active:scale-[1.03] sm:hover:scale-[1.03] transition-transform px-2 gap-2 mb-5 ${themes ? 'bg-white':'bg-orange-500'}
                        ${
                          selectedIndex === optionIndex && answerStatus === null
                            ? "border-violet-500"
                            : ""
                        } 
                        ${
                          isIncorrect
                            ? "border-red-500"
                            : nonSelected
                            ? "border-green-500"
                            : ""
                        }
                         ${isCorrect ? "border-green-500" : ""}
                        `}
                      >
                        <div className="flex gap-1 sm:text-[20px] text-[8px] items-center">
                          <span
                            className={`sm:h-8 sm:w-8 h-4 w-4  grid place-items-center rounded-md ${
                              selectedIndex === optionIndex
                                ? "bg-violet-500"
                                : "bg-gray-300"
                            } `}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span>{option}</span>
                        </div>
                        <div>
                          {answerStatus === "incorrect" &&
                            selectedIndex === optionIndex && (
                              <VscError className="text-red-500 sm:w-8 sm:h-8 w-4 h-4" />
                            )}
                          {answerStatus === "incorrect" &&
                            nonSelected &&
                            nonSelectedAnswer === optionIndex && (
                              <CiCircleCheck className="text-green-500 sm:w-8 sm:h-8 w-4 h-4" />
                            )}
                          {answerStatus === "correct" &&
                            selectedIndex === optionIndex && (
                              <CiCircleCheck className="text-green-500 sm:w-8 sm:h-8 w-4 h-4" />
                            )}
                        </div>
                      </div>
                    );
                  }
                )}
                {!answerStatus && (
                  <button
                    type="submit"
                    className={`sm:w-[400px] sm:h-10 w-[250px] h-6 sm:text-[20px] [text-13px] sm:hover:scale-[1.03] active:scale-[1.03] transition-transform ${themes ? 'bg-violet-500':'bg-orange-500'} rounded-xl grid place-items-center mb-3`}
                  >
                    Submit answer
                  </button>
                )}
              </form>

              {answerStatus && (
                <button
                  onClick={handleNextQuestion}
                  className={`sm:w-[400px] sm:h-10 w-[250px] h-6 sm:text-[20px] [text-13px] sm:hover:scale-[1.03] transition-transform active:scale-[1.03] ${themes ? 'bg-violet-500':'bg-orange-500'}  rounded-xl grid place-items-center mb-3`}
                >
                  {currentQuestionIndex + 1 >= questions.length
                    ? "Finish"
                    : "Next Question"}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[100vh] grid place-items-center">
          <h1 className="text-[32px] font-bold">
            You have completed the quiz!
          </h1>
        </div>
      )}
    </div>
  );
}

export default JavaScript;
