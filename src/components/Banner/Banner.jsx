import './Banner.scss'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

function Banner() {
    return (

        <header className='header'>
            <div>
                <img src={Logo} alt='Logo de Kasa' />
            </div>
            <div className='link'>
                <Link to='/' className='link__txt'>Accueil</Link>
                <Link to='/a-propos' className='link__txt'>A Propos</Link>
            </div>
        </header>

    )
}

export default Banner
