import { Link, useParams } from "react-router-dom";
import Container from "../../Utility/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
  const [food, setFood] = useState({});
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();

  // const { name, price, image, description} = food;
  useEffect(() => {
    axios
      .get(`https://foodie-restaurant-server-blush.vercel.app/api/v2/foods/${id}`)
      .then((res) => setFood(res.data));
  }, [id]);
 
  // console.log(food?.name);

 
  return (
    <Container>
     
      <Helmet>
        <title> {`${food.name}`} </title>
      </Helmet>
      <div className="flex justify-center items-center gap-5">
        <div className="my-6 text-center space-y-5 flex-1">
          <img
            className="w-full h-[70vh] mx-auto rounded-lg"
            src={food?.image}
            alt=""
          />
          <h2 className="text-3xl font-bold"> {food?.name} </h2>
          <p> {food?.description} </p>
          <p> Price: ${food?.price} </p>
          <p>Available: {food?.quantity} </p>
          <Link to={`/foodOrder/${food._id}`} className="btn">Order</Link>
        </div>
       
      </div>
    </Container>
  );
};

export default FoodDetails;
