import './404-page.scss'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import NotFoundImg from '../../assets/404.png'
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <>
            <Nav />
                <main>
                    <div className='notFound__img'>
                        <img src={NotFoundImg} alt='404'/>
                    </div>
                    <div className='notFound__txt'>
                        <h1>Oups! La page que vous demandez n'existe pas.</h1>
                    </div>
                    <Link to='/' className='notFound__link'>Retourner sur la page d'accueil</Link>
                </main>
            <Footer />
        </>
    );
}

export default NotFoundPage;