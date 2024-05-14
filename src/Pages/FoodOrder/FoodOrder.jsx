import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import Container from "../../Utility/Container";

const FoodOrder = () => {
  const [food, setFood] = useState({});
  const [orders, setOrders] = useState([]);
  const { user, axiosSecure, logoutUser } = useAuth();
  const { id } = useParams();
  // const runningQuantity = food?.quantity
  const [quantity, setQuantity] = useState(food?.quantity);

  console.log(orders);

  useEffect(() => {
    axios
      .get(`https://foodie-restaurant-server-blush.vercel.app/api/v2/foods/${id}`)
      .then((res) => setFood(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    axiosSecure
      .get(`/api/v2/orders?email=${user.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [user, axiosSecure]);

  const handleOrder = (e) => {
    e.preventDefault();

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = date + "/" + month + "/" + year;
    console.log(currentDate);

    const exist = orders?.find((order) => order?._id === food?._id);
    const remaining = orders?.filter((order) => order?._id !== food?._id);
    const newOrders = [exist, ...remaining];
    setOrders(newOrders);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const inputedQuantity = parseInt(form.quantity.value);
    const existingQuantity = food.quantity;
    food.customerName = name;
    food.customerEmail = email;
    food.quantity = inputedQuantity;
    food.buyingDate = currentDate

    console.log(inputedQuantity);

    // setFood(food)
    // food.quantity = quantity;

    if (food.quantity <= 0) {
      Swal.fire({
        text: "Sorry. This food item is not available",
        icon: "error",
      });
      return;
    } else if (inputedQuantity > food?.quantity) {
      Swal.fire({
        text: "Sorry. Then number exceeded",
        icon: "error",
      });
      return;
    }
    axios
      .patch(`https://foodie-restaurant-server-blush.vercel.app/api/v2/foods/${food._id}`, {
        inputedQuantity,
      })
      .then(() => {
        const newQuantity = existingQuantity - inputedQuantity;
        food.quantity = newQuantity;
        setQuantity(newQuantity);
      })
      .catch((err) => console.log(err));

    if (!exist) {
      axios
        .post("https://foodie-restaurant-server-blush.vercel.app/api/v2/orders", food)
        .then((res) => {
          // newOrders.push(food)
          if (res.data.insertedId) {
            Swal.fire({
              title: "Good job!",
              text: "You clicked the button!",
              icon: "success",
            });
          }
        })
        .catch((err) => console.log(err));

      return;
    }

    // console.log(food._id);
    //
    axios
      .patch(`https://foodie-restaurant-server-blush.vercel.app/api/v2/orders/${food._id}`, {
        inputedQuantity,
        currentDate,
        email,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Good job!",
            text: "you modified!",
            icon: "success",
          });
        }
      });
  };

  // console.log(totalAvailability);

  return (
    <Container>
      <div className="my-5">
        <h2 className="text-center text-3xl font-bold my-3">
          Food Name: {food?.name} ({quantity ? quantity : food.quantity}){" "}
        </h2>
        <form
          onSubmit={handleOrder}
          className="space-y-2 p-10 border rounded-lg flex flex-col"
        >
          <label>Customer Name</label>
          <input
            className="px-3 py-2"
            name="name"
            type="text"
            defaultValue={user?.displayName ? user?.displayName : undefined}
            // {`${user.displayName ? defaultValue = {`$`} : undefined}`}
            placeholder="Please enter your name"
          />
          <label htmlFor="">Customer Email</label>
          <input
            name="email"
            className="px-3 py-2"
            type="text"
            defaultValue={user?.email}
            readOnly
          />
          <label htmlFor="">Quantity</label>
          <input name="quantity" type="number" defaultValue="1" />
          <input className="btn" type="submit" value="Order" />
        </form>
      </div>
    </Container>
  );
};

export default FoodOrder;
