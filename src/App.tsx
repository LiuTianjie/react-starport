import React from "react";
import earth from "./img/earth.svg";
import glass from "./img/glass.svg";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App w-full max-h-screen flex flex-wrap content-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="border-stone-200 w-2/5 h-80 bg-white/20 rounded-xl shadow-xl backdrop-blur-sm backdrop-opacity-10">
        <div className="h-1/4 p-5">
          <header className="App-header flex justify-center">
            <p className="drop-shadow-2xl font-semibold tracking-widest text-2xl text-white">
              MIRROR
            </p>
          </header>
        </div>
        <div className="h-2/4 flex space-x-16 flex-wrap content-center justify-center">
          <Link
            to="/serve"
            className="grid justify-items-center hover:drop-shadow-2xl hover:shadow-2xl p-2 rounded-xl duration-300 hover:ring-2 hover:ring-slate-50/50"
          >
            <img src={earth} alt="logo" />
            <p className="text-white">Serve</p>
          </Link>
          <Link
            to="/observe"
            className="grid justify-items-center hover:drop-shadow-2xl hover:shadow-2xl  p-2 rounded-xl duration-300 hover:ring-2 hover:ring-slate-50/50"
          >
            <img src={glass} alt="logo" />
            <p className="text-white">Observe</p>
          </Link>
        </div>
        <div className="h1/4">
          <p className="font-sans font-light text-white text-sm pt-4">
            Server: 10.112.147.211
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
