import React from "react";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2 } from "lucide-react";

const GalleryImg = ({ image, handleDeleteImage }) => {
  console.log("image.tag", image.tags);
  console.log("handleDeleteImage", handleDeleteImage);

  const onDeleteClick = () => {
    // Call the handleDelete function and pass the image object or image ID, as needed.
    handleDeleteImage(image.id); // Assuming that image.id is the unique identifier for the image
  };

  return (
    <GalleryImgContainer>
      <img src={image?.image} alt={image?.alt || "Image"} />
      <DeleteButton>
        <Trash2 color="black" size={20} onClick={onDeleteClick} />
      </DeleteButton>
      <p>{image.tags}</p>
    </GalleryImgContainer>
  );
};

const GalleryImgContainer = styled.div`
  position: relative;
  height: 200px;
  border-radius: 6px;
  padding-top: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 20px;
  right: 5px;
  background-color: white;

  color: white;
  border: none;
  //   border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  align-items: ceneter;
`;

export default GalleryImg;
