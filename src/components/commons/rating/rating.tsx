import './rating.scss';
import { ReactComponent as StarIcon } from '../../../assets/starIcon.svg';
import { ReactComponent as StarIconSmooth } from '../../../assets/starIconSmooth.svg';


export const Rating = (props: { rating: number, isSmooth: boolean }) => {
    const stars = Array(5).fill(0);

    return (
        <div className='rating'>
            {!props.rating ?
                <p>ещё нет оценок</p> :
                <div className='stars'>{stars.map((el, index) => props.rating >= index + 1 ?
                    (props.isSmooth ? <StarIconSmooth className='icon star-filled' /> : <StarIcon className='icon star-filled' />) :
                    (props.isSmooth ? <StarIconSmooth className='icon' /> : <StarIcon className='icon' />))}</div>}
        </div>

    )
};
