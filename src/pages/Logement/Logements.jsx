import './Logements.scss'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { Link, useParams, Navigate } from 'react-router-dom';
import data from '../../datas/logements.json'
import Slider from '../../components/Slider/Slider'
import Detail from '../../components/LogementDetail/LogementDetail';
import Dropdown from '../../components/Dropdown/Dropdown';

function logementPage() {
    /*variable pour recup l'id*/
    const { id } = useParams();

    // trouver le logement correspondant à l'id
    const logement = data.find((logement) => logement.id === id);

    if (!logement) {
        return <Navigate to="/404" replace />;
    }

    return (
        <>
            <Nav />
            <main>
                <Slider img={logement.pictures} />
                <Detail 
                    title={logement.title}
                    place= {logement.location}
                    tags={logement.tags}
                    host={logement.host.name}
                    img={logement.host.picture}
                    rating={logement.rating}
                />
                <div className='dropdown__logement'>
                    <Dropdown title='Description' content={logement.description} />
                    <Dropdown title='Equipements' content={logement.equipments.map((item, index) => <li key={index}>{item}</li>)} />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default logementPage;