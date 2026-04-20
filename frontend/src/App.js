import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import { hasToken } from "./utils/tokenStorage";

function App() {
  const [auth, setAuth] = useState(hasToken());
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      {/* Always render toaster */}
      <Toaster position="top-right" />

      {!auth ? (
        showRegister ? (
          <>
            <Register switchToLogin={() => setShowRegister(false)} />
          </>
        ) : showForgotPassword ? (
          <>
            <ForgotPassword switchToLogin={() => setShowForgotPassword(false)} />
          </>
        ) : (
          <>
            <Login
              setAuth={setAuth}
              switchToRegister={() => setShowRegister(true)}
              switchToForgotPassword={() => setShowForgotPassword(true)}
            />
          </>
        )
      ) : (
        <Dashboard setAuth={setAuth} />
      )}
    </>
  );
}

export default App;