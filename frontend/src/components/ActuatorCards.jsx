export default function ActuatorCards({device, statusDeviceChangeHandler}){
    return (
        <>
        <div key={device.idDevice} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">  
            <div>
            {/* Nama dan status color */}
            <div className="flex justify-between items-center mb-4">             
                <h2 className="text-lg font-semibold">
                {device.name}
                </h2>
                <span className={`w-3 h-3 rounded-full ${device.status_actuator ? "bg-green-500" : "bg-red-500"}`}></span>
            </div>

            {/* ID */}
            <p className="text-sm mb-2">
                Device ID :
                <span className="ml-2 font-medium capitalize">
                {device.idDevice}
                </span>
            </p>

            {/* Jenis */}
            <p className="text-sm mb-2">
                Jenis :
                <span className="ml-2 font-medium capitalize">
                {device.type}
                </span>
            </p>

            {/* Status */}
            <p className="text-sm mb-2">
                Status:
                <span className="ml-2 font-medium capitalize">
                {device.status_actuator ?  "On" : "Off"}
                </span>
            </p>

            {/* Aktifasi */}
            <p className="text-sm mb-2">
                Aktifasi Aktuator :
                <span className="ml-2 font-medium capitalize">
                {device.comparison} {device.activation}
                </span>
            </p>

            {/* Jenis Aktifasi Aktuator */}
            {device.activation === "sensor" && <>
                <p className="text-sm mb-4">
                Sensor Target :
                <span className="ml-2 font-medium">
                    {device.sensorTarget} 
                </span>
                </p>
            </>}
            </div>

            {/* BUTTON AREA */}
            <div className="flex gap-3 mt-6">
                {/* On Off Button */}
                <button onClick={() => statusDeviceChangeHandler(device.idDevice, device.type, device.status_actuator)} className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.status_actuator ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                    {device.status_actuator ? "Turn OFF": "Turn ON"}
                </button>

                {/* Edit Button */}
                <button className="flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition">
                    Edit
                </button>

            </div>
        </div> 
        </>
    )
}


