import React,{
 useEffect,
 useState
}
from "react";

import axios from "axios";

import {
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Button,
 Typography
}
from "@mui/material";

import { useNavigate }
from "react-router-dom";

const PendingRadiologyOrders = () => {

 const [orders,setOrders] =
 useState([]);

 const navigate =
 useNavigate();

 const BASE_URL =
 process.env.REACT_APP_BASE_URL;

 useEffect(()=>{

   fetchOrders();

 },[]);

//  const fetchOrders =
//  async()=>{

//    try{

//      const token =
//      localStorage.getItem("jwt");

//      const res =
//      await axios.get(
//        `${BASE_URL}/api/radiology/orders`,
//        {
//          headers:{
//            Authorization:
//            `Bearer ${token}`
//          }
//        }
//      );

//      setOrders(res.data);

//    }
//    catch(err){

//      console.log(err);

//    }

//  };


const fetchOrders =
async()=>{

  try{

    const token =
    localStorage.getItem("jwt");

    const res =
    await axios.get(
      `${BASE_URL}/api/radiology/orders`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    console.log("Orders:", res.data);

    setOrders(res.data);

  }
  catch(err){

    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    console.log(err);

  }

};



 return(

 <>

 <Typography
 variant="h5"
 sx={{mb:3}}
 >
 Pending Radiology Orders
 </Typography>

 <TableContainer
 component={Paper}
 >
   <Table>

     <TableHead>

       <TableRow>

         <TableCell>
           Patient
         </TableCell>

         <TableCell>
           Doctor
         </TableCell>

         <TableCell>
           Test
         </TableCell>

         <TableCell>
           Status
         </TableCell>

         <TableCell>
           Action
         </TableCell>

       </TableRow>

     </TableHead>

     <TableBody>

       {
         orders.map(order=>(

         <TableRow
         key={order._id}
         >

           <TableCell>
             {
               order.patientId?.fullName
             }
           </TableCell>

           <TableCell>
             {
               order.doctorId?.userId?.name
             }
           </TableCell>

           <TableCell>
             {order.testType}
           </TableCell>

           <TableCell>
             {order.status}
           </TableCell>

           <TableCell>

             <Button
             variant="contained"
             onClick={()=>
               navigate(
                 `/radiology-report/${order._id}`
               )
             }
             >
               Add Report
             </Button>

           </TableCell>

         </TableRow>

         ))
       }

     </TableBody>

   </Table>
 </TableContainer>

 </>

 );
};

export default PendingRadiologyOrders;