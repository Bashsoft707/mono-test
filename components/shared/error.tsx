import React from "react";

const ERRORMSG = (props: any) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{props.message}</span>
    </div>
  );
};

export default ERRORMSG;
