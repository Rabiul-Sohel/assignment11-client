import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className="h-[80vh] flex justify-center items-center ">
        <div className="max-w-3xl text-white text-center">
        <h2 className="text-5xl font-bold  ">Heavenly Joy with delicious <br></br> foods and drinks</h2>  
        <p>Indulge in culinary delight at our vibrant restaurant, where flavor meets innovation in every dish. Experience unforgettable dining with a blend of exquisite tastes and impeccable service.</p>
        <Link to='/menus' className="btn rounded-none mt-5 px-6 bg-red-600 border-none hover:bg-red-700 text-white uppercase">Go to the Menu</Link>
        </div>
        </div>
    );
};

export default Banner;