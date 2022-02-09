export default function ListInfo(props) {
    const data = props.listData;
    return (
        <div>
            <div>Title: {data.title}</div>
            <div>Description: {data.description}</div>
            <div>Created by: {data.user ? data.user.name : 'Anonymous'}</div>
            <div>
                Created date: {new Date(data.timeCreated).toLocaleDateString()}
            </div>
            <div>List ID: {props.id}</div>
            <hr />
        </div>
    );
}
