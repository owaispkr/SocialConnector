import React from "react";

// const footerStyle = {
//   width: "100%",
//   bottom: "0",
//   position: "absolute",
// };

export default () => {
  return (
    <footer
      // style={footerStyle}
      className="bg-dark text-white mt-5 p-4 text-center"
    >
      Copyright &copy; {new Date().getFullYear()} Social Connector
    </footer>
  );
};
