import React, {
  useState
} from "react";

import axios from "axios";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useNavigate
} from "react-router-dom";

const PatientRegister = () => {

  const navigate =
    useNavigate();

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const [formData,
  setFormData] = useState({

    name: "",
    email: "",
    password: "",

    age: "",
    gender: "",

    contactNumber: "",

    address: ""
  });

  const handleChange =
  (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
        await axios.post(

          `${BASE_URL}/api/auth/register-patient`,

          formData
        );

      toast.success(
        res.data.message
      );

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Registration failed"
      );
    }
  };

  return (

    <Container
      maxWidth="sm"
      sx={{ mt: 5 }}
    >

      <ToastContainer />

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >

          Patient Register

        </Typography>

        <form
          onSubmit={handleSubmit}
        >

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Age"
            name="age"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            margin="normal"
            onChange={handleChange}
            required
          >

            <MenuItem value="Male">
              Male
            </MenuItem>

            <MenuItem value="Female">
              Female
            </MenuItem>

            <MenuItem value="Other">
              Other
            </MenuItem>

          </TextField>

          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            multiline
            rows={3}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              py: 1.5
            }}
          >

            Register

          </Button>

        </form>

      </Paper>

    </Container>
  );
};

export default PatientRegister;