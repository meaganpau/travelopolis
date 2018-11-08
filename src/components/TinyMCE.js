import React from "react";
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = ({ value, onEditorChange }) => (
    <Editor
        value={value} 
        onEditorChange={onEditorChange}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
            height: '40vh',
            selector: 'textarea',
            plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
            toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image',
            image_advtab: true,
        }}
    />
)

export default TinyMce;
