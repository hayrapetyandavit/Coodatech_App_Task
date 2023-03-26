import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layout/MainLayout";
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";

import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Board />} />
          </Route>
          <Route
            path="*"
            element={<ErrorMessage message="404 - Page Not Found" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
