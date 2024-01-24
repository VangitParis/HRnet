import React, { useEffect, useState } from 'react';

import "../../styles/sass/pages/_home.scss";
import backgroundImage from '../../assets/wave.png';

import Form from "../../components/Form/form";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();

    image.src = backgroundImage;

    image.onload = () => {
      setImageLoaded(true);
    };

    return () => {
      image.onload = null;
    };
  }, [imageLoaded]);

  const gradientBackgroundStyle = {
    backgroundImage: imageLoaded ? `url(${backgroundImage})` : 'none' ,
  };
  return (
    <main className="container-fluid mt-0 d-flex gradient-background flex-column justify-content " style={gradientBackgroundStyle} data-testid="background-image">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <Form />
      </div>
    </main>
  );
}
