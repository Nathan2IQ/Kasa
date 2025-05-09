import './APropos.scss';
import Nav from '../../components/Nav/Nav';
import Banner from '../../components/Banner/Banner';
import Dropdown from '../../components/Dropdown/Dropdown';
import Footer from '../../components/Footer/Footer';

/*import de l'asset*/
import BannerImgAPropos from '../../assets/backgrnd-about-page.png';

function APropos() {
    const dropdownData = [
        {
            title: 'Fiabilité',
            content: "Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes."
        },
        {
            title: 'Respect',
            content: "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
        },
        {
            title: 'Service',
            content: "La qualité du service est au cœur de notre engagement chez Kasa. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance."
        },
        {
            title: 'Sécurité',
            content: "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes."
        }
    ];

    return (
        <>
            <Nav />
            <main>
                <Banner img={BannerImgAPropos} noOverlay={true} />
                {dropdownData.map((content, i) => (
                    <Dropdown key={i} title={content.title} content={content.content} />
                ))}
            </main>
                <Footer />

        </>
    );
}

export default APropos;