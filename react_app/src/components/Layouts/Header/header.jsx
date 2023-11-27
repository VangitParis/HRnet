import React from "react";
import { Link } from "react-router-dom";


export default function Header() { 
    return (
        <header>
      <nav className="main-nav">
        {/* Logo */}
        <Link to="/" className="main-nav-logo">
          <h1 className="title">HRnet</h1>
        </Link>
        <div className="flex-center">
            <Link to="/" className="main-nav-item">
              View
            </Link>
        </div>
      </nav>
    </header>
    )
}