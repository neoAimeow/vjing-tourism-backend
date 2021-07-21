import React from "react";
import { useLocation } from "react-router-dom";

interface Props {}

const UpdateScenicSpot = (props: Props) => {
    const { state } = useLocation();
    console.error(`123123`, state);
    return <div> hello test page update</div>;
};

export default UpdateScenicSpot;
