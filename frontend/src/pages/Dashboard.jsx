// import Charts from "../components/Charts";
import DeviceStatus from "../components/devices/DeviceStatus";
import SummaryChart from "../components/devices/SummaryChart";
import Websocket from "../api/Websocket";
import Charts from "../utils/Charts";


export default function Dashboard(){
    return (
        <>
        <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center p-4 relative overflow-hidden">
            {/* ===== Background Decorative Blobs ===== */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>
            <Charts />
            <DeviceStatus />
            <SummaryChart />
        </div>
        </>
    )
}