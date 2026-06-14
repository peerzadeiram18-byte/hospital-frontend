
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Grid,
  // Card,
  // CardContent,
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
  <div
    style={{
      background: "#F7F3EE",
      minHeight: "100vh",
      padding: "20px"
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "#FFFDF9",
        padding: "40px",
        borderRadius: "20px",
        border: "1px solid #E8DCCB",
        boxShadow: "0 8px 24px rgba(139,94,60,0.12)"
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#8B5E3C",
          fontWeight: 700,
          mb: 5
        }}
      >
        Book Appointment
      </Typography>

      <Grid container spacing={3}>
        {/* Specialty */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Select Specialty"
            value={specialtyId}
            onChange={(e) => {
              setSpecialtyId(e.target.value);
              fetchDoctors(e.target.value);
            }}
          >
            {specialties.map((s) => (
              <MenuItem
                key={s._id}
                value={s._id}
              >
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Doctor */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Select Doctor"
            value={doctorId}
            onChange={(e) =>
              setDoctorId(e.target.value)
            }
          >
            {doctors.map((d) => (
              <MenuItem
                key={d._id}
                value={d._id}
              >
                {d.userId?.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Appointment Date */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Appointment Date"
            InputLabelProps={{
              shrink: true
            }}
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(
                e.target.value
              )
            }
          />
        </Grid>

        {/* Slot Time */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Slot Time"
            placeholder="10:00 AM"
            value={slotTime}
            onChange={(e) =>
              setSlotTime(
                e.target.value
              )
            }
          />
        </Grid>

        {/* Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleBook}
            sx={{
              height: "55px",
              background: "#8B5E3C",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                background: "#734A2F"
              }
            }}
          >
            Book Appointment
          </Button>
        </Grid>
      </Grid>
    </div>

    <ToastContainer />
  </div>
);

  // return (

  //   <Container
  //     maxWidth="md"
  //     sx={{ mt: 5 }}
  //   >

  //     <Typography
  //       variant="h4"
  //       sx={{
  //         mb: 4,
  //         fontWeight: "bold"
  //       }}
  //     >
  //       Book Appointment
  //     </Typography>

  //     <Card
  //       sx={{
  //         p: 4,
  //         borderRadius: 4
  //       }}
  //     >

  //       <Grid
  //         container
  //         spacing={3}
  //       >

  //         {/* SPECIALTY */}

  //         <Grid item xs={12}>

  //           <TextField
  //             select
  //             fullWidth
  //             label="Select Specialty"
  //             value={specialtyId}
  //             onChange={(e) => {

  //               setSpecialtyId(
  //                 e.target.value
  //               );

  //               fetchDoctors(
  //                 e.target.value
  //               );
  //             }}
  //           >

  //             {
  //               specialties.map(
  //                 (s) => (

  //                   <MenuItem
  //                     key={s._id}
  //                     value={s._id}
  //                   >
  //                     {s.name}
  //                   </MenuItem>
  //                 )
  //               )
  //             }

  //           </TextField>

  //         </Grid>



  //         {/* DOCTOR */}

  //         <Grid item xs={12}>

  //           <TextField
  //             select
  //             fullWidth
  //             label="Select Doctor"
  //             value={doctorId}
  //             onChange={(e) =>
  //               setDoctorId(
  //                 e.target.value
  //               )
  //             }
  //           >

  //             {
  //               doctors.map(
  //                 (d) => (

  //                   <MenuItem
  //                     key={d._id}
  //                     value={d._id}
  //                   >
  //                     {d.userId?.name}
  //                   </MenuItem>
  //                 )
  //               )
  //             }

  //           </TextField>

  //         </Grid>



  //         {/* DATE */}

  //         <Grid item xs={12} md={6}>

  //           <TextField
  //             type="date"
  //             fullWidth
  //             value={appointmentDate}
  //             onChange={(e) =>
  //               setAppointmentDate(
  //                 e.target.value
  //               )
  //             }
  //           />

  //         </Grid>



  //         {/* SLOT */}

  //         <Grid item xs={12} md={6}>

  //           <TextField
  //             fullWidth
  //             label="Slot Time"
  //             value={slotTime}
  //             onChange={(e) =>
  //               setSlotTime(
  //                 e.target.value
  //               )
  //             }
  //           />

  //         </Grid>



  //         {/* BUTTON */}

  //         <Grid item xs={12}>

  //           <Button
  //             variant="contained"
  //             fullWidth
  //             size="large"
  //             onClick={handleBook}
  //           >
  //             Book Appointment
  //           </Button>

  //         </Grid>

  //       </Grid>

  //     </Card>

  //     <ToastContainer />

  //   </Container>
  // );
};

export default BookAppointMent;

