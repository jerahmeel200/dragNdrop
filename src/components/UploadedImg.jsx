import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { HiUpload } from "react-icons/hi";
import Swal from "sweetalert2";
import { storage, db, timestamp } from "../firebase/firebaseConfig";

const UploadedImg = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState(""); // State for tags

  const onDrop = (acceptedFiles) => {
    Swal.fire({
      title: "Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Upload!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (acceptedFiles[0].size > 10000000) {
          alert("Image cannot be more than 10MB");
        } else {
          storage
            .ref(`images/${acceptedFiles[0].name}`)
            .put(acceptedFiles[0])
            .then((snapshot) => {
              setIsLoading(true);
              snapshot.ref.getDownloadURL().then((url) => {
                db.collection("images")
                  .add({
                    timestamp: timestamp(),
                    image: url,
                    tags: tags.split(",").map((tag) => tag.trim()), // Split and trim tags
                  })
                  .then(() => {
                    setIsLoading(false);
                    Swal.fire("Uploaded successfully!", "success");
                    setTags(""); // Clear the tags input field
                  })
                  .catch(() => {
                    setIsLoading(false);
                  });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  };

  const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <UploadedImgContainer {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <HiUpload />
        </div>

        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>
            {isLoading
              ? "Loading, please wait..."
              : "Drag and drop some image here, or click to select an image"}
          </p>
        )}
      </UploadedImgContainer>

      <input
        style={{ border: "1px solid gray" }}
        type="text"
        placeholder="Enter tag name"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </div>
  );
};

const UploadedImgContainer = styled.div`
  border: ${({ isDragActive }) =>
    isDragActive ? "2px dashed #1597E5" : "2px dashed #ccc"};
  border-radius: 6px;
  text-align: center;
  padding: 20px;
  height: 200px;
  margin-top:20px;
  svg {
    font-size: 30px;
    color: ${({ isDragActive }) => (isDragActive ? "#1597E5" : "gray")};
    margin-bottom: 10px;
    display:flex;
    justify-content:center;

    // margin-left:110px;
  }
  p {
    color: ${({ isDragActive }) => (isDragActive ? "gray" : "inherit")};
  }
};`;

export default UploadedImg;
