import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AllRaces({ facade }) {
  const [allRaces, setAllRaces] = useState("");
  const [errorMessage, setErrorMessage] = "Error";

  const getData = (data) => {
    setAllRaces(data);
  };

  const listOfRaces = [...allRaces];

  useEffect(() => {
    facade.fetchData("race/all", getData);
  }, [facade, setErrorMessage]);

  return (
    <div>
      <h1>
        <u>All Races</u>
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listOfRaces.map((data) => (
            <tr>
              <td key={data.id}>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.date}</td>
              <td>{data.time}</td>
              <td>{data.location}</td>
              <td className="text-center">
                <NavLink to={`/showCars/${data.id}`}>
                  <button className="btn btn-success">See Cars</button>
                </NavLink>
              </td>
              <td className="text-center">
                <NavLink to={`/showDrivers/${data.id}`}>
                  <button className="btn btn-success">See Drivers</button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllRaces;
