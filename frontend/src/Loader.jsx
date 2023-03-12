import React from "react";
function Loader({ percent }) {
  const loaderWidth = 500;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "10px",
          width: `${loaderWidth}px`,
          border: "1px solid green",
        }}
      >
        {" "}
        <div
          style={{
            height: "10px",
            width: `${(loaderWidth / 100) * percent}px`,
            backgroundColor: "green",
          }}
        ></div>
      </div>
      {`${percent}%`}
    </div>
  );
}

export default Loader;
