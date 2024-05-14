import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Shared/Header";
import Footer from "../Components/Shared/Footer";
import Banner from "../Components/Banner";
import FoodsBanner from "../Components/FoodsBanner";
import BlogsBanner from "../Components/BlogsBanner";
import { Helmet } from "react-helmet";

const MainLayout = () => {
  const location = useLocation();
  const navBg = (pathname) => {
    if (pathname === "/allFoods") {
      return "bg-red-600 ";
    } else if (pathname === "/user") {
      return "bg-green-600";
    } else {
      return "bg-blue-400";
    }
  };

 const scrollToSection = (id) => {
    const element = document.getElementById(id);
    // console.log(element);
    element.scrollIntoView({ behavior: "smooth" });
  };
  // console.log(location);
  if (location.pathname === "/") {
    return (
      <div>
        <div className=" text-white relative  bg-[url('/happy-waiter-serving-food-group-cheerful-friends-pub.jpg')] bg-no-repeat bg-cover ">
          <div className="absolute bg-[rgba(0,0,0,0.4)] w-full h-full rounded-lg"></div>
          <div className="relative">
            <div className="border-b ">
              <Header></Header>
              <Helmet>
                <title>Foodie | Home</title>
            </Helmet>
            </div>
            <Banner></Banner>
          </div>
        </div>

        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
  } else if (location.pathname === "/allFoods") {
    return (
      <div>
        <div className="text-white relative  bg-[url('/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai.jpg')] bg-no-repeat bg-cover ">
          <div className="absolute bg-[rgba(0,0,0,0.3)] w-full h-full rounded-lg"></div>

          <div className=" relative">
            <div className="border-b">
              <Header></Header>
            </div>
            <div className="flex justify-center h-[80vh] items-center">
              <FoodsBanner scrollToSection={scrollToSection}></FoodsBanner>
            </div>
          </div>
        </div>
        <div id="section1">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
  } else if(location.pathname === '/blogs'){
    return <div>
        <div>
        <div className="text-white relative  bg-[url('/top-view-delicious-cooked-vegetables-sliced-with-different-seasonings-dark-background-sauce-soup-food-meal-vegetable.jpg')] bg-no-repeat bg-cover ">
          <div className="absolute bg-[rgba(0,0,0,0.3)] w-full h-full rounded-lg"></div>

          <div className=" relative">
            <div className="border-b">
              <Header></Header>
            </div>
            <div className="flex justify-center h-[70vh] items-center">
              <BlogsBanner scrollToSection={scrollToSection}></BlogsBanner>
            </div>
          </div>
        </div>
        <div id="section2">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
        
    </div>
  } else {
    return (
      <div>
        <div className={`${navBg(location.pathname)}`}>
          <Header></Header>
        </div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
  }
};

export default MainLayout;
