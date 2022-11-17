import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ treatement, selectedDate, setTreatement, refetch }) => {
    const { name, slots } = treatement;
    const date = format(selectedDate, 'PP')
    const { user } = useContext(AuthContext)


    const handelBooking = e => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const pname = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appoinmentDate: date,
            treatement: name,
            patientName: pname,
            slot,
            email,
            phone
        }

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then( res => res.json())
            .then( data => {
                console.log(data)
                if(data.acknowledged){
                    setTreatement(null)
                    toast.success('Booking Confirmed')
                    refetch()
                }
                else{
                    toast.error(data.message)
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handelBooking} className='mt-5 text-center'>
                        <input type="text" placeholder="Type here" value={date} className="input input-bordered w-full mt-3" disabled />
                        <select name='slot' className="select select-bordered w-full mt-3">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option> )
                            }
                        </select>
                        <input name='name' type="text" placeholder="Your Name" defaultValue={user?.displayName} required className="input input-bordered w-full mt-3" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input input-bordered w-full mt-3" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full mt-3" />
                        <input type="submit" value="Submit" className='btn btn-accent mt-5 w-full' />
                    </form>
                </div>
            </div>   
        </>
    );
};

export default BookingModal;