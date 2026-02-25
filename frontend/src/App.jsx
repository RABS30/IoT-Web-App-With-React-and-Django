import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Charts from "./components/Charts";
import RealTimeTable from "./components/RealTimeTable";
import SummaryChart from "./components/SummaryChart";

function Dashboard() {
  return <div className="p-6">Halaman Dashboard</div>;
}

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
        <Route path="/" element={[<Charts />, <RealTimeTable />, <SummaryChart />]} />
        <Route path="/device" element={<DeviceSettings />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </Router>
  );
}
export default App;