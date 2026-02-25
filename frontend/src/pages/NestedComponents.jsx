import Nested, {SayHello} from "../components/Nested";



export default function NestedComponents(){
    return (
        <>
            <Nested>
                <SayHello />
            </Nested>
        </>
    )
}