import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ShowCars({ facade }) {
  const [allRaces, setAllRaces] = useState([]);
  const [errorMessage, setErrorMessage] = "Error";

  const localURL = window.location.href;
  const id = localURL.split("/").pop();

  console.log(id);

  const getData = (data) => {
    setAllRaces(data.cars);
  };

  const listOfRaces = [...allRaces];

  useEffect(() => {
    facade.fetchData("car/getCarsByRace/" + id, getData, errorMessage);
  }, [facade, setErrorMessage]);

  return (
    <div>
      <h1>
        <u>Cars for race with ID: {id}</u>
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Make</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {listOfRaces.map((data) => (
            <tr>
              <td key={data.id}>{data.id}</td>
              <td>{data.brand}</td>
              <td>{data.make}</td>
              <td>{data.name}</td>
              <td>{data.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowCars;
