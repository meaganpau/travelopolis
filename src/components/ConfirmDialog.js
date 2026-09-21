import { useEffect, useRef } from "react"
import Swal from "sweetalert2"

// A confirm/cancel popup. Shows while `show` is true.
// Calls onConfirm when the user confirms, and onCancel if they cancel, press Esc or click away.
const ConfirmDialog = ({ show, title, text, onConfirm, onCancel }) => {
    // Keep the latest callbacks without re-opening the popup every time the parent re-renders.
    const callbacks = useRef({ onConfirm, onCancel })
    callbacks.current = { onConfirm, onCancel }

    useEffect(() => {
        if (!show) return
        Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f00000",
        }).then((result) => {
            if (result.isConfirmed) {
                callbacks.current.onConfirm()
            } else {
                callbacks.current.onCancel()
            }
        })
    }, [show, title, text])

    return null
}

export default ConfirmDialog
