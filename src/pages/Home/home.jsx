import React, { useEffect, useState } from 'react';

import "../../styles/sass/pages/_home.scss";
import backgroundImage from '../../assets/wave.png';

import Form from "../../components/Form/form";


/**
 * Functional component representing the Home page.
 *
 * @component
 * @returns {JSX.Element} - Home page component.
 */
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

  //JSX Rendered Home component
  return (
    <main className="mt-0 d-flex flex-column justify-content ">
      <h1 className="text-center gradient-background" style={gradientBackgroundStyle} data-testid="background-image">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <Form />
      </div>
    </main>
  );
}
