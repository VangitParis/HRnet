import React from "react";
import { Link } from "react-router-dom";

export default function Error() {

  return (
    <main className="main-error">
      <section className="error-content">
        <i className="fa fa-exclamation-circle error-icon"></i>
        <h1 className="title-error">Oops! The page you&apos;re looking for seems to be missing.</h1>
        <p>An error occurred, or the page may no longer exist.</p>
        <p>Let&apos;s go back to the</p>
        <Link to="/">
          <button className="home-button">Home Page</button>
        </Link>
      </section>
    </main>
  );
}
