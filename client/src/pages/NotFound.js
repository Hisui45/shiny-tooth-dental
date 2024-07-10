import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <p>404 Page Not Found</p>  
      <h1>It seems you've gotten lost.</h1>
      <Link to='/'>Home</Link>
      </div>
  )
}

export default NotFound