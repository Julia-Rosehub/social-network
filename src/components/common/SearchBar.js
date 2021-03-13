import React, { useRef, useEffect } from 'react';
import { FaSistrix } from 'react-icons/fa';

import s from './SearchBar.module.css';

const SearchBar = (props) => {
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    })

    return <div className={s.headerTopSearch}>
        <form className={s.searchForm}>
            <input ref={inputRef} className={s.searchForm__input} type='text'
                placeholder='Search'>
            </input>
            <button className={s.searchForm__button}
                onClick={() => console.log(inputRef.current)}>
                <i><FaSistrix />
                </i>
            </button>
        </form>
    </div>
}

export default SearchBar;