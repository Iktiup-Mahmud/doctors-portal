import React from 'react';

const Infocard = ({card}) => {
    const { name, description, icon, bgClass } = card;

    return (
        <div className={`card md:card-side shadow-xl ${bgClass} p-6`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title text-white">{name}</h2>
                <p className='text-white'>{description}</p>
            </div>
        </div>
    );
};

export default Infocard;