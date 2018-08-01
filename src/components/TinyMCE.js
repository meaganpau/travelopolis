import React from "react";
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = props => (
    <Editor
        value={props.value} 
        onEditorChange={props.onEditorChange}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
            height: '40vh',
            selector: 'textarea',
            plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
            toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image',
            image_advtab: true,
        }}
    />
)

export default TinyMce;
