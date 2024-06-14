import { useState } from "react";
import UseAuth from "../../hooks/UseAuth";


const EditProfileModal = () => {
    const [fullName, setFullName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const { editProfile } = UseAuth();

    const handleEditSubmit = () => {
        editProfile(fullName, photoURL)
            .then(() => {

            });
    }

    return (
        <div>
            <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn bg-green-600 text-white w-full">Edit Profile</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col gap-4">
                    <input onChange={(e) => setFullName(e.target.value)} className="border-2" type="text" placeholder="Your Full Name" />
                    <input onChange={(e) => setPhotoURL(e.target.value)} className="border-2" type="text" placeholder="Your Image URL" />
                    <button onClick={handleEditSubmit} className="btn bg-green-400">Save changes</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default EditProfileModal;