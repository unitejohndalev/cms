import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="relative flex justify-end gap-5">
    <Link to="/login">

      <button>Login</button>
    </Link>
      <button>Signup</button>
    </div>
  );
}

export default Nav
