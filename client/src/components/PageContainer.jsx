import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="container mx-auto flex flex-col justify-center align-middle p-6">
      {children}
    </div>
  );
};

export default PageContainer;
