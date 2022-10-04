import React from "react";
import DefaultLayout from "./DefaultLayout";
function DefaultHOC(props) {
  const InnerComponent = props.element;
  return (
    <>
      <DefaultLayout {...props}>
        <InnerComponent />
      </DefaultLayout>
    </>
  );
}
export default DefaultHOC;