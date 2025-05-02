import './Logement.scss';
import logements from '../../../datas/logements.json';

function GenerateLogement() {
    return (
        <div className="logements-wrapper">
            <div className="logements-container">
                {logements.map((logement) => (
                    <div key={logement.id} className="logement-card">
                        <img src={logement.cover} alt={logement.title} className="logement-cover" />
                        <h2 className="logement-title">{logement.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenerateLogement;