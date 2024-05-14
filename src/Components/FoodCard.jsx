import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const FoodCard = ({ food, setFoods, foods }) => {
  const { _id, name, image, price, category, description, count, quantity } = food;
  const {user} = useAuth();
  // console.log(user.email);

  
  
  const handleDelete = id =>{
    axios.delete(`https://foodie-restaurant-server-blush.vercel.app/api/v2/foods/${id}`)
      .then(res => {
        if(res.data.deletedCount){
          const remaining = foods.filter(fd => fd._id !== _id)
          setFoods(remaining)
          Swal.fire({
            title: 'Success',
            text: 'You have deleted the food item',
            icon: 'success'
          })
          // window.location.reload()
        }
      })
      console.log(id);

  }
  return (
    <div className="card my-10  bg-base-100 shadow-xl items-stretch">
      <figure className="">
        <img src={image} alt="Food" className="rounded-t-xl h-60 w-full hover:scale-125 duration-300" />
      </figure>
      <div className="card-body items-center ">
        <h2 className="card-title"> {name} </h2>
        <p>
          {" "}
          {description}{" "}
          
        </p>
        <p className="text-xl font-semibold mb-2 text-left">
          Food Category: <span className="text-blue-300">{category}</span>{" "}
        </p>
        <p className="text-white bg-red-600 p-3 flex-1">Price: ${price} </p>
        <p>Sell: {count} </p>
        <p>Available: {quantity} </p>
        <div className="flex justify-between items-center gap-10">
          
          {
            user && <div className="flex gap-5">
              <Link className="btn btn-primary text-white" to={`/modifyFood/${_id}`}>Update</Link>
              <button className="btn" onClick={()=>handleDelete(_id)}>Delete</button>
            </div>
          }
          <Link to={`/singleFood/${_id}`}
            
            className="btn btn-primary text-white"
          >
            Details 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
