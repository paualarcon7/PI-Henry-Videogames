import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
  }

  function resetInput() {
    setName("");
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Buscar
      </button>
    </>
  );
}
