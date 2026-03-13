// import Charts from "../components/Charts";
import Charts from "../components/Charts";
import DeviceStatus from "../components/DeviceStatus";
import SummaryChart from "../components/SummaryChart";
import Websocket from "../components/Websocket";



export default function Dashboard(){
    return (
        <>
            <Charts />
            <DeviceStatus />
            <SummaryChart />
        </>
    )
}