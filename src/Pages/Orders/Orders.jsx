import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../Utility/Container";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const {user, axiosSecure}= useAuth()
  const email = user?.email;

  const prices = orders.map(order => order.price * order.quantity)
  let totalPrice = 0
  for(let i = 0; i < prices.length; i++){
    totalPrice = (totalPrice + prices[i])
  }
  const roundedTotal = totalPrice.toFixed(2)
  
  
  useEffect(() => {
    axiosSecure
      .get(`https://foodie-restaurant-server-blush.vercel.app/api/v2/orders?email=${email}`, {withCredentials: true})
      .then((res) => setOrders(res.data));
  }, [email, axiosSecure]);
  const handleDeleteOrder = (id, email) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://foodie-restaurant-server-blush.vercel.app/api/v2/orders?id=${id}&email=${email}`)
        .then(res => {
            if(res.data.deletedCount){
                const remaining = orders.filter(order => order._id !== id)
                setOrders(remaining) 
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });  
            }
        })
       
      }
    });
    
  }
 
  return (
    <Container>
      <div>
        <Helmet>
          <title>Foodie | Orders</title>
        </Helmet>
        <h2 className="text-center text-4xl font-bold mt-5">Orders</h2>
        <h3>Customer Name: <span className="text-2xl font-bold text-blue-400"> {user?.displayName} </span> </h3>
        <h3>Customer Email: {user?.email} </h3>
        <div >
            {
                orders?.map((order,idx) => <div className="flex justify-between items-center w-2/3 mx-auto bg-blue-500 px-4 py-2 rounded-xl my-3" key={idx}>
                    <h3> {order?.name} </h3>
                    <p>Quantity: {order?.quantity} </p>
                    <p>Price: ${order?.quantity * order?.price} </p>
                    <p>Purchase Date: {order?.buyingDate} </p>
                    <button onClick={()=>handleDeleteOrder(order?._id, user?.email)} className="btn">Delete</button>
                </div> )
            }
        </div>
        <h4 className="text-center">Total Price: ${roundedTotal} </h4>
      </div>
    </Container>
  );
};

export default Orders;
