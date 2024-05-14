import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const {loginUser, socialLogin} = useAuth()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [emailValid, setEmailValid] = useState(false)
    const [passValid, setPassValid] = useState(false)
    const location = useLocation()

    const googleProvider = new GoogleAuthProvider()
    useEffect(()=>{
      axios.get('https://foodie-restaurant-server-blush.vercel.app/api/v2/users')
        .then(res => setUsers(res.data))
    },[])
    const validation = () =>{
      if (emailValid){
        return 'Your email wrong'
      } else if(passValid){
        return 'Your pass wrong'
      }
    }
    const handleLogin = e=>{

        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const findUser = users?.find(user => user.email === email)

        
       
        // const validation = ()=>{
        //   if( !findUser){
        //     return 'You entered wrong email'
        //   } else if(!password){
        //     return 'You entered wrong password'
        //   }
        // }
        if (!findUser){
          // Swal.fire({
          //   title: 'Ooops',
          //   text: 'Your email'
          // })
          setEmailValid(true)
        } else if(findUser?.password === password){
          loginUser(email, password)
            .then(res => {
                if(res.user?.email){
                  Swal.fire({
                    text: 'Login successful'
                  })
                    {
                      location.state ? navigate(location.state) : navigate('/')
                    }
                }
            })
            .catch(err => console.log(err))
        } else {
          // Swal.fire({
          //   title: 'Ooops',
          //   text: 'Your pass'
          // })
          setPassValid(true)
        }
        // console.log(email, password);
        
    }

    const handleSocialLogin = (provider) =>{
        socialLogin(provider)
          .then(() => {
            
           
              Swal.fire({
                title: 'Logged in successfully'
              })
              {
                location.state? navigate(location.state) : navigate('/')
              }
           
          })
          .catch(err => console.log(err))
    }

   

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center flex-1 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
          Indulge in culinary delight at our vibrant restaurant, where flavor meets innovation in every dish. Experience unforgettable dining with a blend of exquisite tastes and impeccable service.
          </p>
        </div>
        <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p className="text-center mb-4"> {validation()} </p>
            <div className="form-control mt-6">
              <input type="submit" value='Login' className="btn btn-primary"/>
            </div>
          </form>
          <div className="flex justify-center">
            <p>Login with <span className="text-blue-500 font-semibold cursor-pointer" onClick={()=>handleSocialLogin(googleProvider)}>Google</span></p>
          </div>
          
         {/* {
          emailValid && <p>Your email is wrong</p>
         }
         {
          passValid && <p>Your Password is wrong</p>
         } */}
      <p className="text-center mb-5">New to this site? Please <Link  className="text-blue-500 font-semibold" to='/signUp'>Sign Up</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
