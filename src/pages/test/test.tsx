import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'entities/hooks'
import { fetchBook } from 'store/book-page-slice'
import { fetchBooks } from 'store/main-page-slice'
import { fetchCategories } from 'store/sidebar-slice'

import { decrement, increment } from './test-page-slice'

export function Test() {
    const count = useSelector((state: any) => state.counter.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBook('2'));
        dispatch(fetchBooks());
    }, [dispatch]);


    return (
        <div>
            <div>
                <button
                    type='button'
                    aria-label="Увеличить значение"
                    onClick={() => dispatch(increment())}
                >
                    Увеличить
                </button>
                <span>{count}</span>
                <button
                    aria-label="Уменьшить значение"
                    type='button'

                    onClick={() => dispatch(decrement())}
                >
                    Уменьшить
                </button>
                <button
                    type='button'
                    onClick={() => console.log()}
                >
                    .............................................
                </button>
            </div>
        </div>
    )
}
