import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../../firebase.confige";


const SignUp = () => {
    const {createUser} = useAuth()
    const navigate = useNavigate()
    // console.log(createUser);
    const handleSignUp = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const auth = getAuth(app)
        const user = {
          email, password
        }
        
        
        createUser(email, password)
            .then(res => {
              if(res.user){
                updateProfile(auth.currentUser, {
                  displayName: name, photoURL: photo
                } )
              }
              if(res.user.email){
                axios.post('https://foodie-restaurant-server-blush.vercel.app/api/v2/users', user)
                  .then(res => {
                    if(res.data.insertedId){
                      navigate('/')
                      Swal.fire({
                        title: 'Good Job',
                        text: 'User created Successfully',
                        icon: 'success'
                      })
                    }
                    console.log(res.data.insertedId)})
              }
              })
            .catch(err => console.log(err))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center flex-1 lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
            Indulge in culinary delight at our vibrant restaurant, where flavor meets innovation in every dish. Experience unforgettable dining with a blend of exquisite tastes and impeccable service.
            </p>
          </div>
          <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  
                />
              </div>
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
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="photo url"
                  className="input input-bordered"
                  
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
              <div className="form-control mt-6">
                <input type="submit" value='Sign Up' className="btn btn-primary"/>
              </div>
            </form>
        <p className="text-center mb-5 ">Already Registered? Please <Link className="text-blue-500 font-semibold" to='/login'>Login</Link> </p>
          </div>
        </div>
      </div>
    );
};

export default SignUp;