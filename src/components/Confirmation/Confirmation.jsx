import { useState } from "react";
import "./Confirmation.css"
const Confirmation = ({ handleDelete, setConfirm }) => {

    const [confirmInput, setConfirmInput] = useState("");


    return (
        <div className="confirmation-popup">
            <h3>Type "CONFIRM" to delete</h3>
            <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Type CONFIRM"
                className="confirmation-input"
            />
            <button onClick={handleDelete} disabled={confirmInput !== "CONFIRM"} className="btn btn-danger">Delete</button>
            <button onClick={() => { setConfirmInput(""); setConfirm(null) }} className="btn btn-secondary">Cancel</button>
        </div>
    );
}

export default Confirmation;