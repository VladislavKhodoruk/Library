import Lottie from 'lottie-react';

import loader from './loader.json';

import './loader.scss';

export const Loader = () => (
    <div className='loader-bg'>
        <Lottie className='loader' animationData={loader} loop={true} />
    </div>
);
