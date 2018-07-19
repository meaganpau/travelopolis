import React from "react";
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = props => (
    <Editor
        value={props.value} 
        onEditorChange={props.onEditorChange}
        apiKey={process.env.TINYMCE_API_KEY}
    />
)

export default TinyMce;
