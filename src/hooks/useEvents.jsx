import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const usePackages = () => {
    const axiosPublic = useAxiosPublic();


    const {data: packages = [], isPending: loading, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/events');
            return res.data;
        }
    })
    return [packages, loading, refetch]
};

export default usePackages;