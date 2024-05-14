import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFoods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("https://foodie-restaurant-server-blush.vercel.app/api/v2/foods")
      .then((res) => setFoods(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  foods.sort((a, b) => b.count - a.count);

  return (
    <div className="my-6 text-center ">
      <div className="text-center mb-5 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-3"> Top Foods </h2>
        <p>
          Discover the world's top foods, where culinary artistry meets cultural
          heritage. From the delicate balance of Japanese sushi to the fiery
          depths of Indian curry, explore a symphony of flavors that tantalize
          the senses and unite humanity through the universal language of food.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-center mb-5 h-full">
        {foods.slice(0, 6).map((food, idx) => (
          <div key={idx}>
            <div className="card  bg-base-100 shadow-xl ">
              <figure>
                <img className="h-60 w-full hover:scale-125 duration-300" src={food.image} alt="" />
              </figure>
              <div className="card-body ">
                <h2 className=" text-2xl font-semibold text-center">
                  {" "}
                  {food.name}{" "}
                </h2>
                <p> {food?.description} </p>
                <p className="">Sell: {food?.count} </p>
                <div className="flex justify-between mt-auto ">
                  <span className="text-left p-3 rounded-lg inline bg-red-600">Price: {food.price} </span>
                  <div className="card-actions justify-end flex-grow">
                    <Link to={`/singleFood/${food._id}`} className="btn btn-primary">Details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link className="mx-auto p-3 bg-blue-800 border rounded-lg" to='/allFoods'>See All</Link>
    </div>
  );
};

export default TopFoods;
