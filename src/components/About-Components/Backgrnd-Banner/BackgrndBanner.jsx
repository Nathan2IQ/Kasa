import './BackgrndBanner.scss'
import BackgrndImg from '../../../assets/backgrnd-about-page.png'

function BackgrndBanner () {
    return (
        <div className='Backgrnd__container'>
            <img src={BackgrndImg} alt='Photo de montagnes' className='backgrnd__img'/>
        </div>
    )
}

export default BackgrndBanner