import React from "react";
import "../../styles/sass/pages/_home.scss";


import Form from "../../components/Form/form";

export default function Home() {
  return (
    <main className="container-fluid gradient-background mt-0 d-flex flex-column justify-content">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <Form />
      </div>
    </main>
  );
}
