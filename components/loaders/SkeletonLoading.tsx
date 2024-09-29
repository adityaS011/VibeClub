import React from 'react';

const SkeletonLoading = ({ type }: { type: 'header_Image' | 'other' }) => {
  return (
    type === 'header_Image' && (
      <div
        className={
          'animate-pulse bg-[#e3e3e6] w-[700px] md:w-80 rounded-xl max-h-[80vh] 2xl:max-h-[50vh] h-[500px]'
        }
      ></div>
    )
  );
};

export default SkeletonLoading;
