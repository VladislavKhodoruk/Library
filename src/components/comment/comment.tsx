import { ReactComponent as DefaultCommentator } from '../../assets/defaultCommentator.svg';
import { Rating } from '../commons/rating';

import './comment.scss';

export const Comment = (props: { date: string, author: string, text?: string, rating: number, image?: string }) => (
    <div className='comment'>
        <div className='comment-header'>
            {props.image ? <img alt='Avatar' src={props.image} /> : <DefaultCommentator />}
            <div className='text'>
                <p>{props.author}</p>
                <p>{new Date(props.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>
        <Rating rating={props.rating} isSmooth={true} showWhenNull={false} />
        <p>
            {props.text}
        </p>
    </div>
);
