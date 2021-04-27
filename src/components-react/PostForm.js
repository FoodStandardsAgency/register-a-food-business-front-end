import React from "react";
import { i18n } from "../../i18n";

const PostForm = React.forwardRef((props, ref) => (
  <form action={props.action} ref={ref} method="post">
    {props.children}
    <input type="hidden" name="_csrf" value={props.csrfToken} />
    <input type="hidden" name="language" value={i18n.language} />
  </form>
));

export default PostForm;
