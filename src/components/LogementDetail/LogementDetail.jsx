import './LogementDetail.scss'
import React from 'react';

function Detail(props) {
    const renderStars = (rating) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fa-solid fa-star ${i <= rating ? 'star--red' : 'star--grey'}`}
                ></i>
            );
        }
        return stars;
    };

    return (
        <>
            <div className='logement'>
                <div className='logement__txt'>
                    <h1 className='logement__txt__title'> {props.title} </h1>
                    <h2 className='logement__txt__place'> {props.place} </h2>
                </div>
                <div className='logement__host'>
                    <p className='logement__host__txt'> {props.host} </p>
                    <img className='logement__host__img' src={props.img} alt='Photo du propriétaire' />
                </div>
            </div>
            <div className='logement'>
                <div className='logement__tags'>
                    {props.tags && props.tags.map((tag, index) => (
                        <p className='logement__tags__txt' key={index}>{tag}</p>
                    ))}
                </div>
                <div className='logement__rating'>
                    {renderStars(props.rating)}
                </div>
            </div>
        </>
    );
}

export default Detail
