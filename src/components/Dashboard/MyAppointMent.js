
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip
} from "@mui/material";

const MyAppointment = () => {

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const [appointments,
  setAppointments] = useState([]);

  const token =
    localStorage.getItem("jwt");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  useEffect(() => {

    fetchAppointments();

  }, []);


  const fetchAppointments =
  async () => {

    try {

      const res =
        await axios.get(

          `${BASE_URL}/api/appointments/patient/${user.id}`,

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


  return (

    <Container
      maxWidth="lg"
      sx={{ mt: 5 }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold"
        }}
      >
        My Appointments
      </Typography>

      <Grid
        container
        spacing={3}
      >

        {
          appointments.map(
            (appointment) => (

              <Grid
                item
                xs={12}
                md={6}
                key={appointment._id}
              >

                <Card
                  sx={{
                    borderRadius: 4
                  }}
                >

                  <CardContent>

                    <Typography>
                      <strong>
                        Doctor:
                      </strong>
                      {" "}
                      {
                        appointment
                        ?.doctorId
                        ?.userId
                        ?.name
                      }
                    </Typography>

                    <Typography>
                      <strong>
                        Date:
                      </strong>
                      {" "}
                      {
                        new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()
                      }
                    </Typography>

                    <Typography>
                      <strong>
                        Slot:
                      </strong>
                      {" "}
                      {
                        appointment.slotTime
                      }
                    </Typography>

                    <Typography
                      sx={{ mt: 2 }}
                    >

                      <Chip
                        label={
                          appointment.status
                        }

                        color={
                          appointment.status === "Confirmed"
                          ? "success"
                          : appointment.status === "Rejected"
                          ? "error"
                          : "warning"
                        }
                      />

                    </Typography>

                  </CardContent>

                </Card>

              </Grid>
            )
          )
        }

      </Grid>

    </Container>
  );
};

export default MyAppointment;

