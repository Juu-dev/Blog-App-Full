import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useContext } from "react";

import { Context } from "./context/Context";

import TopBar from "./components/TopBar/TopBar";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import MyPosts from "./pages/MyPosts/MyPosts";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/posts" element={<HomePage />}></Route>
        <Route
          path="/register"
          element={user ? <HomePage /> : <Register />}
        ></Route>
        <Route
          path="/my-posts/:userId"
          element={user ? <MyPosts /> : <Login />}
        ></Route>
        <Route path="/login" element={user ? <HomePage /> : <Login />}></Route>
        <Route path="/post/:postId" element={<Single />}></Route>
        <Route path="/write" element={user ? <Write /> : <Login />}></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
