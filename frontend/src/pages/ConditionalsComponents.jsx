import Conditionals, {TernaryOperator, LogicalConditionals} from "../components/Conditionals";



export default function ConditionalsComponents(){
    return (
        <>
            <Conditionals completed={true} text="Huyu"/>
            <Conditionals completed={false} text="Huyu"/>

            <TernaryOperator completed={true} text="Huyu"/>
            <TernaryOperator completed={false} text="Huyu"/>

            <LogicalConditionals completed={true} text="Huyu"/>
            <LogicalConditionals completed={false} text="Huyu"/>
        </>
    )
}