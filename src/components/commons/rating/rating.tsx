import { Nullable } from 'entities/types';

import { ReactComponent as StarIcon } from '../../../assets/starIcon.svg';
import { ReactComponent as StarIconSmooth } from '../../../assets/starIconSmooth.svg';

import './rating.scss';


export const Rating = (props: { rating: Nullable<number>, isSmooth: boolean, showWhenNull: boolean }) => {
    const stars = Array(5).fill(0);

    return (
        <div className='rating'>
            {
                props.rating ?
                    <div className='stars'>{stars.map((el, index) => props.rating as number >= index + 1 ?
                        (props.isSmooth ? <StarIconSmooth className='icon star-filled' /> : <StarIcon className='icon star-filled' />) :
                        (props.isSmooth ? <StarIconSmooth className='icon' /> : <StarIcon className='icon' />))}</div> :
                    (props.showWhenNull ?
                        <div className='stars'>{stars.map((el) => (props.isSmooth ? <StarIconSmooth className='icon' /> : <StarIcon className='icon' />))}</div>
                        : <p>ещё нет оценок</p>)
            }

        </div>

    )
};
