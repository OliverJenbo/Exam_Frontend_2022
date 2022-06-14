import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AllCars({ facade, setErrorMessage }) {
  const [allRaces, setAllRaces] = useState("");

  const getData = (data) => {
    setAllRaces(data);
  };

  const listOfRaces = [...allRaces];

  const handleDelete = (id) => {
    console.log("id: " + id);
    facade.deleteData(id, setErrorMessage);
    facade.fetchData("car/all", getData, "errorMessage");
  };

  useEffect(() => {
    facade.fetchData("car/all", getData, "errorMessage");
  }, [facade, setErrorMessage]);

  return (
    <div>
      <h1>
        <u>All Cars</u>
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Make</th>
            <th>Year</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listOfRaces.map((data) => (
            <tr>
              <td key={data.id}>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.brand}</td>
              <td>{data.make}</td>
              <td>{data.year}</td>
              <td className="text-center">
                <NavLink to={`/edit-car/${data.id}`}>
                  <button className="btn btn-success">Edit Car</button>
                </NavLink>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllCars;
