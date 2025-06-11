import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handelSubmit = async (e)=>{
        const addUser = {name,email,age};
        e.preventDefault();
        const response = await fetch("https://backend-fsp6.onrender.com/" ,{
            method : "POST",
            body:JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error)
            setSuccess(false);
        }
        if(response.ok){
            console.log(result)
            setError("")
            setName("")
            setAge("")
            setEmail("")
            setSuccess(true)
            // navigate("/all")
            setTimeout(()=>{
              setSuccess(false);
              navigate("/all")
            },2000)
        }
    }


  return (
    <div className="container my-2 col-xl-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          Successfully added!
        </div>
      )}
      <h2 className="text-center">Enter the data</h2>
      <form className="row align-items-center justify-content-center mt-4 shadow-lg p-3 m-1" style={{background:"e3e3c4"}} onSubmit={handelSubmit}>
        <div className="mb-3">
          <label className="form-label text-start d-block">Name :</label>
          <input
            type="text"
            placeholder="your good name"
            className="form-control"
            value={name} onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-start d-block">Email :</label>
          <input
            type="email"
            placeholder="your@email"
            className="form-control"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-start d-block">Age :</label>
          <input type="number" className="form-control"
          value={age} onChange={(e)=>setAge(e.target.value)} />
        </div><div className="d-flex ">
        <button type="submit" className="btn btn-primary px-3 ">
          Submit
        </button></div>
      </form>
    </div>
  );
};

export default Create;
