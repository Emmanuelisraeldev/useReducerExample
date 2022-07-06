import "./styles.css";
import React, { useReducer } from "react";
import Modal from "./Modal";

const data = [
  { id: 1, name: "john" },
  { id: 2, name: "peter" },
  { id: 3, name: "susan" },
  { id: 4, name: "anna" }
];

const App = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "newitem":
        return {
          ...state,
          people: [...state.people, action.payload],
          showModal: true,
          modalContent: "item added"
        };
      case "setname":
        return { ...state, name: action.payload };
      case "novalue":
        return {
          ...state,
          showModal: true,
          modalContent: "enter value"
        };
      case "closemodal":
        return { ...state, showModal: false };
      case "removeItem":
        return {
          ...state,
          people: state.people.filter((person) => {
            return person.id !== action.payload;
          })
        };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.name) {
      const newItem = { id: new Date().getTime().toString(), name: state.name };
      dispatch({ type: "newitem", payload: newItem });
    } else {
      dispatch({ type: "novalue" });
    }
    dispatch({ type: "setname", payload: "" });
  };

  const closeModal = () => {
    dispatch({ type: "closemodal" });
  };
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    people: data,
    modalContent: "",
    showModal: false
  });
  console.log(state);

  return (
    <>
      {state.showModal && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
        />
        <button type="submit">add</button>
      </form>
      {state.people.map((person) => {
        return (
          <div key={person.id}>
            <h3>{person.name}</h3>
            <button
              onClick={(e) =>
                dispatch({ type: "removeItem", payload: person.id })
              }
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default App;
