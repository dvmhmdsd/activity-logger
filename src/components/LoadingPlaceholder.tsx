import React from "react";

export const LoadingPlaceholder = () => {
  return (
    <div className="p-5 w-full flex flex-col gap-5">
      <div className="animate-pulse flex items-center">
        <div className="rounded-full bg-loading h-6 w-6 mr-2"></div>
        <div className="h-3 w-32 mx-5 bg-loading rounded"></div>
        <div className="h-3 w-36 ml-10 mr-5 bg-loading rounded"></div>
        <div className="h-3 w-32 ml-20 bg-loading rounded"></div>
      </div>
      <div className="animate-pulse flex items-center">
        <div className="rounded-full bg-loading h-6 w-6 mr-2"></div>
        <div className="h-3 w-32 mx-5 bg-loading rounded"></div>
        <div className="h-3 w-36 ml-10 mr-5 bg-loading rounded"></div>
        <div className="h-3 w-32 ml-20 bg-loading rounded"></div>
      </div>
    </div>
  );
};
