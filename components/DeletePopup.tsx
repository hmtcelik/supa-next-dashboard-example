"use client";

import { useState } from "react";

type DeletePopupProps = {
  onClick: () => void;
};

const DeletePopup = (props: DeletePopupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <p
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Delete
      </p>

      {isOpen && (
        <div className="cursor-default backdrop-blur-sm fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Delete User
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 bg-gray-50 px-4 py-3 sm:px-6">
                <p
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="hover:cursor-pointer mt-3 inline-flex  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </p>
                <p
                  onClick={() => {
                    props.onClick();
                    setIsOpen(false);
                  }}
                  className="hover:cursor-pointer mt-3 inline-flex  justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-5 "
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopup;
