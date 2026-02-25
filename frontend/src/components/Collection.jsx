export default function Collection({text, completed}){
    return (
        <>
            <li>
                {completed ? <p className="text-red-800">{text}</p> : text}
            </li>
        
        </>
    )
}