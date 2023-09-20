import SkeletonElement from "./skeletonElement";
import Shimmer from "./Shimmer";

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="loading-tags">
        <SkeletonElement type="tag" />
        <SkeletonElement type="tag" />
        <SkeletonElement type="tag" />
        <SkeletonElement type="tag" />
      </div>
      <div className="loading-cards">
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="thumbnail" />
      </div>
      <Shimmer />
    </div>
  );
};

export default LoadingSkeleton;
