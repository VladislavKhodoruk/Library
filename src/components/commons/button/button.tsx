import { useEffect, useState } from 'react';
import { Booking, Delivery } from 'entities/interfaces';
import { Nullable } from 'entities/types';

import './button.scss';

export const Button = (props: { booking: Nullable<Booking>, delivery: Nullable<Delivery> }) => {
    const [buttonText, setButtonText] = useState('Забронировано');

    useEffect(() => {
        if (props.booking) {
            setButtonText('Забронирована');
        }
        else if (props.delivery) {
            setButtonText(`Занята до ${new Date(props.delivery.dateHandedTo!).toLocaleString('ru', { day: 'numeric', month: 'numeric' })}`);
        }
        else {
            setButtonText('Забронировать');
        }
    }, [props.booking, props.delivery]);

    return (
        <div className='button'>
            <button onClick={(event) => event.stopPropagation()} className={`${!props.booking ? '' : (props.booking ? 'booked' : 'occupied')}`} type='button'>{buttonText}</button>
        </div>
    )
};
