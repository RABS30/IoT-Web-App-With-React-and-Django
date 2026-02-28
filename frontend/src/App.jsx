import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Charts from "./components/Charts";
import RealTimeTable from "./components/RealTimeTable";
import SummaryChart from "./components/SummaryChart";
import Navbar from "./components/Navbar";
import ClientMQTTComponents from "./pages/ClientMQTTComponents";
import Dashboard from "./components/dashboard";

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
        <Route path="/mqtt"    element={<ClientMQTTComponents />} />
      </Routes>
    </Router>
  );
}
export default App;