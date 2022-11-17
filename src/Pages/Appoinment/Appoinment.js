import React, { useState } from 'react';
import AppoinmentBanner from './AppoinmentBanner/AppoinmentBanner';
import AvailableAppoinments from './AvailableAppoinments/AvailableAppoinments';

const Appoinment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const changeDate = (date) => {
        if(!date){
            return
        }
        setSelectedDate(date)
    }

    return (
        <div className=''>
            <AppoinmentBanner
                selectedDate={selectedDate}
                setSelectedDate={changeDate}
            ></AppoinmentBanner>
            <AvailableAppoinments 
                selectedDate={selectedDate}
            ></AvailableAppoinments>
        </div>
    );
};

export default Appoinment;