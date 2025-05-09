import './Gallery.scss';
import logements from '../../datas/logements.json';
import { Link } from 'react-router-dom';

function GenerateLogement() {
    return (
        <div className="logements-wrapper">
            <div className="logements-container">
                {logements.map((logement) => (
                    <div key={logement.id} className="logement-card">
                        <Link to={`/logement/${logement.id}`}>
                            <img src={logement.cover} alt={logement.title} className="logement-cover" />
                            <h2 className="logement-title">{logement.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenerateLogement;