import { useLoaderData } from "react-router-dom";



const EventDetails = () => {
    const events = useLoaderData();
    console.log(events);
    const { image, title, _id, organizer, type, price, available_seats, venue, date } = events;
    return (
        <div className="grid grid-cols-1 md:grid-cols-11">
            <div className="grid col-span-7">
                <img src={image} alt="" />
            </div>
            <div className="grid col-span-4 p-6">
                <h4 className="text-3xl font-bold text-center">{title}</h4>
                <p className="text-xl font-semibold text-center">{venue}</p>
                <div className="flex justify-between">
                    <p>Type: {type}</p>
                    <p>Price:$ {price}</p>
                </div>
                <div className="flex justify-between">
                    {/* <p>Date: {date}</p> */}
                    <p>Available seat: {available_seats}</p>
                </div>
                {/* <p>Organizer: {organizer?.name}</p> */}
                <div className="flex justify-center">
                    <button className="btn btn-secondary p-2 w-1/2">Book Now</button>
                </div>
            </div>

        </div>
    );
};

export default EventDetails;