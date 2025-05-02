import './Home.scss'
import Banner from '../../components/Banner/Banner';
import BannerBackgrnd from '../../components/Home-Components/Banner-backgrnd/BannerBackgrnd'
import GenerateLogement from '../../components/Home-Components/Logement/Logement'
import Footer from '../../components/Footer/Footer'

function Home() {
    return (
        <div>
            <Banner />
            <BannerBackgrnd />
            <GenerateLogement />
            <Footer />
        </div>
    );
}

export default Home;