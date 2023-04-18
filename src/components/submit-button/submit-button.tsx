import classNames from 'classnames';
import './submit-button.scss';

export const SubmitButton = (props: { text: string, disable: boolean }) => (
    <button type='submit' className={classNames('submit-button', { 'disabled': props.disable })}>
        {props.text}
    </button>
);
