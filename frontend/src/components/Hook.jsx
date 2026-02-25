import { useState } from "react";

export default function Hook(){
    const initialData = {
        name    : 'Robert',
        message : 'Practical Design'  
    }


    const [counter, setCounter] = useState(initialData);

    function setName(e){
        setCounter({...counter, name :e.target.value});
    }

    function setMessage(e){
        setCounter({...counter, message : e.target.value});
    }


    return (
        <>
            <form action="POST">
                <input type="text" placeholder="Name"       value={counter.name}    onChange={setName} />
                <input type="text" placeholder="Message"    value={counter.message} onChange={setMessage} />
            </form>


            <h1>Contact Detail</h1>
            <p>Name     : {counter.name}</p>
            <p>Message  : {counter.message}</p>
        </>

    )
}