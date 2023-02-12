import './card.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ViewModes } from './enums';
import { Book } from './interfaces';
import defaultImage from '../../assets/defaultImage.png'
import bookImage from '../../assets/bookImage.png'
import { Rating } from '../commons/rating';
import { Button } from '../commons/button';

export const Card = (props: { book: Book, viewMode: string }) => {
    const [buttonText, setButtonText] = useState('Забронировано');
    useEffect(() => {
        switch (props.book.bookingStatus) {
            case 0:
                setButtonText('Забронировать');
                break;
            case 1:
                setButtonText('Забронирована');
                break;
            case 2:
                setButtonText(`Занята до ${new Date(props.book.bookedTill).toLocaleString('ru', { day: 'numeric', month: 'numeric' })}`);
                break;
            default:
                setButtonText('Забронирована');
                break;
        }
    }, [props.book.bookingStatus, props.book.bookedTill]);

    return (
        <NavLink to={props.book.id}>
            {props.viewMode === ViewModes.Table ?
                <div className='card-table' data-test-id='card'>
                    <div className='top'>
                        <img src={props.book.images.length ? bookImage : defaultImage} alt='Book' />
                        <Rating rating={props.book.rating} isSmooth={false} />
                    </div>
                    <p className='middle'>{props.book.title}</p>
                    <div className='bottom'>
                        <p>{props.book.author}, {props.book.year}</p>
                        <Button bookingStatus={props.book.bookingStatus} bookedTill={props.book.bookedTill} />
                    </div>
                </div> :
                <div className='card-list'>
                    <img src={props.book.images[0] ? bookImage : defaultImage} alt='Book' />
                    <div className='right-part'>
                        <div className='top'>
                            <p className='title'>{props.book.title}</p>
                            <p className='author'>{props.book.author}, {props.book.year}</p>
                        </div>
                        <div className='bottom'>
                            <Rating rating={props.book.rating} isSmooth={false} />
                            <Button bookingStatus={props.book.bookingStatus} bookedTill={props.book.bookedTill} />
                        </div>
                    </div>
                </div>}
        </NavLink>
    )
};
