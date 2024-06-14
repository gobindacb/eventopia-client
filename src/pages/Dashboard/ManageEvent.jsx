import Swal from "sweetalert2";
import useEventByEmail from "../../hooks/useEventByEmail";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";


const ManageEvent = () => {
    const [eventByEmail, refetch] = useEventByEmail();
    console.log(eventByEmail);
    const axiosSecure = useAxiosSecure();
    const handleDeletePack = (event) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/events/${event._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${event?.title}'package have been deleted.'`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }
    return (
        <div>
            <div>
                <h2 className="text-3xl underline">Manage All {eventByEmail.length} Event of yours</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Cost</th>
                            <th>Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            eventByEmail.map((event, index) =>
                                <tr
                                    key={event._id}
                                >
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={event?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {event?.title}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{event?.type}</span>
                                    </td>
                                    <td>{event?.date} days long</td>
                                    <td>${event?.price}</td>
                                    <th>
                                        <Link to={`/eventDetails/${event._id}`} className="btn btn-ghost btn-xs"><FaEye className="text-xl text-violet-600" /></Link>
                                    </th>
                                    <th>
                                        <Link to={`/dashboard/updateEvent/${event._id}`} >
                                            <button className="btn btn-ghost btn-xs"><FaEdit className="text-xl text-yellow-600" /></button>
                                        </Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeletePack(event)} className="btn btn-ghost btn-xs"><FaTrash className="text-xl text-red-600" /></button>
                                    </th>
                                </tr>
                            )

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEvent;