import './Home.scss'
import Nav from '../../components/Nav/Nav';
import Banner from '../../components/Banner/Banner'
import GenerateLogement from '../../components/Gallery/Gallery'
import Footer from '../../components/Footer/Footer'

/*importations des assets*/
import BannerImgHome from '../../assets/backgrnd-home-page.png'

function Home() {
    return (
        <>
            <Nav />
            <main>
                <Banner img={BannerImgHome} txt='Chez vous, partout ailleurs' />
                <GenerateLogement />
            </main>
            <Footer />
        </>
    );
}

export default Home;