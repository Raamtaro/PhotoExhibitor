import React, { useState, useEffect } from "react";
import MeshComponent from "../../../../Three/MeshComponent/MeshComponent";

const MeshImageWrapper = ({ image, index }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
  }, [image.url]);
  return (
    <>
      <figure
        className={`img-wrap img-wrap-${index + 1}`}
        style={{ height: `calc(100vw * ${aspectRatio} * .60)` }}
      >
        {/* <img className="img" src={image.url} alt={`Blur Exhibit ${index + 1}`} /> */}
        <MeshComponent url={image.url} className="img" />
        <figcaption>
          <strong>
            BE{`${image.id < 10 ? "0" : ""}${image.id ? image.id : ""}`}
          </strong>
        </figcaption>
      </figure>
    </>
  );
};

export default MeshImageWrapper;
