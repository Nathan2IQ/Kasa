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
        <div className='main-container'>
            <div className='txt__wrapper'>
                <div className='txt__global'>
                    <h1 className='txt__global__title'> {props.title} </h1>
                    <h2 className='txt__global__place'> {props.place} </h2>
                </div>
                <div className='txt__tags'>
                    {props.tags && props.tags.map((tag, index) => (
                        <p className='txt__tags__content' key={index}>{tag}</p>
                    ))}
                </div>
            </div>
            <div className='host__wrapper'>
                <div className='host__global'>
                    <p className='host__global__txt'> {props.host} </p>
                    <img className='host__global__img' src={props.img} alt='Photo du propriétaire' />
                </div>
                <div className='host__rating'>
                    {renderStars(props.rating)}
                </div>
            </div>
        </div>
    );
}

export default Detail
