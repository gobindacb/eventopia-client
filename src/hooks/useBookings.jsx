import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";


const useBookings = () => {
    
 //tan stack query
 const axiosSecure = useAxiosSecure()
 const { user } = UseAuth();
 const {refetch, data: bookings= [] } = useQuery({
    queryKey: ['bookings' , user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/bookings?email=${user.email}`)
        return res.data;
    }
 })
 return [bookings, refetch]
};

export default useBookings;