import { useContext, useEffect, useState } from "react";
import { MdNightsStay } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { UserContext } from "../Contexts/UserContext";
import { NavLink } from "react-router-dom";

function Header() {
  const [date, setDate] = useState("");
  const [time, seTime] = useState();
  const { themes, setThemes } = useContext(UserContext);
  function set_date() {
    const now = new Date();
    let day = now.getDate();
    let mon = now.getMonth() + 1;
    let year = now.getFullYear();
    day = day > 9 ? day : "0" + day;
    mon = mon > 9 ? mon : "0" + mon;
    setDate(day + "." + mon + "." + year);

    let our = now.getHours();
    our = our >= 10 ? our : "0" + our;
    let min = now.getMinutes();
    min = min >= 10 ? min : "0" + min;
    let sec = now.getSeconds();
    sec = sec >= 10 ? sec : "0" + sec;
    seTime(our + ":" + min + ":" + sec);
  }
  setInterval(() => {
    set_date();
  }, 1000);

  const themeToggle = () => {
    const newtheme = themes == true ? false : true;
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

  return (
    <header className="sm:h-[15vh] h-[50px] w-full  flex items-center justify-around">
      <div className="font-bold leading-4 text-xl">
        <p
          className={`${
            themes ? "text-black" : "text-white"
          } sm:text-[26px] text-[15px]`}
        >
          {date}
        </p>
        <p
          className={`${
            themes ? "text-black" : "text-white"
          } sm:text-[26px] text-[15px]`}
        >
          {time}
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
    </header>
  );
}

export default Header;
