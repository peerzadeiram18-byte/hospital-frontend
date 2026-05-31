
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  MenuItem,
  TextField
} from "@mui/material";

import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const BookAppointMent = () => {

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const [specialties,
  setSpecialties] = useState([]);

  const [doctors,
  setDoctors] = useState([]);

  const [specialtyId,
  setSpecialtyId] = useState("");

  const [doctorId,
  setDoctorId] = useState("");

  const [appointmentDate,
  setAppointmentDate] = useState("");

  const [slotTime,
  setSlotTime] = useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    localStorage.getItem("jwt");


  // =========================
  // FETCH SPECIALTIES
  // =========================

  useEffect(() => {

    fetchSpecialties();

  }, []);

  const fetchSpecialties =
  async () => {

    try {

      const res =
        await axios.get(

          `${BASE_URL}/api/receptionist/specialties`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setSpecialties(
        res.data.specialties || []
      );

    } catch (err) {

      console.log(err);
    }
  };


  // =========================
  // FETCH DOCTORS
  // =========================

  const fetchDoctors =
  async (id) => {

    try {

      const res =
        await axios.get(

          `${BASE_URL}/api/doctor/by-specialty/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setDoctors(
        res.data.doctors || []
      );

    } catch (err) {

      console.log(err);
    }
  };


  // =========================
  // BOOK APPOINTMENT
  // =========================

const handleBook = async () => {

  if (!specialtyId)
    return toast.error("Select Specialty");

  if (!doctorId)
    return toast.error("Select Doctor");

  if (!appointmentDate)
    return toast.error("Select Date");

  if (!slotTime)
    return toast.error("Enter Slot Time");

  try {
    await axios.post(
      `${BASE_URL}/api/appointments/create`,
      {
        existingPatientId: user.id,
        specialtyId,
        doctorId,
        appointmentDate,
        slotTime
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Appointment booked successfully");

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Error booking appointment"
    );
  }
};


  return (

    <Container
      maxWidth="md"
      sx={{ mt: 5 }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold"
        }}
      >
        Book Appointment
      </Typography>

      <Card
        sx={{
          p: 4,
          borderRadius: 4
        }}
      >

        <Grid
          container
          spacing={3}
        >

          {/* SPECIALTY */}

          <Grid item xs={12}>

            <TextField
              select
              fullWidth
              label="Select Specialty"
              value={specialtyId}
              onChange={(e) => {

                setSpecialtyId(
                  e.target.value
                );

                fetchDoctors(
                  e.target.value
                );
              }}
            >

              {
                specialties.map(
                  (s) => (

                    <MenuItem
                      key={s._id}
                      value={s._id}
                    >
                      {s.name}
                    </MenuItem>
                  )
                )
              }

            </TextField>

          </Grid>



          {/* DOCTOR */}

          <Grid item xs={12}>

            <TextField
              select
              fullWidth
              label="Select Doctor"
              value={doctorId}
              onChange={(e) =>
                setDoctorId(
                  e.target.value
                )
              }
            >

              {
                doctors.map(
                  (d) => (

                    <MenuItem
                      key={d._id}
                      value={d._id}
                    >
                      {d.userId?.name}
                    </MenuItem>
                  )
                )
              }

            </TextField>

          </Grid>



          {/* DATE */}

          <Grid item xs={12} md={6}>

            <TextField
              type="date"
              fullWidth
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(
                  e.target.value
                )
              }
            />

          </Grid>



          {/* SLOT */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              label="Slot Time"
              value={slotTime}
              onChange={(e) =>
                setSlotTime(
                  e.target.value
                )
              }
            />

          </Grid>



          {/* BUTTON */}

          <Grid item xs={12}>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleBook}
            >
              Book Appointment
            </Button>

          </Grid>

        </Grid>

      </Card>

      <ToastContainer />

    </Container>
  );
};

export default BookAppointMent;

