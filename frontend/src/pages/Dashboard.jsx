import Charts from "../components/Charts";
import DeviceStatus from "../components/DeviceStatus";
import SummaryChart from "../components/SummaryChart";

export default function Dashboard(){
    return (
        <>
            <Charts />
            <DeviceStatus />
            <SummaryChart />
        </>
    )
}