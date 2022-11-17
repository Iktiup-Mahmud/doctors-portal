import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppoinmentOption from './AppoinmentOption';

const AvailableAppoinments = ({ selectedDate }) => {
    // const [appoinmentOptions, setAppoinmentOption] = useState([])
    const [treatement, setTreatement] = useState(null)
    const date = format(selectedDate, 'PP')

    const { data: appoinmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appoinmentOptions', date],
        queryFn: () => fetch(`http://localhost:5000/appoinmentOptions?date=${date}`)
            .then(res => res.json())
    })

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='mx-10 my-20'>
            <div>
                <p className='text-center text-2xl text-secondary font-bold'>You have selected date: {format(selectedDate, 'PP')}</p>
            </div>
            <div className='grid gap-8 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appoinmentOptions?.map(option => <AppoinmentOption key={option._id} setTreatement={setTreatement} option={option}></AppoinmentOption>)
                }
            </div>
            {
                treatement &&
                <BookingModal 
                treatement={treatement} 
                setTreatement={setTreatement} 
                selectedDate={selectedDate} 
                refetch={refetch}
                ></BookingModal>
            }
        </div>

    );
};

export default AvailableAppoinments;