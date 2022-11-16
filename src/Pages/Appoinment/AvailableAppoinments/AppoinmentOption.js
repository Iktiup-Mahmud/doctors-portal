import React from 'react';

const AppoinmentOption = ({ option, setTreatement }) => {
    const { name, slots } = option;

    return (
        <div className="card shadow-xl">
            <div className="card-body text-center ">
                <h2 className="card-title mx-auto text-secondary">{name}</h2>
                <p>{ slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{ slots.length } { slots.length > 1 ? 'spaces' : 'space' } available.</p>
                <div className="card-actions mx-auto">
                    <label disabled={ slots.length === 0 } htmlFor="booking-modal" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white" onClick={ () => setTreatement(option)}>Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppoinmentOption;