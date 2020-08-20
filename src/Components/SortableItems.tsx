import React, { FunctionComponent } from "react";
import { ReactComponent as Plus } from "../assets/images/plus.svg";

const SortableItems: FunctionComponent = () => {
  return (
    <section className="flex flex-col flex-1 font-content">
      <header className="flex px-4 py-2 items-center text-gray-900">
        <h1 className="text-2xl font-bold">Sortable Items</h1>
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
    </section>
  );
};

export default SortableItems;
