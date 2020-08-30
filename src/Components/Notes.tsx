import React, { FunctionComponent, useState, useEffect } from "react";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";
import { Note } from "../models/Note";

const Notes: FunctionComponent = () => {
  const [items, setItems] = useState<Note[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3005/elements`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((elements) => elements.json())
      .then((elements) => {
        setItems(elements);
      });
    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <section className="flex flex-col flex-1 font-content">
      <header className="flex px-4 py-2 items-center text-gray-900">
        <h1 className="text-2xl font-bold">Notes</h1>
        <form className="flex items-center ml-auto my-1">
          <input
            type="text"
            name="newElementInput"
            className="mr-2 rounded-lg py-2 px-4"
            placeholder="Description"
          />
          <button className="bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            <span>Add Element</span>
          </button>
        </form>
      </header>
      <ul className="p-4 overflow-y-auto">
        {items.map((value, index) => {
          return (
            <li
              key={value.id}
              id="element-{index}"
              className="flex items-center px-3 rounded py-1 my-1 mx-4 border-l-4 border-neutral font-medium bg-white text-gray-700"
            >
              <p>{value.description}</p>
              <button className="ml-auto p-2 rounded-full hover:bg-red-100 focus:outline-none">
                <Pencil className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-red-100 focus:outline-none">
                <Trash className="w-6 h-6 text-red-500" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Notes;
