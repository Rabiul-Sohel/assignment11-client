
import Container from '../../Utility/Container';
import useAuth from '../../Hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ModifyFood = () => {
    const {user} = useAuth()
    const {id} = useParams()
    const [food, setFood] = useState({})
    console.log(food);
    useEffect(() => {
        axios
          .get(`https://foodie-restaurant-server-blush.vercel.app/api/v2/foods/${id}`)
          .then((res) => setFood(res.data));
      }, [id]);
    const handleFoodAdd = e =>{
        e.preventDefault()
        const form = e.target;
        let name = form.name.value;
        let category = form.category.value;
        let description = form.description.value;
        let origin = form.origin.value;
        let price = parseFloat(form.price.value);
        let image = form.image.value;   
        let quantity = parseInt(form.quantity.value);
        const madeBy = user?.displayName;

        const food = {
            name, image, category, description, price, origin, quantity, madeBy
        }
        // console.log(food);
        axios.patch(`https://foodie-restaurant-server-blush.vercel.app/api/v2/modifyingFood/${id}`, food  )
            .then(res => {
                if(res.data.modifiedCount){
                    Swal.fire({
                        title: 'Greate Job',
                        text: 'Food added Successfully',
                        icon: 'success'
                    })
                }
            })
        //   form.name.value = '';
        //   form.category.value = '';
        //   form.price.value = '';
        //   form.image.value = '';
        //   form.description.value = '';
        //   form.origin.value = '';
        //   form.quantity.value = '';
          
          
    }
  return (
    <Container>
      <div className="w-2/3 mx-auto my-5">
        <h2 className="text-center text-3xl font-bold">Modify: {food?.name} </h2>
        <form onSubmit={handleFoodAdd} className="card-body grid grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              defaultValue={food?.name}
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
              defaultValue={food?.category}
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
                defaultValue={food?.origin}
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
             defaultValue={food?.quantity}
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
            defaultValue={food?.price}
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
              defaultValue={food?.image}
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
              defaultValue={food?.description}
              name="description"
              className="input input-bordered"
              required
            />
          </div>
         
          <div className="form-control mt-6 col-span-2">
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ModifyFood;