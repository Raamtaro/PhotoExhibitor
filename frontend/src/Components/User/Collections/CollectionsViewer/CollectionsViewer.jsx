import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../../Contexts/UserContext";
import "./styles/CollectionsViewer.css";
import MeshImageWrapper from "./MeshImageWrapper/MeshImageWrapper";

import Lenis from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/all";

import { calcFov, debounce, lerp } from "../../../../utils/utils";

import Scene from "../../../Three/Scene";
import MeshComponent from "../../../Three/MeshComponent/MeshComponent";

gsap.registerPlugin(useGSAP);

const CollectionsViewer = () => {
  // const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const [currentCollection, setCurrentCollection] = useState({});
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const images = [
    {
      url: "https://res.cloudinary.com/dcar5qxqh/image/upload/v1724263862/glyxlu2norxrwtccqtsv.jpg",
      id: 11,
    },
    {
      url: "https://res.cloudinary.com/dcar5qxqh/image/upload/v1724264067/jkaqo03zwmmfkbuyxwqx.jpg",
      id: 9,
    },
    {
      url: "https://res.cloudinary.com/dcar5qxqh/image/upload/v1724264088/xc1m6nrhniyagbgeto5m.jpg",
      id: 13,
    },
    {
      url: "https://res.cloudinary.com/dcar5qxqh/image/upload/v1724727997/uete1ienb675lv5oqfwi.jpg",
      id: 7,
    },
    {
      url: "https://res.cloudinary.com/dcar5qxqh/image/upload/v1724728409/fdzv0l7ok6cqo2hug9q9.jpg",
      id: 22,
    },
  ];

  const scroll = useRef({
    scrollY: 0,
    scrollVelocity: 0,
  });
  const lenis = useLenis();

  useEffect(() => {
    // Listen to Lenis scroll events
    if (lenis) {
      lenis.on("scroll", ({ scrollY, velocity }) => {
        scroll.current.scrollY = scrollY;
        scroll.current.scrollVelocity = velocity;
      });
    }
  }, [lenis]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const getCollectionInfo = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://photoexhibitor-dev.up.railway.app/collections/${id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const result = await response.json();
  //         setCurrentCollection(result.collection);
  //         setImages(result.collection.images);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError("Couldn't retrieve the collection");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getCollectionInfo();
  // }, [id]);

  //debug statements
  // useEffect(
  //   ()=>
  //     {
  //       console.log(currentCollection)
  //       console.log(images)
  //     },
  //   [
  //     currentCollection,
  //     images
  //   ]
  // )

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <header className="viewer-header">
        <div className="viewer-header-line">
          This is the {currentCollection?.name} collection.
        </div>
        <div className="viewer-header-line line-author">{user?.name}</div>
      </header>
      <Scene />
      <ReactLenis root>
        <div className="collections-viewer-main">
          <div className="collections-grid">
            {images.map((image, index) => (
              //Gonna need to make a ThreeImage.jsx component using the View tool
              // <figure className={`img-wrap img-wrap-${index + 1}`} key={index} >
              //   <img className="img" src={image.url} alt={`Blur Exhibit ${index + 1}`} />
              //   <figcaption><strong>BE{`${image.id < 10 ? '0' : ''}${image.id}`}</strong></figcaption>
              // </figure>
              <MeshImageWrapper key={index} image={image} index={index} />
            ))}
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default CollectionsViewer;
