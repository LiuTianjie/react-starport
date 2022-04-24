import { useState, useRef, useEffect } from "react";
import { message } from "antd";
import BaseLayout from "../layout/BaseLayout";
import { Video } from "../components/Video";
import TopBar from "../components/top-left-bar/TopBar";
import { FundViewOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

interface MirrorPc {
  [id: string]: RTCPeerConnection;
}

interface Res {
  id: string;
  msg: {
    type: string;
    content: any;
  };
}

function Serve() {
  const location = useLocation;
  const pcs = useRef<MirrorPc>({});
  const ws = {
    current: new WebSocket("wss://mirror.nickname4th.vip/offer"),
  };
  const videoSrc = useRef<MediaStream>(new MediaStream());
  const configuration = {
    iceServers: [{ urls: "stun:stun.voipbuster.com:3478" }],
  };
  const [isConnected, setConnect] = useState(false);

  useEffect(() => {
    console.log("rebing!");
    ws.current.onopen = function (e) {
      message.success("WebSocket connection starting!");
    };
    ws.current.onmessage = async function (e) {
      let res: Res = JSON.parse(e.data);
      let id = res.id;
      let type = res.msg.type;
      console.log("Received msg:", res);
      switch (type) {
        case "answer": {
          console.log(`Received answer from ${id}`);
          const remoteDesc = new RTCSessionDescription(
            res.msg.content as RTCSessionDescriptionInit
          );
          await pcs.current[id].setRemoteDescription(remoteDesc);
          await sendOffer(pcs.current[id], id);
          break;
        }
        case "canditate": {
          console.log(`Received canditate from ${id}`);
          if (res.msg.content.iceCandidate) {
            try {
              await pcs.current[id].addIceCandidate(
                res.msg.content.iceCandidate
              );
            } catch (e) {
              console.log(`Error adding received ice candidate from ${id}`, e);
            }
          }
          break;
        }
        case "req": {
          createPc(id);
          break;
        }
        case "hangup": {
          break;
        }
      }
    };
  });

  // Once Serve received a req, create a peerConnection and put it into MirrorPc
  async function createPc(id: string) {
    console.log("creating peerConnection");
    let pc = new RTCPeerConnection(configuration);
    pc.addEventListener("icecandidate", async (e) => {
      console.log("ICE canditate:", { e });
      if (e.candidate) {
        ws.current!.send(
          JSON.stringify({ id: id, content: { candidate: e.candidate } })
        );
      }
    });
    pc.addEventListener("connectionstatechange", (e) => {
      console.log("State changed: ", { e });
      if (pc.connectionState === "connected") {
        console.log("Connected!");
      }
    });
    videoSrc.current.getTracks().forEach((track) => {
      console.log(track);
      pc.addTrack(track, videoSrc.current);
    });
    pcs.current[id] = pc;
    await sendOffer(pcs.current[id], id);
  }

  async function sendOffer(pc: RTCPeerConnection, id: string) {
    const offer = await pc.createOffer();
    console.log("sending offer:", { offer });
    await pc.setLocalDescription(offer);
    let offerDesc = {
      id,
      content: offer,
    };
    ws.current?.send(JSON.stringify(offerDesc));
  }

  async function choseShare() {
    await navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: true })
      .then(async (stream) => {
        videoSrc.current = stream;
        setConnect(true);
        stream.getTracks()[0].addEventListener("ended", () => {});
      });
  }

  const stopShare = function () {
    // If it is at init state, avoid to stop it.
    if (videoSrc.current.getTracks().length !== 0) {
      videoSrc.current.getTracks()[0].stop();
    }
  };
  useEffect(() => {
    return () => {
      message.info("Leaving page, websocket is closed!");
      ws.current.close();
      stopShare();
    };
  }, [location]);
  return (
    <BaseLayout>
      <TopBar
        link="/"
        name={isConnected ? "Serve (sharing...)" : "Serve (not connected)"}
      />
      <div className="w-full h-5/6 rounded-md mt-4 flex justify-center">
        <Video
          className="w-3/4 aspect-video border-2 bg-black rounded-md"
          srcObject={videoSrc ? videoSrc.current : new MediaStream()}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="sm:5/6 md:w-2/5 lg:w-1/4 h-12 mt-4 grid grid-cols-2 rounded-lg content-center overflow-hidden ring-white">
          <button
            className="h-12 bg-slate-400 text-white  hover:bg-blue-800  duration-300"
            onClick={choseShare}
          >
            <div className="flex justify-center items-center">
              <FundViewOutlined
                className="mr-2"
                style={{ fontSize: "20px", alignSelf: "center" }}
              />
              <p className="m-0">选择共享屏幕</p>
            </div>
          </button>
          <button
            className="h-12 font-md bg-slate-400 text-white hover:bg-red-600 duration-300"
            onClick={stopShare}
          >
            <div className="flex justify-center content-center">
              <CloseCircleOutlined
                className="mr-2"
                style={{ fontSize: "20px", alignSelf: "center" }}
              />
              <p className="m-0">结束共享</p>
            </div>
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Serve;
