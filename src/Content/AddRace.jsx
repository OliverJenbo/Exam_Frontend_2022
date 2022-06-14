import { useEffect } from "react";
import { useState } from "react";

export default function AddItem({ facade, setErrorMessage, create }) {
  const init = {
    name: "",
    location: "",
  };
  const [raceInfo, setRaceInfo] = useState(init);

  const preformCreateItem = (evt) => {
    evt.preventDefault();
    facade.createData(
      raceInfo.name,
      raceInfo.date,
      raceInfo.time,
      raceInfo.location,
      setErrorMessage
    );
    alert("item has been added");
    let form = document.getElementById("form");
    form.reset();
    setRaceInfo(init);
  };

  const onChange = (evt) => {
    setRaceInfo({ ...raceInfo, [evt.target.id]: evt.target.value });
  };

  return (
    <div className="offset-4 col-4">
      <h1>Add Race</h1>
      <form onChange={onChange} id="form">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter name"
          />
        </div>

        <div class="form-group">
          <label for="inputlocation">Date</label>
          <input
            type="text"
            class="form-control"
            id="date"
            placeholder="Enter date"
          />
        </div>

        <div class="form-group">
          <label for="inputTime">Time</label>
          <input
            type="number"
            step="0.01"
            class="form-control"
            id="time"
            placeholder="Enter Time"
          />
        </div>

        <div class="form-group">
          <label for="inputlocation">Location</label>
          <input
            type="text"
            class="form-control"
            id="location"
            placeholder="Enter location"
          />
        </div>

        <button
          type="submit"
          class="btn btn-success mt-2"
          onClick={preformCreateItem}
        >
          Add
        </button>
      </form>
    </div>
  );
}
