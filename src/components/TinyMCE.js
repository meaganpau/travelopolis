import React from "react"
import { Editor } from "@tinymce/tinymce-react"

// The editor itself is loaded from Tiny Cloud (not bundled), using the API key.
// "8" always gets the newest TinyMCE 8 release, so security fixes arrive without a rebuild.
const TinyMce = ({ value, onEditorChange }) => (
    <Editor
        value={value}
        onEditorChange={onEditorChange}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        cloudChannel="8"
        init={{
            height: "40vh",
            promotion: false,
            plugins: [
                "preview",
                "searchreplace",
                "autolink",
                "directionality",
                "visualblocks",
                "visualchars",
                "fullscreen",
                "image",
                "link",
                "media",
                "codesample",
                "table",
                "charmap",
                "pagebreak",
                "nonbreaking",
                "anchor",
                "insertdatetime",
                "advlist",
                "lists",
                "wordcount",
                "help",
            ],
            toolbar:
                "blocks | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | image",
            image_advtab: true,
        }}
    />
)

export default TinyMce
