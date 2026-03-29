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



function App() {
  return (
    <Router>
      <Routes >
        <Route element={<GuestPage />}>
         <Route path="/login"       element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedPage />}>
          <Route element={<MainLayout />}>
            <Route path="/"         element={<Dashboard />} />
            <Route path="/account"  element={<Websocket />} />
            <Route path="/device"   element={<DeviceSettings />} />
          </Route>
        </Route>

        <Route path="/auth/google/callback/" element={<RedirectAuthGoogle />}/>
      </Routes>
    </Router>
  );
}
export default App;