import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const MyAppoientment = () => {
    const { user } = useContext(AuthContext)

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })

    return (
        <div>
            <h2 className="text-3xl mb-7 text-center">My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Treatement</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map( (booking, index) => <tr className="hover" key={booking._id}>
                                                        <th>{index+1}</th>
                                                        <td>{booking?.patientName}</td>
                                                        <td>{booking?.email}</td>
                                                        <td>{booking?.treatement}</td>
                                                        <td>{booking?.appoinmentDate}</td>
                                                        <td>{booking?.slot}</td>
                                                    </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoientment;