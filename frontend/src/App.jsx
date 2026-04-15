import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";

import Charts     from "./utils/Charts";
import Navbar     from "./utils/Navbar";
import MainLayout from "./utils/MainLayout";


import RealTimeTable from "./components/devices/DeviceStatus";
import SummaryChart from "./components/devices/SummaryChart";
import Dashboard from "./pages/Dashboard";
import DeviceSettings from "./pages/DeviceSettings";
import Websocket from "./api/Websocket";
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
import DetailProfilePage from "./pages/DetailProfilePage";
import UpdateDetailUserForm from "./components/authentication/UpdateDetailUserForm";
import NotFound from "./pages/NotFound";



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
            <Route path="/change-password"   element={<ChangePasswordFormPage />} />
          <Route element={<MainLayout />}>
            <Route path="/"                   element={<Dashboard />} />
            <Route path="/account"            element={<Websocket />} />
            <Route path="/device"             element={<DeviceSettings />} />
            <Route path="/profile"            element={<DetailProfilePage />} />
            <Route path="/update-profile"     element={<UpdateDetailUserForm />} />
          </Route>
        </Route>

        <Route path="/auth/google/callback/" element={<RedirectAuthGoogle />}/>
        <Route path="*"                      element={<NotFound />}/>
      </Routes>


    </Router>
  );
}
export default App;