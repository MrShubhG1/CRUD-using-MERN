import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      //   console.log(result);
      setData(result);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const handelDelete =  async(id)=>{
    // http://localhost:5000" 
    const response = await fetch(`http://localhost:5000/${id}`,{
        method:"DELETE",
    })
    const result = await response.json()

        if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
        setError("Deleted Sucessfully")
        setTimeout(() => {
           setError("")
           getData() 
        }, 1000);
    }
  }
  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center">All data</h2>
      <div className="row">
        {data?.map((elem) => (
          <div key={elem._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5>{elem.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {elem.email}
                </h6>
                <p className="card-text">{elem.age}</p>
                <Link to={`/${elem._id}`} className="card-link">
                  Edit
                </Link>
                <Link to="#" className="card-link" onClick={()=>handelDelete(elem._id)}>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
