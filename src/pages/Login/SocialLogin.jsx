import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import UseAuth from "../../hooks/UseAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const SocialLogin = () => {

    const { googleLogin, githubLogin, twitterLogin } = UseAuth() || {};
    const axiosPublic = useAxiosPublic();

    // navigation after socialLogin
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';


    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true });
                    })
                if (result.user){
                    toast.success('Sign in successfully!') 

                }

            })
            .catch(error => {
                toast.error('Login Failed: ' + error.message); // Display error message
            });
    };

    return (
        <>
            <div className='divider'>Continue with</div>
            <div className='flex gap-2 justify-center items-center mb-4'>
                <button onClick={() => handleSocialLogin(googleLogin)} className='btn btn-outline'><FaGoogle></FaGoogle> Google</button>
                <button onClick={() => handleSocialLogin(twitterLogin)} className='btn btn-outline'>Twitter</button>
                <button onClick={() => handleSocialLogin(githubLogin)} className='btn btn-outline'>Github</button>
            </div>
        </>
    );
};

export default SocialLogin;