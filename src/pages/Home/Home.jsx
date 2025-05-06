import './Home.scss'
import Nav from '../../components/Nav/Nav';
import Banner from '../../components/Banner/Banner'
import GenerateLogement from '../../components/Home-Components/Logement/Logement'
import Footer from '../../components/Footer/Footer'

/*importations des assets*/
import BannerImgHome from '../../assets/backgrnd-home-page.png'

function Home() {
    return (
        <div>
            <Nav />
            <Banner img={BannerImgHome} txt='Chez vous, partout ailleurs' />
            <GenerateLogement />
            <Footer />
        </div>
    );
}

export default Home;