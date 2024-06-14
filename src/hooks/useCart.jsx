import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";


const useCart = () => {
    
 //tan stack query
 const axiosSecure = useAxiosSecure()
 const { user } = UseAuth();
 const {refetch, data: cart= [] } = useQuery({
    queryKey: ['cart' , user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/wish?email=${user.email}`)
        return res.data;
    }
 })
 return [cart, refetch]
};

export default useCart;