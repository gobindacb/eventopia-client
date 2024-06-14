
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import PasswordResetModal from "../../components/Modals/PasswordResetModal";
import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";
import UseAuth from "../../hooks/UseAuth";
import { useState } from "react";

const Login = () => {

    // navigation after login
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    console.log('state in the location login', location.state);

    // for password toggle
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        }
        else {
            setIcon(eyeOff);
            setType('password')
        }
    }

    const { signInUser } = UseAuth() || {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

    const onSubmit = (data) => {
        const { email, password } = data;

        signInUser(email, password)
            .then(result => {
                if (result.user) {
                    navigate(from, { replace: true });
                    toast.success('Sign In Success')
                }
            })
            .catch(error => {
                setErrorMessage("Incorrect email or password."); // Set error message for incorrect login
                toast.error("Incorrect email or password.")
                console.log(error.message);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse gap-2 lg:gap-8">
                <div className="card shrink-0 w-full h-96 max-w-sm shadow-2xl bg-slate-400 text-center flex flex-col items-center justify-center ">
                    <h2 className="text-5xl mb-6">Log In</h2>
                    <h1 className="text-5xl text-white font-bold">Navigate<span className="text-6xl text-red-600">B</span><span className="text-6xl text-green-600">D</span></h1>
                    <br />
                    <p className="mt-0 text-yellow-400">The Ultimate Guide to Bangladesh</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-6">
                                <input type={type} placeholder="password" className="grow"
                                    {...register("password", { required: true })}
                                />
                                <span onClick={handleToggle}><Icon icon={icon} size={20} /></span>
                            </label>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                            {errorMessage && <span className="text-red-500">{errorMessage}</span>} {/* Display error message */}
                            {/* modal */}
                            <PasswordResetModal />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="text-center">Do not have an account? <Link className="text-green-500 underline" to='/register'>Register Now</Link></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;