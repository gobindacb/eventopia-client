import EventCard from "./Event/EventCard";


const TopEvents = ({ events }) => {
    return (
        <div className="mt-12 mb-6">
            <div className="mb-8">
                <h1 className="text-3xl text-center font-bold">Top Events</h1>
                <p className="text-center">Discover the top events happening near you! From tech conferences and art <br />festivals to wellness expos and startup pitch nights, find exciting free and <br /> paid events organized by industry leaders. Don’t miss out—reserve your spot today!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {
                    events.map(event => <EventCard
                        key={event._id}
                        event={event}
                    ></EventCard>)
                }
            </div>
            <div><button>See all events</button></div>
        </div>
    );
};

export default TopEvents;