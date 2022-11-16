import React from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';

const AppoinmentBanner = ({selectedDate, setSelectedDate}) => {
    

    return (
        <header className='p-10' style={{ background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${chair}) no-repeat `, backgroundSize: 'cover' }}>
            <div className="hero ">
                <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
                    <img src={chair} alt='' className="max-w-sm sm:max-w-screen-sm rounded-lg shadow-2xl" />
                    <div className='mr-10'>
                        <DayPicker 
                            mode='single'
                            selected={selectedDate}
                            onSelect= {setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppoinmentBanner;