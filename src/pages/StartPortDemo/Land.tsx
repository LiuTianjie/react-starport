/*
 * @Author: LiuTao
 * @Date: 2022-04-24 12:35:05
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-05-03 18:18:57
 * @FilePath: /mirror/src/pages/StartPortDemo/Land.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import StarProxy from "../starPort/StarProxy";
import { useParams, Link } from "react-router-dom";
function Land() {
  const { id } = useParams();
  return (
    <div className="w-full h-auto">
      <div className="text-white font-bold text-3xl mt-10">
        <Link to="/">GOTO Back</Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-4">
            <StarProxy
              port={id!}
              className="h-32 w-32 overflow-hidden rounded-3xl font-bold text-xl transition-all duration-1000 drop-shadow-2xl opacity-0"
            ></StarProxy>
            <p className="w-52 mr-10 text-white text-sm">
              Rapidly build modern websites without ever leaving your HTML. A
              utility-first CSS framework packed with classes like flex, pt-4,
              text-center and rotate-90 that can be composed to build any
              design, directly in your markup.
            </p>
          </div>
          <div className="flex mt-10 gap-4 justify-end">
            <p className="w-52 mr-10 text-white text-sm ">
              Rapidly build modern websites without ever leaving your HTML. A
              utility-first CSS framework packed with classes like flex, pt-4,
              text-center and rotate-90 that can be composed to build any
              design, directly in your markup.
            </p>
            <StarProxy
              port={`${parseInt(id!) + 1}`}
              className="h-32 w-32 overflow-hidden rounded-2xl font-bold text-xl transition-all duration-1000 drop-shadow-2xl  opacity-0"
            ></StarProxy>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Land;
