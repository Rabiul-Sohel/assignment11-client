import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.confige";
import axios from "axios";


export const authContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const auth = getAuth(app)

    const axiosSecure = axios.create({
        baseURL: 'https://foodie-restaurant-server-blush.vercel.app',
        withCredentials: true
    })
    

    // CREATING USER
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }
    // SOCIAL LOGIN
    const socialLogin = (provider)=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // LOGIN USER
    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // SIGNOUT
    const logoutUser = () =>{
        setLoading(true)
       signOut(auth)
       .then(() => {
        axios.get('https://foodie-restaurant-server-blush.vercel.app/api/v2/jwt/clear',{withCredentials: true})
          .then(res => console.log(res.data))
      })
      .catch(err => console.log(err))
    }

    axiosSecure.interceptors.response.use((response) =>{
        console.log(response.status);
        
          return response
       
      },(error)=>{
        console.log(error.response.status);
        if(error.response.status === 403 || error.response.status === 401){
            logoutUser()
        }
      })
      

    // OBSERVING USER
    useEffect(()=>{
        const unSubsribed = onAuthStateChanged(auth, (currentUser)=>{
            console.log('observing', currentUser);
            setUser(currentUser)
            setLoading(false)
            if(currentUser){
                axios.post('https://foodie-restaurant-server-blush.vercel.app/api/v2/jwt', {email: currentUser.email}, {withCredentials: true})
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
            }
        })
        return ()=>{
            unSubsribed;
        }
    },[auth])
    const authInfo = {
       createUser,
       loginUser,
       logoutUser,
       user,
       loading,
       socialLogin,
       axiosSecure
    }

   return <authContext.Provider value={authInfo} >
            {children}
        </authContext.Provider>
};

export default  AuthProvider;