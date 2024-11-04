// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


function Menulinks() {
 
  const { themes,setIndex } = useContext(UserContext);
const local=(id)=>{
  localStorage.setItem('index',id)
}
  return (
    <div className="sm:w-[100%] w-full sm:h-[70vh]   flex flex-col sm:gap-10 gap-5 sm:justify-center items-center">
      {data.map((item,index) => {
        return (
          <Link
            to={`/${item.title}`}
            onClick={() => local(index)}
            key={item.title}
            className={`sm:w-[400px] sm:h-[50px] w-[250px] h-10 rounded-2xl flex sm:gap-5 gap-2 items-center px-3 hover:scale-[1.03] transition-transform  active:border-green-700 outline-none border-2 shadow-md   ${
              themes ? "bg-violet-500" : "text-white bg-orange-400"
            }`}
          >
            <img
              src={item.icon}
              style={{ backgroundColor: item.color }}
              className={`sm:h-[35px] sm:w-[35px] h-6 w-6 p-1    rounded-md ${
                themes ? "bg-stone-200" : "bg-orange-500"
              }`}
            />
            <p className="sm:text-[30px] text-[15px]">{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Menulinks;
