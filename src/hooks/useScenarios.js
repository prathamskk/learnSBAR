import React from 'react'
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useScenarios = () => {
    const axiosPrivate = useAxiosPrivate();
    const { setScenarios } = useAuth();

    const refreshScenarios = async () => {
        const sceresponse = await axiosPrivate.get(
            "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/submission"
          );
          setScenarios(sceresponse.data?.scenarios);
    }
    return refreshScenarios;
}

export default useScenarios