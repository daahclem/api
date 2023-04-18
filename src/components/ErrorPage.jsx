import React from 'react';

const ErrorPage = (props) => {
  return (
    <div>
      <h2>404</h2>
      <h3>{props.name} Not Found</h3>
    </div>
  );
};

export default ErrorPage;
