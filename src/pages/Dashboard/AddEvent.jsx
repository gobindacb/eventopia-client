import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddEvent = () => {
    const { user } = UseAuth();
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        // image upload to image bb and get an URL
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image
            const eventItem = {
                title: data.title,
                type: data.type,
                price: parseFloat(data.price),
                available_seats: parseFloat(data.seat),
                venue: data.venue,
                date: data.startDate,
                description: data.description,
                image: res.data.data.display_url,
                organizer: {
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL
                }
            }
            // 
            const packageRes = await axiosSecure.post('/events', eventItem);
            console.log(packageRes.data);
            if (packageRes.data.insertedId) {
                reset();
                // show toast or
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is added as new event`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image-url', res.data);
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-red-500 to-green-500 lg:text-7xl drop-shadow-2xl animate-fadeIn text-center">
                    Add a package
                </h1>
            </div>
            <div className="w-3/4 bg-red-100 p-4 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Event Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Event Title"
                            {...register("title", { required: true })}
                            className="input input-bordered w-full" />
                    </label>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event Type</span>
                            </div>
                            <select defaultValue="default" {...register('type')}
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option disabled value="default">Select a type</option>
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>

                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Ticket price</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Paid Ticket price"
                                {...register("price")}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event venue</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Event venue"
                                {...register("venue")}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    {/* tour plan */}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event Date</span>
                            </div>
                            {/* Date Picker Input Field */}
                            <DatePicker className="border p-2 rounded-md w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Available seats</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Available seats"
                                {...register("seat")}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    {/* package details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Event details</span>
                        </div>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Write a description of your package"></textarea>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Pick a image</span>
                        </div>
                        <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </label>
                    <button className="btn mt-3 w-full">Add Package <FaPlus /></button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;