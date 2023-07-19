import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div id="pagination" className="pagination">
      <button
        id="previous"
        disabled={currentPage === 1}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
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
