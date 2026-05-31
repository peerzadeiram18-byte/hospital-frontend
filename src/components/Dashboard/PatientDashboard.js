import React from "react";
 import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
  import { useNavigate } from "react-router-dom";
   const PatientDashboard = () => { const navigate = useNavigate();
     const user = JSON.parse( localStorage.getItem("user") );
      return ( <Container maxWidth="lg" sx={{ mt: 5 }} > 
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }} >
         Welcome {user?.name} </Typography> 
         <Grid container spacing={4} > {/* BOOK APPOINTMENT */}
             <Grid item xs={12} md={6}>
                 <Card sx={{ borderRadius: 4, boxShadow: 4 }} > 
                    <CardContent> 
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }} >
                             Book Appointment </Typography>
                              <Typography sx={{ mb: 3 }}> Search doctors and book appointments. </Typography> <Button variant="contained" onClick={() => navigate( "/patient-dashboard/book-appointment" ) } > Book Now </Button>
                               </CardContent> </Card> </Grid> {/* MY APPOINTMENTS */} 
                               <Grid item xs={12} md={6}> <Card sx={{ borderRadius: 4, boxShadow: 4 }} > 
                                <CardContent> <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }} >
                                     My Appointments </Typography>
                                      <Typography sx={{ mb: 3 }}> View upcoming and old appointments.
                                         </Typography> <Button variant="contained" color="secondary"
                                          onClick={() => navigate( "/patient-dashboard/my-appointments" ) } >
                                             View </Button> </CardContent> </Card> </Grid> 
                                             </Grid> </Container> ); };
                                             
 export default PatientDashboard;