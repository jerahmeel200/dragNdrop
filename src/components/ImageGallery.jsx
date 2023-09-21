import { images } from "../db/data";
import classes from "./imageGallery.module.css";
import Search from "./Search/Search";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Navbar from "./navbar/Navbar";

const SortableImages = ({ image }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <img
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={image.url}
      alt={image.tag}
      className={classes.img}
    />
  );
};

const ImageGallery = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [imageList, setImagelist] = useState([]);

  // this function should filter images based on the selected tag
  const filterImages = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    const filteredImages = selectedTag
      ? images.filter((image) => image.tag.includes(selectedTag))
      : images;
    setImagelist(filteredImages);
  }, [selectedTag]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setImagelist((prevImageList) => {
      const oldIndex = prevImageList.findIndex(
        (image) => image.id === active.id
      );
      const newIndex = prevImageList.findIndex((image) => image.id === over.id);

      const updatedImageList = arrayMove(imageList, oldIndex, newIndex);
      return updatedImageList;
    });
  };

  const filterImagesByTag = (tag) => {
    const filteredImages = tag
      ? images.filter((image) => image.tag.includes(tag))
      : images;
    setImagelist(filteredImages);
  };

  return (
    <div>
      <Navbar />
      <Search onSearch={filterImagesByTag} />
      <div className={classes.search_tags}>
        <div
          className={`${classes.tag} ${
            selectedTag === null ? classes.active : ""
          }`}
          onClick={() => filterImages(null)}
        >
          All
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "foods" ? classes.active : ""
          }`}
          onClick={() => filterImages("foods")}
        >
          Food
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "houses" ? classes.active : ""
          }`}
          onClick={() => filterImages("houses")}
        >
          Houses
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "bikes" ? classes.active : ""
          }`}
          onClick={() => filterImages("bikes")}
        >
          Bikes
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "animals" ? classes.active : ""
          }`}
          onClick={() => filterImages("animals")}
        >
          Animals
        </div>
      </div>
      <div className={classes.image_list}>
        {imageList.length === 0 ? (
          <div className="centered">
            <h3>No items found</h3>
          </div>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={imageList}
              strategy={horizontalListSortingStrategy}
            >
              {imageList.map((image) => {
                return <SortableImages key={image.id} image={image} />;
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
