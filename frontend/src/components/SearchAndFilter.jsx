export default function SearchAndFilter({changeFilterOptionHandler, filterOption, getFilteredDataHandler, showPopUpAddDevice}){
    // Component Return
    return (
        <div className="p-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                {/* Filter */}
                <div className="flex items-center gap-3">
                    {/* Filter : Type */}
                    <select onChange={changeFilterOptionHandler} id="type" value={filterOption["type"]} className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                        <option value="all">All Type</option>
                        <option value="sensor">Sensor</option>
                        <option value="actuator">Actuator</option>
                    </select>

                    {/* Filter : Status */}
                    <select onChange={changeFilterOptionHandler} id="status" value={filterOption["status"]} className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                        <option value="all">All Status</option>
                        <option value="on">On</option>
                        <option value="off">Off</option>
                    </select>

                {/* Button untuk tambah device baru */}
                <button onClick={showPopUpAddDevice} className="px-4 py-2 rounded-lg border text-white bg-green-600 hover:bg-green-700 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    Tambah device baru
                </button>
                </div>
                {/*Search */}
                <div className="relative">
                    {/* Search bar */}
                    <input onChange={changeFilterOptionHandler} id="search" type="text" value={filterOption["search"]} placeholder="Search device..." className="pl-10 pr-24 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
                    {/* Search icon */}
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/>
                    </svg>
                    {/* Apply filter button */}
                    <button type="button" onClick={getFilteredDataHandler} className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-xs px-3 py-1.5">
                        Apply & Search
                    </button>
                </div>
            </div>
        </div>
    )
}



