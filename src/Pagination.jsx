import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageClick,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - 5),
    Math.min(currentPage + 4, totalPages)
  );

  return (
    <div id="pagination" className="pagination">
      <button
        id="previous"
        disabled={currentPage === 1}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <div className="page-numbers">
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageClick(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        id="next"
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
