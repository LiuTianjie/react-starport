import TopBar from "../components/top-left-bar/TopBar";
import { useRef, useState, useEffect } from "react";
import { message } from "antd";
import { Video } from "../components/Video";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
function Observe() {
  const videoSrc = useRef<MediaStream>(new MediaStream());
  const [isConnected, setConnect] = useState(false);
  const location = useLocation;
  const ws = useRef<WebSocket>(
    new WebSocket(process.env.REACT_APP_WS_LINK + "/receiver")
  );
  const configuration = {
    iceServers: [{ urls: "stun:stun.voipbuster.com:3478" }],
  };

  const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(configuration));
  pc.current.addEventListener("icecandidate", (e) => {
    console.log("ICE candidate:", { e });
    if (e.candidate) {
      ws.current.send(
        JSON.stringify({ type: "canditate", candidate: e.candidate })
      );
    }
  });
  pc.current.addEventListener("connectionstatechange", (e) => {
    console.log("state changed: ", { e });
    if (pc.current.connectionState == "connected") {
      message.success("connected!");
    }
  });
  pc.current.ontrack = (e) => {
    console.log({ e });
    videoSrc.current = e.streams[0];
    setConnect(true);
  };

  useEffect(() => {
    ws.current.onopen = function () {
      message.success("WebSocket connection starting!");
    };
    ws.current.onmessage = async function (e) {
      let msg = JSON.parse(e.data);
      console.log("Received:", { msg });
      let type = msg.type;
      switch (type) {
        case "req": {
          break;
        }
        case "offer": {
          pc.current.setRemoteDescription(new RTCSessionDescription(msg));
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          console.log("sending answer:", { answer });
          if (pc.current.connectionState !== "connected") {
            ws.current.send(
              JSON.stringify({ type: "answer", content: answer })
            );
          }
          break;
        }
        case "canditate": {
          if (msg.iceCandidate) {
            try {
              await pc.current.addIceCandidate(msg.iceCandidate);
            } catch (e) {
              console.error("Error adding received ice candidate", e);
            }
          }
          break;
        }
      }
    };
  });
  useEffect(() => {
    return () => {
      message.info("Leaving page, websocket is closed!");
      ws.current.close();
    };
  }, [location]);
  const sendReq = function () {
    console.log("sending req");
    ws.current.send(JSON.stringify({ type: "req" }));
  };
  return (
    <div>
      <TopBar link="/" name="Observe" />
      <div className="w-full rounded-md mt-4 h-5/6 flex justify-center">
        <Video
          className="w-3/4 aspect-video border-2 bg-black rounded-md"
          srcObject={videoSrc ? videoSrc.current : new MediaStream()}
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          className="mt-4 flex items-center bg-lime-500 rounded-md p-2 text-white"
          onClick={sendReq}
        >
          发起请求
          <PhoneOutlined className="ml-1" />
        </button>
      </div>
    </div>
  );
}
export default Observe;
