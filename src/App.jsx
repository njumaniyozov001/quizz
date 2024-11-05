import { useContext, useState } from "react";
import Menulinks from "./components/Menulinks";
import { UserContext } from "./Contexts/UserContext";
import Header from "./components/Header";
import Footer from './components/Footer'

const App = () => {
  const { themes } = useContext(UserContext);

  return (
    <div className="relative w-full h-[100vh] box-border">

      <Header />
      <main className="w-full sm:h-[70vh] grid grid-cols-1 gap-y-10 sm:grid-cols-2 place-items-center ">
        <div className="w-full sm:h-[70vh]  grid place-items-center">
          <p
            className={`sm:text-[40px] sm:mb-20 text-[25px] sm:leading-10 leading-7 ${
              themes ? "text-black" : "text-white"
            }`}
          >
            Welcome to the <br />
            <span className="font-bold">Frontend quizApp</span> <br />
            <span className="font-Cursive sm:text-[20px] text-[15px]">
              pick a subject to get startted
            </span>
          </p>
        </div>
        <Menulinks />
      </main>
      <Footer/>

    </div>
  );
};

export default App;
