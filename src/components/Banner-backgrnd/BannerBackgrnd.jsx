import ImgBackgrnd from '../../assets/backgrnd-home-page.png'
import './BannerBackgrnd.scss'

function BannerBackgrnd() {
    return (

        <div className='banner'>
            <img src={ImgBackgrnd} alt='Photo de falaises' className='banner__img'/>
            <h1 className='banner__title'>Chez vous, partout et ailleurs</h1>
        </div>

    )
}

export default BannerBackgrnd