import React from 'react';
import Banner from '../Banner/Banner';
import Hero from '../Hero/Hero';
import Infocards from '../Info/Infocards';
import MakeAppointment from '../MakeAppintment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';
import Contact from '../ContactUs/Contact';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Infocards></Infocards>
            <Services></Services>
            <Hero></Hero>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <Contact></Contact>
        </div>
    );
};

export default Home;