import React from 'react';

const TestM = ({revieww}) => {
    const { name, img, location, review } = revieww

    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{review}</p>
                <div className='flex mt-8'>
                    <div className="avatar items-center ">
                        <div className="w-16 mr-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} className='' alt=''/>
                        </div>
                    </div>
                    <div className='my-auto'>
                        <h2 className="font-bold">{name}</h2>
                        <h2 className="">{location}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestM;