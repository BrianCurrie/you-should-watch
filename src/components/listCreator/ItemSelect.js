import SearchItemList from './SearchItemList.js';
import ListAddedItems from './ListAddedItems.js';

import style from './ItemSelect.module.css';

export default function ItemSelect(props) {
    return (
        <div className={style.container}>
            <SearchItemList
                searchEles={props.searchEles}
                list={props.list}
                setList={props.setList}
                addMovie={props.addMovie}
            />
            <ListAddedItems
                list={props.list}
                setList={props.setList}
                removeMovie={props.removeMovie}
            />
            <button
                className={`${style.publishBtn} btn`}
                onClick={() => props.publish()}
            >
                Publish
            </button>
        </div>
    );
}
