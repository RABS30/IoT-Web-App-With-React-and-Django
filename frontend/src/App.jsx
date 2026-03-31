import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";

import Charts from "./components/Charts";
import RealTimeTable from "./components/DeviceStatus";
import SummaryChart from "./components/SummaryChart";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DeviceSettings from "./pages/DeviceSettings";
import Websocket from "./components/Websocket";
import MainLayout from "./components/MainLayout";
import LoginPage from "./components/authentication/LoginPage";
import ProtectedPage from "./components/authentication/ProtectedPage";
import GuestPage from "./components/authentication/GuestPage";
import RedirectAuthGoogle from "./components/authentication/RedirectAuthGoogle";
import UserVerification from "./api/UserVerification";
import RegisterUserPage from "./components/authentication/RegisterUserPage";
import VerificationEmail from "./components/authentication/VerificationEmail";
import ResetPasswordFormPage from "./components/authentication/ResetPasswordFormPage";
import EmailResetPasswordFormPage from "./components/authentication/EmailResetPasswordFormPage";
import ChangePasswordFormPage from "./components/authentication/ChangePasswordFormPage";



function App() {
  return (
    <Router>
      <Routes >
        <Route element={<GuestPage />}>
         <Route path="/login"                     element={<LoginPage />} />  
         <Route path='/register'                  element={<RegisterUserPage />} />
         <Route path='/reset-password'            element={<EmailResetPasswordFormPage />} />
         <Route path="/confirm-email/:key"        element={<VerificationEmail />} />
         <Route path="/new-password/:uid/:token"  element={<ResetPasswordFormPage />} />
        </Route>

        <Route element={<ProtectedPage />}>
            <Route path="/change-password"   element={<ChangePasswordFormPage />} />
          <Route element={<MainLayout />}>
            <Route path="/"                   element={<Dashboard />} />
            <Route path="/account"            element={<Websocket />} />
            <Route path="/device"             element={<DeviceSettings />} />
          </Route>
        </Route>

        <Route path="/auth/google/callback/" element={<RedirectAuthGoogle />}/>
      </Routes>
    </Router>
  );
}
export default App;