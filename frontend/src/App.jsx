import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Charts from "./components/Charts";
import RealTimeTable from "./components/DeviceStatus";
import SummaryChart from "./components/SummaryChart";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";


function DeviceSettings() {
  return <div className="p-6">Halaman Device Settings</div>;
}

function AccountSettings() {
  return <div className="p-6">Halaman Account Settings</div>;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Dashboard />} />
        <Route path="/device"   element={<DeviceSettings />} />
        <Route path="/account"  element={<AccountSettings />} />
      </Routes>
    </Router>
  );
}
export default App;