export default function SearchAndFilter({changeFilterOptionHandler, filterOption, getFilteredDataHandler, setShowAddModal}){
    // Component Return
    return (
        <div className="p-6">
            {/* Mengubah bg-white menjadi bg-white/5 (Glassmorphism) dan border ke gray-700 */}
            <div className="flex items-center justify-between bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10">
                
                {/* Filter Area */}
                <div className="flex items-center gap-3">
                    {/* Filter : Type - Menyesuaikan bg dan text ke mode gelap */}
                    <select 
                        onChange={changeFilterOptionHandler} 
                        id="type" 
                        value={filterOption["type"]} 
                        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="all" className="bg-gray-800">All Type</option>
                        <option value="sensor" className="bg-gray-800">Sensor</option>
                        <option value="actuator" className="bg-gray-800">Actuator</option>
                    </select>

                    {/* Filter : Status */}
                    <select 
                        onChange={changeFilterOptionHandler} 
                        id="status" 
                        value={filterOption["status"]} 
                        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="all" className="bg-gray-800">All Status</option>
                        <option value="on" className="bg-gray-800">On</option>
                        <option value="off" className="bg-gray-800">Off</option>
                    </select>

                    {/* Button untuk tambah device baru - Warna disesuaikan lebih vibrant */}
                    <button 
                        onClick={() => setShowAddModal(true)} 
                        className="px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95"
                    >
                        Tambah device baru
                    </button>
                </div>

                {/* Search Area */}
                <div className="relative">
                    {/* Search bar - Background gelap transparan */}
                    <input 
                        onChange={changeFilterOptionHandler} 
                        id="search" 
                        type="text" 
                        value={filterOption["search"]} 
                        placeholder="Search device..." 
                        className="pl-10 pr-32 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-500"
                    />
                    
                    {/* Search icon */}
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/>
                    </svg>

                    {/* Apply filter button */}
                    <button 
                        type="button" 
                        onClick={getFilteredDataHandler} 
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-500 font-bold rounded-md text-xs px-4 py-1.5 transition-all shadow-md shadow-blue-900/20"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}