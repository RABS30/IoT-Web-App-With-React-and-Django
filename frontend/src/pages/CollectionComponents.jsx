import Collection from "../components/Collection";


export default function CollectionComponents(){
    const data = [
        {
            id      : 1,
            text    : 'Hello World1',
            isTrue  : true
        },
        {
            id      : 2,
            text    : 'Hello World2',
            isTrue  : false
        },
        {
            id      : 3,
            text    : 'Hello World3',
            isTrue  : true
        },
        {
            id      : 4,
            text    : 'Hello World4',
            isTrue  : false
        },
    ]

    return (
        <>
            <h1>Collection</h1>
            {data.map((data) => (
                <Collection key={data.id} completed={data.isTrue} text={data.text}/>
            ))}
        </>
    )
}