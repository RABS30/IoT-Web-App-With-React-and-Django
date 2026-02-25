import Props from "../components/Props";

export default function PropsComponents(){
    const spread = {
        text1 : 'Hello1',
        text2 : 'Hello2',
        text3 : 'Hello3',
        text4 : 'Hello4',
        text5 : 'Hello5'
    }


    return (
        <>
            {Object.values(spread).map((data) => (
                <Props nama={data} />
            ))}
        </>
    )
}