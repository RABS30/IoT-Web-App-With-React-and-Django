export default function Conditionals({text, completed}){
    if (completed){
         return (
            <>
                <h1>kondisi terpenuhi, {completed}, {text}</h1>
            </>
         )
    }else{
        return null
    }
}

export function TernaryOperator({text, completed}){
    return (
        <>
            {completed ? <h1 className="text-xl">Kondisi terpenuhi {text}</h1> : <p>tidak terpenuhi {text}</p>}
        </>
    )
}


export function LogicalConditionals({text, completed}){
    return (
        <>
        <p>
            kondisi OR  {String(completed)} = {completed || 'ini operator OR ✅'}
        </p>
        <p>
            kondisi AND {String(completed)} = {completed && 'ini operator AND ✅'}
        </p>
        <br />
        </>
    )
}

