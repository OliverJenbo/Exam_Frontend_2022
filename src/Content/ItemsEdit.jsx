import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ItemsEdit({ facade, setErrorMessage }) {
  const [item, setItem] = useState({ name: "", value: "" });

  const id = parseInt(useParams().id);

  return (
    <div>
      <h1>Edit</h1>
    </div>
  );
}

export default ItemsEdit;
