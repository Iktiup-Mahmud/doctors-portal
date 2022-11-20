import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const handelLogin = data => {
        console.log(data)
    }
    return (
        <div className='w-96 p-7'>
            <h1 className="text-3xl">Add A Doctor</h1>
            <form onSubmit={handleSubmit(handelLogin)}>
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
                    <select className="select select-accent w-full max-w-xs">
                        <option disabled selected>Pick a speciality</option>
                        <option>Auto</option>
                        <option>Dark mode</option>
                        <option>Light mode</option>
                    </select>
                    
                </div>
                <input type="submit" className='btn btn-accent w-full mt-3' value='Login' />
            </form>
        </div>
    );
};

export default AddDoctor;