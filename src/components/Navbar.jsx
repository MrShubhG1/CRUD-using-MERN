import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Mern</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Create User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/all">Show All User</Link>
        </li>
  
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default navbar