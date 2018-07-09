import React from "react";
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = props => (
    <Editor
        value={props.value} 
        onEditorChange={props.onEditorChange}
        apiKey='l7cj16c6ogw6qliwdw0raotb8c7rn35yf587ad1ertzdc965'
    />
)

export default TinyMce;
