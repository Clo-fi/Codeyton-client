import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import SignUpPage from "./routes/signup/SignUpPage";
import HomePage from "./routes/home/HomePage";
import ProfilePage from "./routes/profile/ProfilePage";
import ProblemListPage from "./routes/problemList/ProblemListPage";
import LayoutWithSideBar from "./components/layout/LayoutWithSideBar";
import PlayAlonePage from "./routes/playAlone/PlayAlonePage";
import useAuthStore from "./store/AuthStore";
import WaitingRoomPage from "./routes/waitingRoom/WaitingRoomPage";
import PlayMultiPage from "./routes/playMulti/PlayMultiPage";
import { WebSocketProvider } from "./libs/stomp/SocketProvider";

function App() {
  const { isLogined } = useAuthStore();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLogined ? <Navigate to="/home" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isLogined ? <Navigate to="/home" replace /> : <SignUpPage />}
        />
        <>
          <Route element={<LayoutWithSideBar />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/problemlist" element={<ProblemListPage />} />
          </Route>

          <Route path="/playalone/:problemId" element={<PlayAlonePage />} />
          <Route element={<WebSocketProvider />}>
            <Route path="/waiting/:roomId" element={<WaitingRoomPage />} />
            <Route
              path="/playmulti/:problemId/:roomId"
              element={<PlayMultiPage />}
            />
          </Route>
        </>
      </Routes>
    </>
  );
}

export default App;
