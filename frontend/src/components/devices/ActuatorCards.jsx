export default function ActuatorCards({device, statusDeviceChangeHandler}){
    return (
        <>
        <div key={device.idDevice} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between transition-all hover:border-blue-500/50">  
            <div>
                {/* Nama dan status color */}
                <div className="flex justify-between items-center mb-4">             
                    <h2 className="text-lg font-bold text-white">
                        {device.name}
                    </h2>
                    <span className={`w-3 h-3 rounded-full shadow-[0_0_10px] ${device.status_actuator ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50"}`}></span>
                </div>

                <div className="space-y-2 text-gray-300">
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Device ID</p>
                    <p className="text-sm font-medium mb-3 text-white">{device.idDevice}</p>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Jenis</p>
                            <p className="text-sm capitalize text-white">{device.type}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Status</p>
                            <p className={`text-sm font-bold ${device.status_actuator ? "text-green-400" : "text-red-400"}`}>
                                {device.status_actuator ? "On" : "Off"}
                            </p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1">
                        <p className="text-sm">
                            <span className="text-gray-500">Aktifasi:</span> 
                            <span className="ml-2 text-white font-medium capitalize">{device.activation === 'manual' ? device.activation : `${device.comparison} ${device.activationValue} `}</span>
                        </p>

                        {device.activation === "sensor" && (
                            <p className="text-sm">
                                <span className="text-gray-500">Target:</span> 
                                <span className="ml-2 text-blue-400 font-medium">{device.sensorTarget}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* BUTTON AREA */}
            <div className="flex gap-3 mt-6">
                <button onClick={() => statusDeviceChangeHandler(device.idDevice, device.type, device.status_actuator)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all transform active:scale-95 ${device.status_actuator ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white" : "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-white"}`}>
                    {device.status_actuator ? "Turn OFF": "Turn ON"}
                </button>

                <button className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all transform active:scale-95 shadow-lg shadow-blue-600/20">
                    Edit
                </button>
            </div>
        </div> 
        </>
    )
}