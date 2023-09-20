import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GalleryImg from "./GalleryImg";
import UploadedImg from "../UploadedImg";
import { storage, db } from "../../firebase/firebaseConfig";
import Header from "../Header";

const Gallery = () => {
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("images")) || []
  );
  const [searchInput, setSearchInput] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track no results
  const [searching, setSearching] = useState(false); // State to track search status
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const unsubscribe = db
      .collection("images")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const updatedImages = [];
        snapshot.forEach((snap) => {
          updatedImages.push({
            id: snap.id,
            ...snap.data(),
          });
        });
        setImages(updatedImages);
        try {
          localStorage.setItem("images", JSON.stringify(updatedImages));
        } catch (error) {
          console.error("Error storing images in localStorage:", error);
        }
      });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleDeleteImage = async (imageId) => {
    console.log("click");
    // Delete the image from Firestore and Firebase Storage
    try {
      await db
        .collection("images")
        .doc(imageId)
        .delete();
      const updatedImages = images?.filter((image) => image?.id !== imageId);
      setImages(updatedImages);
      try {
        localStorage.setItem("images", JSON.stringify(updatedImages));
      } catch (error) {
        console.error("Error storing images in localStorage:", error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Function to filter images based on search input
  const handleSearch = () => {
    try {
      setLoading(true); // Set loading to true
      setTimeout(() => {
        const filtered = images?.filter((image) => {
          const tags = image?.tags;
          if (Array.isArray(tags) && tags.length > 0) {
            return tags.some(
              (tag) =>
                typeof tag === "string" &&
                tag.trim() !== "" &&
                tag.toLowerCase().includes(searchInput?.toLowerCase())
            );
          }
          return false;
        });
        setFilteredImages(filtered);

        // Set the noResults state based on the search results
        setNoResults(filtered.length === 0);
        setLoading(false); // Set loading to false
        setSearching(true); // Set searching state to true
      }, 2000); // Wait for 3 seconds
    } catch (error) {
      console.error("Error filtering images:", error);
    }
  };

  // Function to cancel the search
  const handleCancelSearch = () => {
    setSearchInput("");
    setFilteredImages([]);
    setNoResults(false);
    setSearching(false); // Set searching state to false
  };

  return (
    <>
      <Header />

      <GalleryContainer>
        <SearchContainer>
          <input
            type="text"
            placeholder="Search images..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searching ? (
            <button onClick={handleCancelSearch}>Cancel</button>
          ) : (
            <button onClick={handleSearch}>
              {loading ? "Loading..." : "Search"}
            </button>
          )}
        </SearchContainer>
        <GalleryGrid className="container">
          {noResults ? (
            // Display "Image not found" when there are no search results
            <div>Image not found</div>
          ) : (
            (filteredImages.length > 0
              ? filteredImages
              : images
            )?.map((img) => (
              <GalleryImg
                image={img}
                key={img?.id}
                handleDeleteImage={handleDeleteImage}
              />
            ))
          )}
          <UploadedImg />
        </GalleryGrid>
      </GalleryContainer>
    </>
  );
};

const GalleryContainer = styled.div`
  margin-top: 50px;
  padding: 0 15px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  input {
    padding: 5px;
    margin-right: 10px;
    border: 1px solid black;
  }

  button {
    background-color: #0074cc;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

export default Gallery;
