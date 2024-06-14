import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";



const useEventByEmail = () => {
    
 //tan stack query
 const axiosSecure = useAxiosSecure()
 const { user } = UseAuth();
 const {refetch, data: eventByEmail= [] } = useQuery({
    queryKey: ['eventByEmail' , user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/events?email=${user.email}`)
        return res.data;
    }
 })
 return [eventByEmail, refetch]
};

export default useEventByEmail;