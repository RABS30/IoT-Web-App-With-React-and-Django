import Charts from "./Charts";
import RealTimeTable from "./RealTimeTable";
import SummaryChart from "./SummaryChart";


export default function Dashboard(){
    return (
        <>
            <Charts />
            <RealTimeTable />
            <SummaryChart />
        </>
    )
}