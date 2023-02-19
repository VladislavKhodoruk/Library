import Lottie from 'lottie-react';

import loader from './loader.json';

import './loader.scss';

export const Loader = () => (
    <div data-test-id='loader' className='loader-bg'>
        <Lottie className='loader' animationData={loader} loop={true} />
    </div>
);
