import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()

    const imgHostKey = process.env.REACT_APP_imgbb_apikey;


    const { data: specialities, isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpeciality')
            const data = await res.json()
            return data;
        }
    })

    const handelDoctor = data => {
        const image = data.img[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.display_url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgData.data.display_url
                    }

                    // save doctors info to the db
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.name} added successfully`)
                            navigate('/dashboard/manage-doctors')
                        })
                        .catch(err => console.error(err))
                }
            })
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='w-96 p-7'>
            <h1 className="text-3xl">Add A Doctor</h1>
            <form onSubmit={handleSubmit(handelDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                        {...register("name", { required: "Name Address is required" })}
                        placeholder="name" className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-600 mt-2' role="alert">{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text"
                        {...register("email", { required: "Email Address is required" })}
                        placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600 mt-2' role="alert">{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select
                        {...register('speciality')}
                        className="select select-accent w-full max-w-xs">
                        {
                            specialities.map(speciality => <option key={speciality._id} value={speciality._name}>{speciality?.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        {...register("img", { required: "image is required" })}
                        placeholder="img" className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-600 mt-2' role="alert">{errors.img?.message}</p>}
                </div>
                <input type="submit" className='btn btn-accent w-full mt-3' value='Add Doctor' />
            </form>
        </div>
    );
};

export default AddDoctor;