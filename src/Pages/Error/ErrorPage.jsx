import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
            <h4 className="text-3xl">404</h4>
            <Link className="btn" to='/'>Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;