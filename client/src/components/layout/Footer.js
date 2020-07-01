import React from "react";

// const footerStyle = {
//   width: "100%",
//   bottom: "0",
//   position: "absolute",
// };

export default () => {
  return (
    <footer className="footer">
      <div className="copyright text-center text-muted">
        Copyright &copy; {new Date().getFullYear()} Social Connector
      </div>
    </footer>
  );
};
