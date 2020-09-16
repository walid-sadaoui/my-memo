import React, { FunctionComponent } from "react";
import { EventEmitter } from "events";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import AriaModal from "react-aria-modal";

interface ModalProps {
  children?: React.ReactChildren;
  title?: string;
  content?: string;
  onYes?: EventEmitter;
  onNo?: EventEmitter;
  onOk?: EventEmitter;
  onCancel?: EventEmitter;
  initialFocus?: string;
  showModal?: boolean;
  onExit?: any;
}

const Modal: FunctionComponent<ModalProps> = ({ initialFocus, onExit }) => {
  return (
    <AriaModal
      titleText="Delete Item"
      onExit={onExit}
      initialFocus={initialFocus}
      verticallyCenter={true}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" role="dialog">
          <header className="flex items-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <Trash className="w-6 h-6 text-red-500" />
            </div>
            <h3
              className="text-lg font-medium text-gray-900 ml-3"
              id="modal-headline"
            >
              Delete item
            </h3>
          </header>
          <p className="text-sm text-gray-500 mt-4">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
        <footer className="flex flex-end items-center px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            id="yes-button"
            type="button"
            className="rounded-md border border-transparent px-4 py-2 bg-red-600 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Yes
          </button>
          <button
            type="button"
            className="mr-2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md border border-transparent px-4 py-2 bg-red-600 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Ok
          </button>
          <button
            type="button"
            className="mr-2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            No
          </button>
        </footer>
      </div>
    </AriaModal>
  );
};

export default Modal;
