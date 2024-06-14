import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";




export const AuthContext = createContext(null);

// social auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    
    // create user
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    //update user profile
    const updateUserProfile = (fullName, imageUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName, 
            photoURL: imageUrl
          })
    };

    // edit profile
    const editProfile = (fullName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: photoURL
        }) 
    }

    // sign in user
    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    // google login
    const googleLogin = () =>{
        setLoading(true)
       return signInWithPopup(auth, googleProvider)
    }

    // github login
    const githubLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // twitter login
    const twitterLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, twitterProvider)
    }

    // logout
    const logout = () =>{
        setLoading(true)
        setUser(null)
        return signOut(auth)
    }

    // send reset email password
    const resetPass = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }


    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                //get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
            }
            else{
                // remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])


    const allValues ={
        createUser,
        user,
        signInUser,
        googleLogin,
        githubLogin,
        twitterLogin,
        logout,
        updateUserProfile,
        loading,
        resetPass,
        editProfile

    }
    return (
        <AuthContext.Provider value={allValues}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;