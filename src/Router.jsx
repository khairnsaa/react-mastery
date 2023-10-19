import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Thread from "./pages/thread";
import NewThread from "./pages/thread/NewThread";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/new-thread" element={<NewThread />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
