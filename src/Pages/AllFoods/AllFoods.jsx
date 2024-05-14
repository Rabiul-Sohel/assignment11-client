import { useContext, useEffect, useState } from "react";
import Container from "../../Utility/Container";
import { authContext } from "../../Providers/AuthProvider";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllFoods = () => {
  const { name } = useContext(authContext);
  const [foods, setFoods] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [showFoods, setShowFoods] = useState([]);
  const [isPagination, setIsPagination] = useState(true);
  const [noFound, setNoFound] = useState(false);
  
  const navigate = useNavigate()

  //   console.log(totalPages);

  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  useEffect(() => {
    axios
      .get(
        `https://foodie-restaurant-server-blush.vercel.app/api/v2/foods?page=${currentPage}&limit=${limit}`
      )
      .then((res) => {
        setTotalPages(res.data.pages);
        setShowFoods(res.data.result);
      });
  }, [currentPage, limit]);
  useEffect(() => {
    axios
      .get("https://foodie-restaurant-server-blush.vercel.app/api/v2/foods")
      .then((res) => setFoods(res.data.result));
  }, []);
  //   console.log(foods);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handelNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleFoodSearch = (e) => {
    e.preventDefault();
    const foodName = e.target.search.value;
    // const foodLower = foodName.toLowercase()
    const find = foods?.filter((food) =>
      food.name.toLowerCase().includes(foodName.toLowerCase())
    );

  if (find.length > 0) {
      setShowFoods(find);
      setIsPagination(false);
      setNoFound(false);
    } else if(foodName.toLowerCase()=== 'all'){
      // setShowFoods(showFoods)
      window.location.reload()
    } else {
      setNoFound(true);
      
    }
    console.log(find);

    // setSelecedFood(find)
    //  window.location.reload(),
  };
  const handleGoBack =()=>{
    window.location.reload()
  }
  return (
    <Container>
      <Helmet>
        <title> Foodie | All Food </title>
      </Helmet>
      <div className="min-h-screen mb-8">
        <h2 id="allfoods" className="text-4xl font-bold text-center my-5">
          All Foods
        </h2>
        <div className="w-full text-center ">
          <form onSubmit={handleFoodSearch} className="join">
            <input
              className="input input-bordered join-item"
              placeholder="Food Name"
              name="search"
            />
            <input
              type="Submit"
              value="Search"
              className="btn join-item rounded-r-full"
            />
          </form>
        </div>
        <div>
          {noFound ? (
            <div className="min-h-[50vh] flex justify-center items-center flex-col">
              <h2>Data Not Found. Search in correct name</h2>
              <button className="btn" onClick={handleGoBack} >Go Back</button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {showFoods?.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    foods={foods}
                    setFoods={setFoods}
                  ></FoodCard>
                ))}
              </div>
              <div>
                {isPagination && (
                  <div className="text-center my-4">
                    <button onClick={handlePrev} className="btn">
                      Prev
                    </button>
                    {buttons?.map((button, idx) => (
                      <button
                        onClick={() => setCurrentPage(button)}
                        className={`btn px-6 ${
                          currentPage === button
                            ? "bg-red-600 hover:bg-red-600"
                            : undefined
                        }`}
                        key={idx}
                      >
                        {" "}
                        {button}{" "}
                      </button>
                    ))}
                    <button onClick={handelNext} className="btn">
                      Next
                    </button>
                    <select
                      onChange={(e) => {
                        setLimit(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue="9"
                      className="p-3 rounded-lg"
                    >
                      <option value="5">5</option>
                      <option value="9">9</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllFoods;
