import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Contact = () => {
    return (
        <section className='text-center py-32 my-20' style={{ background: `url(${appointment})` }}>
            <h4 className='text-primary font-bold'>CONTACT US</h4>
            <h2 className='text-4xl mb-10 text-white'>Stay Connected with us</h2>
            <div className='items-center'>
                <input type="email" placeholder="Email Address" className="input w-2/3 lg:w-1/3 mx-auto mt-3 block" required />
                <input type="text" placeholder="Subject" className="input w-2/3 lg:w-1/3 mx-auto mt-3 block " />
                <textarea className="textarea my-3 h-28 w-2/3 lg:w-1/3 block mx-auto" placeholder="Your Message" required></textarea>
                <PrimaryButton className=''>Submit</PrimaryButton>
            </div>
        </section>
    );
};

export default Contact;