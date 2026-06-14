import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Paper,
  Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import PendingRadiologyOrders from "./PendingRadiologyOrders";

const drawerWidth = 240;

const RadiologyDashboard = () => {

  const [selectedPage,setSelectedPage] =
    useState("dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    navigate("/");

  };

  const renderPage = () => {

    switch(selectedPage)
    {
      case "orders":
        return <PendingRadiologyOrders />;

      default:
        return (
          <Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Radiology Dashboard
            </Typography>

            <Typography sx={{mt:2}}>
              Welcome To Radiology Department
            </Typography>

          </Box>
        );
    }
  };

  return (
    <Box sx={{display:"flex"}}>

      <CssBaseline/>

      <AppBar
        position="fixed"
        sx={{
          width:`calc(100% - ${drawerWidth}px)`,
          ml:`${drawerWidth}px`
        }}
      >
        <Toolbar
          sx={{
            display:"flex",
            justifyContent:"space-between"
          }}
        >
          <Typography variant="h6">
            Radiology Panel
          </Typography>

          <Button
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width:drawerWidth,
          flexShrink:0,

          "& .MuiDrawer-paper":{
            width:drawerWidth,
            background:"#0f172a",
            color:"#fff"
          }
        }}
      >
        <Toolbar/>

        <Typography
          variant="h5"
          sx={{
            textAlign:"center",
            p:2,
            fontWeight:"bold"
          }}
        >
          Radiology
        </Typography>

        <List>

          <ListItemButton
            onClick={()=>
              setSelectedPage("dashboard")
            }
          >
            <ListItemText
              primary="Dashboard"
            />
          </ListItemButton>

          <ListItemButton
            onClick={()=>
              setSelectedPage("orders")
            }
          >
            <ListItemText
              primary="Pending Orders"
            />
          </ListItemButton>

        </List>

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow:1,
          p:4,
          background:"#f1f5f9",
          minHeight:"100vh"
        }}
      >
        <Toolbar/>

        <Paper
          elevation={3}
          sx={{
            p:3,
            borderRadius:3
          }}
        >
          {renderPage()}
        </Paper>

      </Box>

    </Box>
  );
};

export default RadiologyDashboard;