import React from "react";

const PostForm = React.forwardRef((props, ref) => (
  <form action={props.action} ref={ref} method="post">
    {props.children}
    <input type="hidden" name="_csrf" value={props.csrfToken} />
  </form>
));

export default PostForm;
