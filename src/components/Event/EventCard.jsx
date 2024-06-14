import  { useState } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import { useSpring, animated } from '@react-spring/web';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
// import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import { FaHeart } from 'react-icons/fa';

const EventCard = ({ event }) => {

    const {_id, image, title, price, venue, type, date, available_seats, organizer
    } = event;

    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const springProps = useSpring({
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0px 10px 15px -3px rgba(0, 0, 0, 0.1)'
    });

    // wishlist add
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const handleAddToCart = () => {
        if (user && user.email) {
            // send cart to the db-todo
            const cartItem = {
                packageId: _id,
                email: user.email,
                user_name: user.displayName,
                user_photo: user.photoURL,
                image,
                type,
                title,
                price,
                date,
                available_seats, 
            }
            axiosSecure.post('/wish', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${title} added to the cart`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        //   refetch the package cart to update
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged In",
                text: "Please Login to add cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes! Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <animated.div
            style={springProps}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <img className="w-full h-48 object-cover" src={image} alt={title} />
                <button
                    onClick={handleAddToCart}
                    title='Save to the wishlist'
                    className="absolute top-2 right-2 text-white"
                >
                    {isWishlisted ? (
                        <FaHeart className="w-6 h-6 text-red-500" />
                    ) : (
                        <FaHeart className="w-6 h-6 text-white" />
                    )}
                </button>
                {/* <button
                    onClick={() => handleAddToCart(pack)}
                    title='Save to the wishlist'
                    className="absolute top-2 right-2 text-white"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                >
                    {isWishlisted ? (
                        <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                        <HeartIconOutline className="w-6 h-6 text-white" />
                    )}
                </button> */}
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className='flex justify-between'>
                    <div>
                        <p className="text-gray-700 text-base">
                            Type: {type}
                        </p>
                        <p className="text-gray-700 text-base">
                            Price: ${price}
                        </p>
                        <p>Available Seats: {available_seats}</p>
                    </div>
                    <div>
                        <Link to={`/eventDetails/${_id}`} className='btn bg-green-600 text-red-600 font-bold'>View Details</Link>
                    </div>
                </div>
            </div>
        </animated.div>
    );
};

export default EventCard;