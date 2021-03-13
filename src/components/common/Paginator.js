import React, { useState } from 'react';
import cn from 'classnames';
import s from './Paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 20 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize); // number of pages

    let pages = []; // an array of number of pages, or a number of buttons
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize); // how many buttons to show at a time
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;
    console.log(currentPage);
    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                .map((p) => {
                    return <span className={
                        cn({
                            [s.selectedPage]: currentPage === p
                        }, s.pageNumber)}
                        key={p}
                        onClick={(e) => {
                            onPageChanged(p);
                        }}>{p}</span>
                })
            }
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>
                    NEXT
                    </button>
            }
            {/* {[...Array(pagesCount)].map((n, i) => {
                return <span key={i} className={currentPage === (i + 1) ? s.selectedPage : ''}
                    onClick={() => onPageChanged(i + 1)}>{i + 1}</span>
            }
            )} */}
        </div>
    )
}

export default Paginator;

