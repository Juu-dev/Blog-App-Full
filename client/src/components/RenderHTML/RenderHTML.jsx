import React from "react";

function RenderHTML({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
}

export default RenderHTML;
