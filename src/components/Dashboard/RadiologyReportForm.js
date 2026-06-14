import React,{
 useState
}
from "react";

import axios from "axios";

import {
 Box,
 TextField,
 Typography,
 Button
}
from "@mui/material";

import {
 useParams,
 useNavigate
}
from "react-router-dom";

const RadiologyReportForm = ()=>{

 const {orderId} =
 useParams();

 const navigate =
 useNavigate();

 const BASE_URL =
 process.env.REACT_APP_BASE_URL;

 const [reportText,
 setReportText]
 = useState("");

 const handleSubmit =
 async()=>{

 try{

   const token =
   localStorage.getItem("jwt");

   await axios.put(
     `${BASE_URL}/api/radiology/report/${orderId}`,
     {
       reportText
     },
     {
       headers:{
         Authorization:
         `Bearer ${token}`
       }
     }
   );

   alert(
     "Report Submitted Successfully"
   );

   navigate(
     "/radiology-dashboard"
   );

 }
 catch(err){

   console.log(err);

 }

 };

 return(

 <Box>

 <Typography
 variant="h5"
 sx={{mb:3}}
 >
 Radiology Report Entry
 </Typography>

 <TextField
 fullWidth
 multiline
 rows={8}
 label="Report"
 value={reportText}
 onChange={(e)=>
 setReportText(
 e.target.value
 )}
 />

 <Button
 variant="contained"
 sx={{mt:3}}
 onClick={handleSubmit}
 >
 Submit Report
 </Button>

 </Box>

 );
};

export default RadiologyReportForm;