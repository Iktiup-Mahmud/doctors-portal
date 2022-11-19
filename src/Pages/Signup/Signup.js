import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const [ createdUserEmail, setCreatedUserEmail ] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()

    if(token){
        navigate('/')
    }

    const handelSignup = (data) => {
        console.log(data)
        setSignUpError('')
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                toast.success('User created successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then( () => {
                        saveUserToDB(data.name, data.email)
                        console.log(data)
                    } )
                    .catch( err => console.error(err) )
        })
            .catch(err => {
                console.error(err)
                setSignUpError(err.message)
            })
    }

    const saveUserToDB = (name, email) => {
        const user =  {name, email}
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('save user', data)
            setCreatedUserEmail(email)
        })
        .catch(err => console.error(err))
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl text-center'>SignUp</h2>
                <form onSubmit={handleSubmit(handelSignup)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: 'Name is required'
                        })} placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email",
                            { required: 'Email is required' }
                        )} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",
                            {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 charecters or long' }
                            }
                        )} placeholder="Password" className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    <input type="submit" className='btn btn-accent w-full mt-3' value='SignUp' />
                    { signUpError && <p className='text-red-600'>{signUpError}</p>}
                    <p className='mt-3'>Already have an account? <Link className='text-secondary' to='/login'>LogIn</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-accent w-full font-bold'>Countinue With Google</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;