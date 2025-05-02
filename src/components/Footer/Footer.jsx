import './Footer.scss'
import Logo from '../../assets/Logo-Footer.png'

function Footer () {
    return (
        <div className='footer__container'>
            <img src={Logo} alt='Logo de Kasa' className='footer__img'/>
            <p className='footer__txt'>© 2020 Kasa. All rights reserved</p>
        </div>
    )
}

export default Footer