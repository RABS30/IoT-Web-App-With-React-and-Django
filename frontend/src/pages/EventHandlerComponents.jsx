import EventHandler from "../components/EventHandler"


export default function EventHandlerComponents(){
    function HandleClick(e){
        console.log(e)
    }
    
    
    return (
        <EventHandler handler={HandleClick}/>
    )

}