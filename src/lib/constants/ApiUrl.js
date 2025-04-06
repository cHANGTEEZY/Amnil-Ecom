const mode = "prod";

const BASE_URL =
  mode === "prod"
    ? "http://192.168.0.155:3000"
    : "https://delightful-persistent-fowl.glitch.me";

export default BASE_URL;
