import { useEffect, useState } from 'react';
import './button.scss';


export const Button = (props: { bookingStatus: number, bookedTill?: string }) => {
    const [buttonText, setButtonText] = useState('Забронировано');
    useEffect(() => {
        switch (props.bookingStatus) {
            case 0:
                setButtonText('Забронировать');
                break;
            case 1:
                setButtonText('Забронирована');
                break;
            case 2:
                if (props.bookedTill) {
                    setButtonText(`Занята до ${new Date(props.bookedTill).toLocaleString('ru', { day: 'numeric', month: 'numeric' })}`);
                }
                break;
            default:
                setButtonText('Забронирована');
                break;
        }
    }, [props.bookingStatus, props.bookedTill]);
    return (
        <div className='button'>
            <button onClick={(event) => event.stopPropagation()} className={`${props.bookingStatus === 0 ? '' : (props.bookingStatus === 1 ? 'booked' : 'occupied')}`} type='button'>{buttonText}</button>
        </div>
    )
};
