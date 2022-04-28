const config = {
    wslink: process.env.NODE_ENV === "development" ? "ws://mirrorsocket.nickname4th.vip" : "wss://mirror.nickname4th.vip"
}
export default config;