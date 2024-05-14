import { TiArrowSortedDown } from "react-icons/ti";
import Container from "../Utility/Container";


const BlogsBanner = ({scrollToSection}) => {
    return (
       <Container>
        <div className="text-center max-w-3xl space-y-2">
            <h2 className="text-5xl font-bold">Blogs</h2>
            <p>Welcome to Foodie – Where Every Bite Tells a Story! Explore mouthwatering recipes, culinary adventures, and expert tips to ignite your passion for food. Join our vibrant community of food lovers as we journey through tantalizing flavors and unforgettable dining experiences. Let's savor every moment together!</p>
            <button><button onClick={()=> scrollToSection('section2')} className="text-6xl  inline"><TiArrowSortedDown /></button></button>
        </div>
       </Container>
    );
};

export default BlogsBanner;