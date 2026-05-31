// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Paper,
//   Stack
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import socket from "../../context/socket";
// // const socket = io(process.env.REACT_APP_BASE_URL, {
// //   withCredentials: true,
// // });

// const DoctorDashboardHome = () => {
//   const [assignedVisits, setAssignedVisits] = useState([]);
//   const [doctor, setDoctor] = useState(null);
//   const navigate = useNavigate();
//   const toastDisplayedRef = useRef(false);
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const doctorRef = useRef(null);
//   const tokenRef = useRef(null);
// const socketInitialized = useRef(false);
// useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const token = localStorage.getItem('jwt');
//   console.log(storedUser);
//   if (storedUser && token) {
//     setDoctor(storedUser);
//     doctorRef.current = storedUser;
//     tokenRef.current = token;
//   }
// }, []);


  
// const fetchVisits = async () => {
//   const token = tokenRef.current;
//   const doctorId = doctorRef.current?.id;
//   // console.log("Raghav: ", doctorId);
//   if (!doctorId || !token) {
//     console.warn("Missing doctorId or token");
//     return;
//   }

//   try {
//     const res = await axios.get(
//       `${BASE_URL}/api/doctor/visits/doctor/${doctorId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//     // console.log(res.data.visits);
//     setAssignedVisits(res.data.visits || []);
//   } catch (err) {
//     console.error('Error fetching assigned visits:', err.response?.data || err);
//   }
// };



// useEffect(() => {
//   if (!doctor) return;

//   const doctorId = doctor.id;

//   // ✅ JOIN ROOM AFTER CONNECT
//   socket.on("connect", () => {
//     console.log("Socket connected:", socket.id);
//     socket.emit("joinDoctorRoom", doctorId);
//     console.log("Joined doctor room:", doctorId);
//   });

//   // ✅ LISTEN EVENT
//   socket.on("newAssignedPatient", async (data) => {
//     console.log("Socket received:", data);

//     if (data.doctorId === doctorId) {
//       await fetchVisits();
//       toast.success(`🩺 New patient: ${data.patientName}`);
//     }
//   });

//   fetchVisits();

//   return () => {
//     socket.off("newAssignedPatient");
//     socket.off("connect");
//   };

// }, [doctor]);

//   const waitingVisits = assignedVisits.filter(visit => visit.status === 'Waiting');

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Welcome Dr. {doctor?.name}
//       </Typography>

//       <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
//         Assigned Patients
//       </Typography>

//       {waitingVisits.length === 0 ? (
//         <Typography>No assigned patients at the moment.</Typography>
//       ) : (
//         waitingVisits.map((visit, index) => {
//           const isEven = index % 2 === 0;
//           const backgroundColor = isEven ? '#e3f2fd' : '#e8f5e9'; // light blue and light green
//           const borderColor = isEven ? '#9c27b0' : '#2e7d32'; // purple and green

//           return (
//             <Accordion
//               key={visit._id}
//               sx={{
//                 mb: 2,
//                 backgroundColor,
//                 borderLeft: `6px solid ${borderColor}`,
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography sx={{ fontWeight: 'bold' }}>
//                   {index + 1}. {visit.patientDbId?.fullName || 'Unnamed Patient'}-{"new patient"}
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Paper elevation={2} sx={{ p: 2 }}>
//                   <Typography><strong>Patient ID:</strong> {visit.patientId}</Typography>
//                   <Typography><strong>Status:</strong> {visit.status}</Typography>

//                   <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() =>
//                         navigate(`/doctor-dashboard/ConsultationForm/${visit._id}`, {
//                           state: { visit },
//                         })
//                       }
//                     >
//                       Start Consultation
//                     </Button>

//                     {visit.patientDbId?._id && (
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={() =>
//                           navigate(`/doctor-dashboard/PreviousConsultantPatient/${visit.patientDbId._id}`)
//                         }
//                       >
//                         View Previous Consultations
//                       </Button>
//                     )}
//                   </Stack>
//                 </Paper>
//               </AccordionDetails>
//             </Accordion>
//           );
//         })
//       )}
//  <ToastContainer position="top-right" autoClose={3000} />
//     </Container>
//   );
// };

// export default DoctorDashboardHome;


import React, {
  useEffect,
  useRef,
  useState
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  Chip
} from "@mui/material";

import ExpandMoreIcon
from "@mui/icons-material/ExpandMore";

import { useNavigate }
from "react-router-dom";

import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import socket from "../../context/socket";


const DoctorDashboardHome = () => {

  const [assignedVisits,
  setAssignedVisits] = useState([]);

  const [appointments,
  setAppointments] = useState([]);

  const [doctor,
  setDoctor] = useState(null);

  const navigate = useNavigate();

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const doctorRef =
    useRef(null);

  const tokenRef =
    useRef(null);


  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    const token =
      localStorage.getItem("jwt");

    if (storedUser && token) {

      setDoctor(storedUser);

      doctorRef.current =
        storedUser;

      tokenRef.current =
        token;
    }

  }, []);



  // =========================
  // FETCH VISITS
  // =========================

  const fetchVisits =
  async () => {

    try {

      const token =
        tokenRef.current;

      const doctorId =
        doctorRef.current?.id;

      if (!doctorId || !token)
        return;

      const res =
        await axios.get( `${BASE_URL}/api/doctor/visits/doctor/${doctorId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setAssignedVisits(
        res.data.visits || []
      );

    } catch (err) {

      console.log(err);
    }
  };



  // =========================
  // FETCH APPOINTMENTS
  // =========================

  const fetchAppointments =
  async () => {

    try {

      const token =
        tokenRef.current;

      const doctorId =
        doctorRef.current?.id;

      if (!doctorId || !token)
        return;

      const res =
        await axios.get(

          `${BASE_URL}/api/appointments/doctor/${doctorId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setAppointments(
        res.data.appointments || []
      );

    } catch (err) {

      console.log(err);
    }
  };



  // =========================
  // SOCKET
  // =========================

  useEffect(() => {

    if (!doctor) return;

    const doctorId =
      doctor.id;

    socket.on(
      "connect",
      () => {

        socket.emit(
          "joinDoctorRoom",
          doctorId
        );
      }
    );

    socket.on(
      "newAssignedPatient",
      async (data) => {

        if (
          data.doctorId === doctorId
        ) {

          await fetchVisits();

          await fetchAppointments();

          toast.success(
            `🩺 New patient: ${data.patientName}`
          );
        }
      }
    );

    fetchVisits();

    fetchAppointments();

    return () => {

      socket.off(
        "newAssignedPatient"
      );

      socket.off("connect");
    };

  }, [doctor]);

const updateAppointmentStatus =
async (appointmentId, status) => {

  try {

    const token =
      tokenRef.current;

    await axios.put(

      `${BASE_URL}/api/appointments/status/${appointmentId}`,

      { status },

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    toast.success(
      `Appointment ${status}`
    );

    fetchAppointments();

    fetchVisits();

  } catch (err) {

    console.log(err);

    toast.error(
      "Status update failed"
    );
  }
};

  // =========================
  // FILTERS
  // =========================

  const waitingVisits =
    assignedVisits.filter(
      (visit) =>
        visit.status === "Waiting"
    );

  const pendingQueue =
    appointments.filter(
      (a) =>
        a.status !== "Completed"
    );



  return (

    <Container
      maxWidth="lg"
      sx={{ mt: 4 }}
    >

      {/* HEADER */}

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4
        }}
      >
        Welcome Dr. {doctor?.name}
      </Typography>



      {/* DASHBOARD CARDS */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 5 }}
      >

        {/* TOTAL APPOINTMENTS */}

        <Grid
          item
          xs={12}
          md={6}
        >

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
              >
                Today's Appointments
              </Typography>

              <Typography
                variant="h3"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  mt: 2
                }}
              >
                {appointments.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>



        {/* LIVE QUEUE */}

        <Grid
          item
          xs={12}
          md={6}
        >

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
              >
                Live Queue
              </Typography>

              <Typography
                variant="h3"
                color="secondary"
                sx={{
                  fontWeight: "bold",
                  mt: 2
                }}
              >
                {pendingQueue.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>
       

       {/* TODAY APPOINTMENTS LIST */}

<Typography
  variant="h5"
  gutterBottom
  sx={{
    fontWeight: "bold",
    mb: 3,
    mt: 4
  }}
>
  Today's Appointments
</Typography>

{
  appointments.length === 0 ? (

    <Typography>
      No appointments today.
    </Typography>

  ) : (

    appointments.map((appointment, index) => (

      <Accordion
        key={appointment._id}
        sx={{
          mb: 2,
          borderRadius: 3
        }}
      >

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <Typography
              sx={{
                fontWeight: "bold"
              }}
            >
              Token #{appointment.tokenNumber}
              {" - "}
              {appointment.patientId?.fullName}
            </Typography>

            <Chip
              label={appointment.status}
              color={
                appointment.status === "Confirmed"
                ? "success"
                : appointment.status === "Rejected"
                ? "error"
                : appointment.status === "Completed"
                ? "primary"
                : "warning"
              }
            />

          </Stack>

        </AccordionSummary>

        <AccordionDetails>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3
            }}
          >

            <Typography>
              <strong>Patient:</strong>
              {" "}
              {appointment.patientId?.fullName}
            </Typography>

            <Typography>
              <strong>Slot:</strong>
              {" "}
              {appointment.slotTime}
            </Typography>

            <Typography>
              <strong>Status:</strong>
              {" "}
              {appointment.status}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
              flexWrap="wrap"
            >

              {/* CONFIRM */}

              {
                appointment.status === "Pending" && (

                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      updateAppointmentStatus(
                        appointment._id,
                        "Confirmed"
                      )
                    }
                  >
                    Confirm
                  </Button>

                )
              }

              {/* REJECT */}

              {
                appointment.status !== "Rejected" &&
                appointment.status !== "Completed" && (

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      updateAppointmentStatus(
                        appointment._id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </Button>

                )
              }

              {/* COMPLETE */}

              {
                appointment.status === "Confirmed" && (

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      updateAppointmentStatus(
                        appointment._id,
                        "Completed"
                      )
                    }
                  >
                    Complete
                  </Button>

                )
              }

              {/* START CONSULTATION */}

              {
                appointment.status === "Confirmed" && (

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      navigate(
                        `/doctor-dashboard/ConsultationForm/${appointment.visitId}`
                      )
                    }
                  >
                    Start Consultation
                  </Button>

                )
              }

            </Stack>

          </Paper>

        </AccordionDetails>

      </Accordion>

    ))
  )
}


      {/* ASSIGNED PATIENTS */}

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 3
        }}
      >
        Assigned Patients
      </Typography>



      {
        waitingVisits.length === 0
        ? (

          <Typography>
            No assigned patients.
          </Typography>

        ) : (

          waitingVisits.map(
            (visit, index) => (

              <Accordion
                key={visit._id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  overflow: "hidden"
                }}
              >

                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon />
                  }
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <Typography
                      sx={{
                        fontWeight: "bold"
                      }}
                    >
                      {index + 1}.
                      {" "}
                      {
                        visit.patientDbId
                          ?.fullName
                      }
                    </Typography>

                    <Chip
                      label={
                        visit.status
                      }
                      color="warning"
                    />

                  </Stack>

                </AccordionSummary>



                <AccordionDetails>

                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3
                    }}
                  >

                    <Typography>
                      <strong>
                        Patient ID:
                      </strong>
                      {" "}
                      {visit.patientId}
                    </Typography>

                    <Typography>
                      <strong>
                        Visit Type:
                      </strong>
                      {" "}
                      {
                        visit.visitType
                      }
                    </Typography>

                    <Typography>
                      <strong>
                        Status:
                      </strong>
                      {" "}
                      {
                        visit.status
                      }
                    </Typography>



                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mt: 3 }}
                    >

                      {/* START CONSULTATION */}

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(

                            `/doctor-dashboard/ConsultationForm/${visit._id}`,

                            {
                              state: {
                                visit
                              }
                            }
                          )
                        }
                      >
                        Start Consultation
                      </Button>



                      {/* PREVIOUS CONSULTATIONS */}

                      {
                        visit.patientDbId?._id && (

                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              navigate(

                                `/doctor-dashboard/PreviousConsultantPatient/${visit.patientDbId._id}`

                              )
                            }
                          >
                            Previous Consultations
                          </Button>

                        )
                      }

                    </Stack>

                  </Paper>

                </AccordionDetails>

              </Accordion>

            )
          )
        )
      }



      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </Container>
  );
};

export default DoctorDashboardHome;


