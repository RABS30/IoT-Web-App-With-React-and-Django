export default function Nested({children}){
    return (
        <>
            <div>
                {children}
                <p>Ini adalah nested components</p>
            </div>
        </>
    )
}


export function SayHello(){
    return (
        <>
            <h1>Hello.....</h1>
        </>
    )
}