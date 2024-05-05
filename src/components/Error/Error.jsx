import React, { useEffect, useState } from "react";
import "./Error.css";

const Error = ({ errorText }) => {
  const [visible, setvisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setvisible(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {(errorText && visible) && (
        <div onClick={() => setvisible(false)} className="error">
          <div className="error-circle">
            <div>X</div>
          </div>
          <div>{errorText}</div>
        </div>
      )}
    </>
  );
};

export default Error;
