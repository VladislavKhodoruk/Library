import { NavLink } from 'react-router-dom';
import { Card as CardInterface } from 'entities/interfaces';
import { host } from 'entities/constants';

import defaultImage from '../../assets/defaultImage.png'
import { Button } from '../commons/button';
import { Rating } from '../commons/rating';

import { ViewModes } from './enums';

import './card.scss';

export const Card = (props: { card: CardInterface, viewMode: string }) => (
    <NavLink to={String(props.card.id)}>
        {props.viewMode === ViewModes.Table ?
            <div className='card-table' data-test-id='card'>
                <div className='top'>
                    <img src={props.card.image ? `${host}${props.card.image.url}` : defaultImage} alt='Book' />
                    <Rating rating={props.card.rating} isSmooth={false} showWhenNull={false} />
                </div>
                <p className='middle'>{props.card.title}</p>
                <div className='bottom'>
                    <p>{props.card.authors?.join(', ')}, {props.card.issueYear}</p>
                    <Button booking={props.card.booking} delivery={props.card.delivery} />
                </div>
            </div> :
            <div className='card-list'>
                <img src={props.card.image ? `${host}${props.card.image}` : defaultImage} alt='Book' />
                <div className='right-part'>
                    <div className='top'>
                        <p className='title'>{props.card.title}</p>
                        <p className='author'>{props.card.authors?.join(', ')}, {props.card.issueYear}</p>
                    </div>
                    <div className='bottom'>
                        <Rating rating={props.card.rating} isSmooth={false} showWhenNull={false} />
                        <Button booking={props.card.booking} delivery={props.card.delivery} />
                    </div>
                </div>
            </div>}
    </NavLink>
);
