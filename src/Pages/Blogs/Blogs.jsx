import { Helmet } from "react-helmet";
import Container from "../../Utility/Container";

const Blogs = () => {
  return (
    <Container>
      <div className="min-h-[70vh]">
        <Helmet>
          <title>Foodie | Blogs</title>
        </Helmet>
        <h2>This is blog page</h2>
      </div>
    </Container>
  );
};

export default Blogs;
