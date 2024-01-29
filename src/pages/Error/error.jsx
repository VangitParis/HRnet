import React from "react";
import { Link } from "react-router-dom";
import '../../styles/sass/pages/_error.scss'

export default function Error() {

  return (
    <main className="mt-0 d-flex flex-column justify-content ">
      <section className="d-flex flex-column justify-content-center align-items-center">
        <i className="fa fa-exclamation-circle error-icon"></i>
        <h1 className="title-error text-danger">Oops! The page you&apos;re looking for seems to be missing.</h1>
        <p className="text-error text-dark">An error occurred, or the page may no longer exist.</p>
        <p className="text-error text-dark">Let&apos;s go back to the</p>
        <Link to="/">
          <button className="btn custom-btn-error btn-outline-danger">Home Page</button>
        </Link>
      </section>
    </main>
  );
}
