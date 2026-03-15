export default function SensorCards({device, statusDeviceChangeHandler}){
    return (
        <>
            <div key={device.idDevice} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
                <div>
                    {/* Nama dan status color */}
                    <div className="flex justify-between items-center mb-4">             
                        <h2 className="text-lg font-semibold">
                            {device.name}
                        </h2>

                        <span className={`w-3 h-3 rounded-full ${device.status_sensor ? "bg-green-500" : "bg-red-500"}`}></span>
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
                            {device.status_sensor ? "On" : "Off"}
                        </span>
                    </p>

                    {/* Max Value */}
                    <p className="text-sm mb-2">
                        Nilai maks data :
                        <span className="ml-2 font-medium capitalize">
                            {device.maxValue} {device.measurement}
                        </span>
                    </p>

                    {/* Terakhir dilihat */}
                    <p className="text-sm mb-2">
                        Batas aman data :
                        <span className="ml-2 font-medium capitalize">
                            {device.threshold} {device.measurement}
                        </span>
                    </p>

                    {/*  Chart Type */}
                    <p className="text-sm mb-2">
                        Chart :
                        <span className="ml-2 font-medium capitalize">
                            {device.chart} Chart
                        </span>
                    </p>
                </div>
                    {/* BUTTON AREA */}
                    <div className="flex gap-3 mt-6">
                    {/* On Off Button */}
                    <button  onClick={() => statusDeviceChangeHandler(device.idDevice, device.type, device.status_sensor)}  className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.status_sensor ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                        {device.status_sensor ? "Turn OFF" : "Turn ON"}
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