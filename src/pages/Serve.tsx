import { useState, useEffect, useRef, useCallback } from "react";
import { Video } from "../components/Video";
import TopBar from "../components/top-left-bar/TopBar";
import BaseLayout from "../layout/BaseLayout";
import { useLocation } from "react-router-dom";
function Serve() {
  const location = useLocation;
  const [videoSrc, setVideoSrc] = useState<MediaStream>(new MediaStream());
  const ws = useRef<WebSocket>(new WebSocket("ws://10.28.141.52:8080/offer"));

  ws.current.onopen = function (e) {
    console.log("WebSocket connection starting!");
  };

  ws.current.onclose = function (evt) {
    console.log("Connection closed.");
    ws.current.send("connection closed!");
  };

  // Click to choose share which to share.
  const clickToShareScreen = async function () {
    await navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        setVideoSrc(stream);
        stream.getVideoTracks()[0].addEventListener("ended", () => {
          console.log("用户停止共享屏幕！");
        });
      })
      .catch((error) => {
        console.log("获取视频流失败！");
      });
  };

  // Stop Shareing function.
  // If it is at init state, avoid to stop it.
  const stopShare = useRefCallBack(() => {
    if (videoSrc.getTracks().length != 0) {
      videoSrc.getTracks()[0].stop();
    }
  }, [videoSrc]);

  // useRefCallback function
  function useRefCallBack(fn: () => void, deps: MediaStream[]) {
    const ref = useRef(fn);
    useEffect(() => {
      ref.current = fn;
    }, [fn, deps]);
    return useCallback(() => {
      const fn = ref.current;
      return fn();
    }, [ref]);
  }

  // Close the sharing videoSrc before leaving page.
  // Note: This useEffect get "stopShare" function after the page is loaded,
  // which capture the inital value of videoSrc and it's not the videoSrc
  // we later choosed, so we should make sure it capture the newest videoSrc.
  useEffect(() => {
    return () => {
      console.log("leaving page");
      ws.current.close();
      stopShare();
    };
  }, [location]);

  // Start make call.
  const makeCall = function () {};
  return (
    <BaseLayout>
      {/* top-left-bar */}
      <TopBar link="/" name="Serve" />
      {/* video-component */}
      <div className="w-full rounded-md mt-4 h-4/5 flex justify-center">
        <Video
          className="w-full aspect-video border-2 bg-black rounded-md"
          srcObject={videoSrc ? videoSrc : new MediaStream()}
        />
      </div>
      {/* control-bar */}
      <div className="w-full flex justify-center">
        <div className="w-1/2 h-12 mt-4 grid grid-cols-3 rounded-lg content-center overflow-hidden ring-white">
          <button
            className="h-12 bg-slate-400 text-white  hover:bg-blue-800  duration-300"
            onClick={clickToShareScreen}
          >
            <div className="flex justify-center content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <p>选择共享屏幕</p>
            </div>
          </button>
          <button
            className="h-12 font-md bg-slate-400  text-white hover:bg-lime-600 duration-300"
            onClick={makeCall}
          >
            <div className="flex justify-center content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              <p> 开始共享</p>
            </div>
          </button>
          <button
            className="h-12 font-md bg-slate-400 text-white hover:bg-red-600 duration-300"
            onClick={stopShare}
          >
            <div className="flex justify-center content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              <p>结束共享</p>
            </div>
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Serve;
