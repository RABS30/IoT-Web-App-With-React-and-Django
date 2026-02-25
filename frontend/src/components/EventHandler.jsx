export default function EventHandler({handler}){
    return (
        <button onClick={handler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-200">Button</button>

    )
}