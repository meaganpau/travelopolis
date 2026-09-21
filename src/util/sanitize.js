import DOMPurify from "dompurify"

// Journal content is HTML written in the rich text editor, and it is saved as-is.
// Anyone with an account can also send HTML straight to the API without using the editor,
// so it must be cleaned before it is put on a page. Scripts, event handlers
// (onerror=...), javascript: links and similar are removed.

// The editor's media button embeds videos as iframes. Only allow YouTube and Vimeo.
const ALLOWED_EMBEDS = /^https:\/\/(www\.youtube(-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/)/

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "IFRAME" && !ALLOWED_EMBEDS.test(node.getAttribute("src") || "")) {
        node.removeAttribute("src")
    }
    if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
        node.setAttribute("rel", "noopener noreferrer")
    }
})

export const cleanHtml = (html) =>
    DOMPurify.sanitize(html || "", {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
    })
