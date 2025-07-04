import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedID, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectOption = [
    { id: 1, name: "Name" },
    { id: 2, name: "Email" },
    { id: 3, name: "Age" },
  ];
  const [selectedOption, setSelectedOption] = useState("Filter");
  const handelclick = (option) => {
    setSelectedOption(option);
  };
  const openModal = (id) => {
    setSelectedId(id);
  };

  async function getData() {
    setLoading(true);
    const response = await fetch("https://backend-fsp6.onrender.com/");
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setLoading(false);
      setData(result);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const handelDelete = async (id) => {
    const response = await fetch(`https://backend-fsp6.onrender.com/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      const modalEl = document.getElementById("exampleModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      setError("Deleted Sucessfully");
      setSelectedId(null);
      setTimeout(() => {
        setError("");
        getData();
      }, 500);
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="col-12 alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center h4">All Users</h2>
      <div className="row">
        {loading ? (
          <div
            className="col-12 col-sm-6 col-lg-4  me-2 mb-4"
            aria-hidden="true"
          >
            <div
              className="card-body rounded shadow-lg d-flex flex-column justify-content-between  "
              style={{ height: "200px" }}
            >
              <h5 className="card-title placeholder-glow pt-3">
                <span className="placeholder col-6"></span>
              </h5>
              <h6 className="card-subtitle mb-2 text-body-secondary placeholder-glow">
                <span className="placeholder col-8"></span>
              </h6>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-4"></span>
                <span className="placeholder col-3"></span>
              </p>
              <div className="d-flex justify-content-end gap-2 pe-4 pb-4 mt-2">
                <span className="btn btn-primary disabled placeholder col-5"></span>
                <span className="btn btn-danger disabled placeholder col-5"></span>
              </div>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-muted text-center mt-3">No User Found</div>
        ) : (
          <>
            <div className="row justify-content-center mt-2 mb-2">
              <div className="col-lg-6">
                <div className="input-group">
                  {/* Dropdown on left */}
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-secondary py-3 dropdown-toggle rounded-start-pill"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedOption}
                    </button>
                    <ul className="dropdown-menu">
                      {selectOption.map((elem) => (
                        <li>
                          <button
                            className="dropdown-item"
                            key={elem.id}
                            value={elem.name}
                            onClick={() => handelclick(elem.name)}
                          >
                            {elem.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Input box on right */}
                  <input
                    type="text"
                    className="form-control rounded-end-pill px-3 py-2 shadow-sm"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      border: "0px",
                    }}
                  />
                </div>
              </div>
            </div>

            {data
              .filter((elem) => {
                if (selectedOption === "Name") {
                  return elem.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                }
                if (selectedOption === "Email") {
                  return elem.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                }
                if (selectedOption === "Age") {
                  return elem.age.toString().includes(searchTerm);
                }
                return true;
              })
              .map((elem) => (
                <div
                  key={elem._id}
                  className="row col-10 col-sm-6 col-lg-4 me-2 mb-4"
                >
                  <div
                    className="card d-flex flex-column justify-content-between shadow p-3 mt-2 bg-white border-0 rounded  "
                    style={{ height: "200px" }}
                  >
                    <div className="card-body">
                      <h5>Name : {elem.name}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        Email : {elem.email}
                      </h6>
                      <p className="card-text">Age : {elem.age}</p>
                    </div>
                    <div className="d-flex gap-3 justify-content-end">
                      <Link
                        to={`/${elem._id}`}
                        className="btn btn-primary px-4"
                      >
                        Edit
                      </Link>
                      <Link
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => openModal(elem._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handelDelete(selectedID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
