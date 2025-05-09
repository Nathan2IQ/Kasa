import './Footer.scss'
import Logo from '../../assets/Logo-Footer.png'

function Footer () {
    return (
        <footer className='footer__container'>
            <img src={Logo} alt='Logo de Kasa' className='footer__img'/>
            <p className='footer__txt'>© 2020 Kasa. All rights reserved</p>
        </footer>
    )
}

export default Footer