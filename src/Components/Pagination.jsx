import React, { Fragment } from "react";
import { AiOutlineArrowLeft ,AiOutlineArrowRight } from "react-icons/ai";


export default function Pagination({previousPage,currentPage,setCurrentPage,page_number,nextPage}) {
  return (
    <Fragment>
      <div className="paginations my-16">
        <section className="pagination_container my-5">
          <div className="pagination_box flex items-center justify-center space-x-5">
            <div className="previous_btn">
              <button
                onClick={previousPage}
                disabled={currentPage === 1 ? true : false}
                className="bg-indigo-700 text-white  md:px-16 py-1.5 
                rounded-md text-center px-3"
              >
                <AiOutlineArrowLeft className="md:text-2xl" />
              </button>
            </div>
            <div className="page_number_container  flex items-center space-x-3">
              {page_number.map((pg_number) => (
                <button
                  key={pg_number}
                  onClick={() => {
                    setCurrentPage(pg_number);
                  }}
                  className={`${
                    currentPage === pg_number
                      ? "border-none bg-indigo-700 text-white rounded-full outline-none"
                      : ""
                  } rounded-full focus:border-non hover:border-none transition ease-out duration-500
                hover:bg-indigo-700 w-8 h-8 hover:border border-gray-300 border  hover:text-white`}
                >
                  {pg_number}
                </button>
              ))}
            </div>
            <div className="next_btn">
              <button
                onClick={nextPage}
                className="bg-indigo-700 md:px-16 text-white py-1.5 
                px-4 rounded-md text-center"
              >
                <AiOutlineArrowRight className="md:text-2xl" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
