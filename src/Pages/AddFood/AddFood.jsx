import axios from "axios";
import Container from "../../Utility/Container";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const {user} = useAuth()
    const handleFoodAdd = e =>{
        e.preventDefault()
        const form = e.target;
        let name = form.name.value;
        let category = form.category.value;
        let description = form.description.value;
        let origin = form.origin.value;
        let price = parseFloat(form.price.value);
        let image = form.image.value;
        let count = 0;
        let quantity = parseInt(form.quantity.value);
        const madeBy = user?.displayName;
        const food = {
            name, image, category, description, price, count, origin, quantity, madeBy
        }
        console.log(food);
        axios.post('https://foodie-restaurant-server-blush.vercel.app/api/v2/foods', food)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        title: 'Greate Job',
                        text: 'Food added Successfully',
                        icon: 'success'
                    })
                }
            })
          form.name.value = '';
          form.category.value = '';
          form.price.value = '';
          form.image.value = '';
          form.description.value = '';
          form.origin.value = '';
          form.quantity.value = '';
          
          
    }
  return (
    <Container>
      
      <div className="w-2/3 mx-auto my-5">
      <Helmet>
        <title> Foodie | Add Food </title>
      </Helmet>
        <h2 className="text-center text-3xl font-bold">Add a Food</h2>
        <form onSubmit={handleFoodAdd} className="card-body grid grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              className="input input-bordered"
              required
            />
          </div>
         
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Origin</span>
            </label>
            <input
              type="text"
              placeholder="Food Origin"
              name="origin"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              className="input input-bordered"
              required
            />
          </div>
         
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              placeholder="price"
              name="price"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              placeholder="image url"
              name="image"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="description"
              name="description"
              className="input input-bordered"
              required
            />
          </div>
         
          <div className="form-control mt-6 col-span-2">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddFood;
