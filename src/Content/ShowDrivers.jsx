import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ShowDrivers({ facade }) {
  const [allRaces, setAllRaces] = useState("");
  const [errorMessage, setErrorMessage] = "Error";

  const localURL = window.location.href;
  const id = localURL.split("/").pop();

  console.log(id);

  const getData = (data) => {
    setAllRaces(data.drivers);
  };

  const listOfRaces = [...allRaces];

  useEffect(() => {
    facade.fetchData("driver/getDriversByRace/" + id, getData, errorMessage);
  }, [facade, setErrorMessage]);

  return (
    <div>
      <h1>
        <u>Drivers for race with ID: {id}</u>
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>birthYear</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          {listOfRaces.map((data) => (
            <tr>
              <td key={data.id}>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.birthYear}</td>
              <td>{data.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowDrivers;
