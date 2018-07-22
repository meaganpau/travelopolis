import React from "react";
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = props => (
    <Editor
        value={props.value} 
        onEditorChange={props.onEditorChange}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
    />
)

export default TinyMce;
