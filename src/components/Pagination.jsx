import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

function Pagination(props) {
  return (
    <React.Fragment>
      <div className="container">
        {props.previousPage ? (
          <Link
            to={
              props.callFrom === 'Characters'
                ? `/characters/page/${props.page - 1}`
                : props.callFrom === 'Comics'
                ? `/comics/page/${props.page - 1}`
                : `/series/page/${props.page - 1}`
            }
            className="mx-3"
          >
            Previous
          </Link>
        ) : null}
        {props.nextPage ? (
          <Link
            to={
              props.callFrom === 'Characters'
                ? `/characters/page/${props.page + 1}`
                : props.callFrom === 'Comics'
                ? `/comics/page/${props.page + 1}`
                : `/series/page/${props.page + 1}`
            }
            className="mx-2"
          >
            Next
          </Link>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default Pagination;
