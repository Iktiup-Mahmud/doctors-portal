import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    // const [ data, setData ] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [ loginError, setLoginError ] = useState('')
    const [ loginUserEmail, setLoginUserEmail ] = useState('')
    const [token] = useToken(loginUserEmail)
    const { signIn } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const from = location?.state?.from?.pathname || '/'

    if(token) {
        navigate(from, { replace: true })
    }

    const handelLogin = data => {
        console.log(data)
        setLoginError('')
        signIn(data.email, data.password)
        .then( res => {
            const user = res.user;
            console.log(user)
            console.log(user.email)
            setLoginUserEmail(user.email)
        })
        .catch( err => {
            console.error(err.message)
            setLoginError(err.message)
        })
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handelLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text"  
                            {...register("email", { required: "Email Address is required" })}
                         placeholder="Email" className="input input-bordered w-full max-w-xs"  />
                        {errors.email && <p className='text-red-600 mt-2' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"  
                            {...register("password", 
                            { required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 charecters or long" } })}
                         placeholder="Password" className="input input-bordered w-full max-w-xs"  />
                        {errors.password && <p className='text-red-600 mt-2' role="alert">{errors.password?.message}</p>}
                        
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full mt-3' value='Login' />
                        { loginError && <p className='text-red-600'>{loginError}</p> }
                    <p className='mt-3'>New to Doctor's Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-accent w-full font-bold'>Countinue With Google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;