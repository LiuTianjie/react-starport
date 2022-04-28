/*
 * @Author: LiuTao
 * @Date: 2022-04-12 16:08:00
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-28 18:38:25
 * @FilePath: /mirror/src/layout/BaseLayout.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import StarPort from "../pages/starPort/StarPort";
import { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Observe from "../pages/Observe";
import Serve from "../pages/Serve";
import Land from "../pages/StartPortDemo/Land";
import App from "../App";
import Star from "../pages/StartPortDemo/Star";

function BaseLayout() {
  const navigator = useNavigate();
  function goLand(path: string | number) {
    navigator("/land/" + path);
  }
  let images = [
    "https://images.unsplash.com/photo-1650752792851-842852aba08a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80",
    "https://images.unsplash.com/photo-1635713601835-023b8fbb3b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
    "https://images.unsplash.com/photo-1650968163166-da7e87ab4e8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1650909085203-9205d767fd3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  ].map((img, id) => {
    return (
      <img
        onClick={() => goLand(id)}
        className="w-full h-full object-cover"
        key={id}
        src={img}
      ></img>
    );
  });

  const star_port = useRef<any>(null);
  function MoveStar(
    port: number,
    classInfo: string,
    styleInfo: React.CSSProperties
  ) {
    star_port.current!.MoveStar(port, classInfo, styleInfo);
  }
  return (
    <div className="App w-full max-h-screen p-5 bg-gradient-to-r from-cyan-500 to-blue-500">
      <Routes>
        <Route path="/" element={<App move={MoveStar} />}></Route>
        <Route path="/serve" element={<Serve />}></Route>
        <Route path="/observe" element={<Observe />}></Route>
        <Route path="/land/:id" element={<Land move={MoveStar} />}></Route>
        <Route path="/star" element={<Star move={MoveStar} />}></Route>
      </Routes>
      {/* Create StarPort and expose the operation function to BaseLayout to dispath it into different routes */}
      <StarPort ref={star_port} children={images}></StarPort>
    </div>
  );
}
export default BaseLayout;
