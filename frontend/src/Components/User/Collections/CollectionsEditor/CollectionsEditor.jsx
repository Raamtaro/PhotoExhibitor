import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../../Contexts/UserContext";
import "./styles/CollectionsEditor.css";

const CollectionsEditor = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const [currentCollection, setCurrentCollection] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNavigateToViewer = () => {
    navigate(`/user/collections/${id}/view`);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("collectionId", String(id));

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://photoexhibitor-dev.up.railway.app/images/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setImages([...images, result.image]);
      }
    } catch (error) {
      console.error(error);
      setError("An error Occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getCollectionInfo = async () => {
      try {
        const response = await fetch(
          `https://photoexhibitor-dev.up.railway.app/collections/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setCurrentCollection(result.collection);
          setImages(result.collection.images);
        }
      } catch (error) {
        console.error(error);
        setError("Couldn't retrieve the collection");
      } finally {
        setLoading(false);
      }
    };
    getCollectionInfo();
  }, [id]);

  useEffect(() => {
    console.log(currentCollection);
    console.log(images);
  }, [currentCollection, images]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <div className="collections-editor-main">
        <h1>{currentCollection?.name}</h1>
        <div className="file-upload-section">
          <h2>Upload Work</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleFileUpload} disabled={!selectedFile}>
            Upload Selected File
          </button>
        </div>
        <div className="image-preview-grid">
          {images.map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image.url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="navigate-button" onClick={handleNavigateToViewer}>
          View Collection
        </button>
      </div>
    </>
  );
};

export default CollectionsEditor;
