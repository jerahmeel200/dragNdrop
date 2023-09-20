import { useEffect, useState } from "react";
import LoadingSkeleton from "../components/skeletons/LoadingSkeleton";
import ImageGallery from "../components/ImageGallery";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 2500)
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {/* <h1>Home Page</h1> */}
          <ImageGallery />
        </>
      )}
    </div>
  );
};

export default Home;
