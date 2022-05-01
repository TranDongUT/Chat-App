import "./App.css";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Chatroom" element={<Chatroom />} />
    </Routes>
  );
}

export default App;
