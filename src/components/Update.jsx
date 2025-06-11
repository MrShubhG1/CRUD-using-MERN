import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()
  //
  const getSingleUser = async () => {
    const response = await fetch(`https://backend-fsp6.onrender.com/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName(result.name);
      setAge(result.age);
      setEmail(result.email);
      // navigate("/all")
    }
  };

  const handelUpdate = async (e)=>{
    
            const updateUser = {name,email,age};
            e.preventDefault();
            const response = await fetch(`https://backend-fsp6.onrender.com/${id}` ,{
                method : "PATCH",
                body:JSON.stringify(updateUser),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            if(!response.ok){
                console.log(result.error);
                setError(result.error)
            }
            if(response.ok){
              setError("")
                navigate("/all")
            }
        }
  
  useEffect(() => {
    getSingleUser();
  }, []);

  // const navigate = useNavigate()

  return (
    <div>
      <div className="container my-2  col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <h2 className="text-center">Edit User</h2>
        <form
          className="row align-items-center justify-content-center mt-4  shadow-lg rounded px-3 py-4"
          onSubmit={handelUpdate}
        >
          <div className="mb-3">
            <label className="form-label text-start d-block">Name :</label>
            <input
              type="text"
              placeholder="your good name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-start d-block">Email :</label>
            <input
              type="email"
              placeholder="your@email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-start d-block">Age :</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end  text-center">
            <button type="submit" className="btn btn-success px-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
