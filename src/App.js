import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./common/components/Layout";
import AuthGuard from "./common/components/AuthGuard";
import { ROUTES } from "./common/utils/constants";
import LoginScreen from "./components/login/Login";
import SignUpScreen from "./components/signup/SignUp";
import HomeScreen from "./components/home/Home";
import NotFoundScreen from "./components/404/404";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          {/* TODO: Add others guarded routes below this line */}
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />

        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
