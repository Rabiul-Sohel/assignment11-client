import { Helmet } from "react-helmet";
import TopFoods from "../../Components/TopFoods";
import Container from "../../Utility/Container";


const Home = () => {
    return (
        <Container>
            
            <TopFoods></TopFoods>
        </Container>
    );
};

export default Home;