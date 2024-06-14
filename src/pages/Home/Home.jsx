import { FaHouseDamage } from "react-icons/fa";
import TopEvents from "../../components/TopEvents";
import { useLoaderData } from "react-router-dom";


const Home = () => {
    const  events  = useLoaderData();
    return (
        <div>
            <div className="mt-36 mb-32 flex flex-col justify-center items-center">
                <FaHouseDamage className="text-9xl" />
                <h1 className="text-7xl text-center">EVENTOPIA</h1>
            </div>
            <TopEvents events={events}/>
        </div>
    );
};

export default Home;