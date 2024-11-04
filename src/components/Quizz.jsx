import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import data from "../data/data.json";
import { MdNightsStay } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
Link;
function Quizz() {
  const { themes, setThemes } = useContext(UserContext);

  const index = localStorage.getItem("index");
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

  const questionss = index ? data[index].questions : "";

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [nonSelectedAnswer, setNonSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false); // Track quiz completion
  const [countCorrectOption, setCountCorrectAnswerOption] = useState(0);

  const handleSelectAnswer = (option, optionIndex) => {
    if (!statusDisabled) {
      setSelectedIndex(optionIndex);
      setSelectedAnswer(option);
    }
  };
  const submitAnswer = () => {
    const correctAnswer = questionss[currentQuestionIndex].answer;
    const correctIndex = questionss[currentQuestionIndex].options.findIndex(
      (option) => option === correctAnswer
    );

    if (selectedAnswer == null) {
      alert("Please choose an option");
    } else {
      if (selectedAnswer === correctAnswer) {
        setAnswerStatus("correct");
        setCountCorrectAnswerOption(countCorrectOption + 1);
      } else {
        setAnswerStatus("incorrect");
        setNonSelectedAnswer(correctIndex);
      }
      setStatusDisabled(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= questionss.length) {
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
  useEffect(() => {
    document.title = `${data[index].title}`;
  }, [index]);

  return (
    <div className="w-full h-[100vh] ">
      {!quizComplete ? (
        <>
          <div className="sm:h-[15vh] h-[50px] flex  justify-around  items-center">
            <div
              className={`flex sm:gap-2 gap-1 sm:h-[50px] sm:w-[250px] w-[110px] h-[30px] rounded-2xl ${
                themes ? "bg-violet-500" : "bg-orange-400 text-white"
              } px-2 items-center`}
            >
              <img
                src={data[index].icon}
                className={`sm:h-[35px] sm:w-[35px] h-5 w-5 p-1 rounded-md ${
                  themes ? "bg-stone-200" : "bg-orange-500"
                }`}
              />
              <p
                className={`sm:text-[25px] text-[13px] ${
                  themes ? "text-black" : "text-white"
                }`}
              >
                {data[index].title}
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
            <div className="w-full sm:h-[80vh] flex flex-col sm:gap-10 gap-3 sm:mt-0 mt-4 justify-evenly items-center mb-5">
              <div
                className={`w-full font-semibold grid place-items-center  ${
                  themes ? "text-black" : "text-white"
                }`}
              >
                <i className="sm:text-[20px] text-[12px]">
                  Question {currentQuestionIndex + 1} of {questionss.length}
                </i>
                <p className="sm:text-[25px] text-[13px] px-2 text-center">
                  {questionss[currentQuestionIndex].question}
                </p>
              </div>

              <div>
                <input
                  type="range"
                  min="1"
                  max={questionss.length}
                  value={currentQuestionIndex + 1}
                  readOnly
                  className="sm:w-[300px] w-[300px] "
                />
              </div>
            </div>
            <div className="w-full sm:h-[80vh] flex items-center justify-center">
              <form
                className=" w-[500px] h-[400px] flex flex-col justify-center items-center sm:gap-5 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitAnswer();
                }}
              >
                {questionss[currentQuestionIndex].options.map(
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
                        className={`sm:w-[450px] sm:h-14 w-[300px] h-10 flex items-center justify-between rounded-xl outline-none border-2  shadow-md  hover:cursor-pointer active:scale-[1.03] sm:hover:scale-[1.03] transition-transform px-2 gap-2 ${
                          themes ? "bg-white" : "bg-orange-400"
                        }
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
                        <div className="flex gap-1 sm:text-[20px] sm:leading-6 leading-5 text-[9px] items-center">
                          <span
                            className={`sm:h-8 sm:w-8 h-5 w-5  grid place-items-center rounded-md ${
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
                    className={`sm:w-[450px] sm:h-10 w-[300px] h-9 sm:text-[20px] [text-13px] sm:hover:scale-[1.03] active:scale-[1.03] transition-transform ${
                      themes ? "bg-violet-500" : "bg-orange-500"
                    } rounded-xl grid place-items-center`}
                  >
                    Submit answer
                  </button>
                )}
                {answerStatus && (
                  <button
                    type="submit"
                    onClick={handleNextQuestion}
                    className={`sm:w-[450px] sm:h-10 w-[300px] h-9 sm:text-[20px] [text-13px] sm:hover:scale-[1.03] transition-transform active:scale-[1.03] ${
                      themes ? "bg-violet-500" : "bg-orange-500"
                    }  rounded-xl grid place-items-center mb-3`}
                  >
                    {currentQuestionIndex + 1 >= questionss.length
                      ? "Finish"
                      : "Next Question"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`w-full h-[100vh] grid place-items-center sm:grid-cols-2 auto-rows-auto grid-cols-1  ${
            themes ? "text-black" : "text-white"
          }`}
        >
          <h1 className="sm:text-[50px] text-[40px]">You scored...</h1>
          <div className="sm:w-[400px] sm:h-[300px] w-[250px] h-[200px] rounded-2xl flex flex-col items-center justify-evenly bg-white shadow-md">
            <div className="flex flex-col gap-2">
              <p className="text-center w-[60px] h-[60px] grid place-items-center text-[40px] bg-white shadow-md rounded-sm ">
                {countCorrectOption}
              </p>
              <span className="text-center">of {questionss.length}</span>
            </div>
            <Link
              to={"/"}
              className="w-[200px] h-10 grid place-items-center active:scale-[1.03] sm:hover:scale-[1.03] transition-transform bg-white shadow-md rounded-xl"
            >
              Try again
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizz;
