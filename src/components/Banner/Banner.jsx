import './Banner.scss'

function BannerBackgrnd(props) {
    const bannerClass = props.noOverlay ? 'banner banner--no-overlay' : 'banner';

    return (

        <div className={bannerClass}>
            <img src={props.img} alt='Photo de falaises' className='banner__img'/>
            <h1 className='banner__title'>{props.txt}</h1>
        </div>

    )
}

export default BannerBackgrnd