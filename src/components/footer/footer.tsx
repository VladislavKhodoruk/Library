import './footer.scss';
import facebookIcon from '../../assets/facebookIcon.svg';
import instagramIcon from '../../assets/instagramIcon.svg';
import vkIcon from '../../assets/vkIcon.svg';
import linkedinIcon from '../../assets/linkedinIcon.svg';


export const Footer = () => (
    <div className='footer'>
        <p>© 2020-2023 Cleverland. Все права защищены.</p>
        <div>
            <a href='#'><img src={facebookIcon} alt='Facebook' /></a>
            <a href='#'><img src={instagramIcon} alt='Instagram' /></a>
            <a href='#'><img src={vkIcon} alt='VK' /></a>
            <a href='#'><img src={linkedinIcon} alt='LinkedIn' /></a>
        </div>
    </div>
);
