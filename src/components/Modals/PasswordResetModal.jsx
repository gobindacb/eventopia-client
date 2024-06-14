import { useState } from "react";
import UseAuth from "../../hooks/UseAuth";


const PasswordResetModal = () => {

    const {resetPass} = UseAuth() || {};
    
    const [email, setEmail] = useState('');
    const handleSubmit = () =>{
        resetPass(email)
            .then(() =>{
                
            });
    }

    return (
        <div>
            <label className="label">
                <a onClick={() => document.getElementById('my_modal_2').showModal()} className="label-text-alt link link-hover">Forgot password?</a>
            </label>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col gap-4">
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <button className="btn bg-green-400" onClick={handleSubmit}>Submit</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="btn btn-sm btn-accent">close</button>
                </form>
            </dialog>
        </div>
    );
};

export default PasswordResetModal;