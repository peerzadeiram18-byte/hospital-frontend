import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText,
  CssBaseline, Divider, Avatar, ListItemIcon, IconButton, useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  AssignmentInd as ReceptionIcon,
  LocalPharmacy as PharmacyIcon,
  Hotel as IpdIcon,
  Science as LabIcon,
  EventNote as OpdIcon,
  ReceiptLong as BillingIcon,
  BabyChangingStation as OtIcon,
  Visibility as ViewIcon,
  Update as UpdateIcon,
  PlaylistAddCheck as AdmissionIcon,
  ListAlt as ListIcon,
  Inventory as ProcedureIcon,
  Assignment as AnesthesiaIcon,
  ChildCare as LabourRoomIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  Receipt as ViewBillIcon,
  HowToReg as PatientIcon,
  MedicalInformation as VisitIcon
}from '@mui/icons-material';

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
// import SocketContext from '../../context/SocketContext';
const drawerWidth = 260;


const ReceptionistDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const { patientId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const navigate = useNavigate();

const handleNav = (path,menuLabel) => {
  const token = localStorage.getItem('jwt');
 
  if (token && token !== "null") {
      setActiveMenu(menuLabel); 
    navigate(path);
    if (isMobile) setMobileOpen(false);
  } else {
  toast.error("Please login first.");

  }
};


const drawerContent = (
 <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <Box sx={{ flexGrow: 1 }}>
    <List sx={{ py: 1 }}>
      {[
        { label: "Patient", path: "/receptionist-dashboard/patient-form", icon: <IpdIcon /> },
        { label: "ViewPatient", path: "/receptionist-dashboard/viewPatient", icon: <PersonIcon /> },
// {
//   label: "Appointment Booking",
//   path: "/receptionist-dashboard/appointments",icon: <PersonIcon />
// },

{
  label: "Appointment List",
  path: "/receptionist-dashboard/appointment-list",icon: <PersonIcon />
},

// {
//   label: "Queue Management",
//   path: "/receptionist-dashboard/queue-management",icon: <PersonIcon />
// },
        { label: "Patient Visits Viewer", path: "/receptionist-dashboard/patient-visits-viewer", icon: <PharmacyIcon /> },
        //  { label: "Update Patient Satus", path: "/receptionist-dashboard/UpdatePatientStatus", icon: <UpdateIcon /> },
        { label: "IPD Admission Form", path: "/receptionist-dashboard/IPDAdmissionForm", icon: <AdmissionIcon /> },
         { label: "IPD Admission List", path: `/receptionist-dashboard/IPDAdmissionList/${patientId}`, icon: <ListIcon /> },
        { label: "ProcedureForm", path: "/receptionist-dashboard/ProcedureForm", icon: <ProcedureIcon /> },
         { label: "AnesthesiaForm", path: "/receptionist-dashboard/AnesthesiaForm", icon: <AnesthesiaIcon /> },
        { label: "ViewAnesthesiaForm", path: "/receptionist-dashboard/ViewAnesthesiaForm", icon: <AnesthesiaIcon /> },
        { label: "LabourRoom", path: "/receptionist-dashboard/LabourRoom", icon: <LabourRoomIcon /> },
        { label: "ViewLabourRoom", path: "/receptionist-dashboard/ViewLabourRoom", icon: <LabourRoomIcon /> },
  
        { label: "Billing", path: "/receptionist-dashboard/Billing", icon: <BillingIcon /> },
        { label: "ViewBill", path: "/receptionist-dashboard/ViewBill", icon: <ViewBillIcon /> },
        // { label: "PaymentForm", path: "/receptionist-dashboard/PaymentForm", icon: <PaymentIcon /> },
              { label: "DischargePatient", path: "/receptionist-dashboard/DischargePatient", icon: <LabIcon /> },
        { label: "BillPaymentHistory", path: "/receptionist-dashboard/BillPaymentHistory", icon: <HistoryIcon /> },
      ].map(({ label, path, icon }) => (
        <ListItem
          key={label}
          button
          onClick={() => handleNav(path, label)}
          sx={{
            px: 3,
            py: 1,
             cursor: 'pointer',
            // backgroundColor: activeMenu === label ? '#e3f2fd' : 'transparent',
            // borderLeft: activeMenu === label ? '4px solid #1976d2' : 'none',

            backgroundColor:
  activeMenu === label ? '#e0f2f1' : 'transparent',

borderLeft:
  activeMenu === label ? '4px solid #00695c' : 'none',
            // '&:hover': {
            //   backgroundColor: '#f5f5f5',
            // }
            '&:hover': {
  backgroundColor: '#f1f8f7',
}
          }}
        >
          {/* <ListItemIcon sx={{ color: activeMenu === label ? '#1976d2' : 'inherit', minWidth: 36 }}> */}

          <ListItemIcon
  sx={{
    color: activeMenu === label ? '#00695c' : '#455a64',
    minWidth: 36
  }}
>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontWeight: 500,
              // color: activeMenu === label ? '#1976d2' : 'inherit'
              color: activeMenu === label ? '#00695c' : '#37474f'
            }}
          />
        </ListItem>
      ))}
    </List>
  </Box>

  {/* 🚪 Logout at bottom */}
 
</Box>

);


  return (
<Box>


      {/* AppBar */}
      {/* <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: 'purple' }}> */}

      <AppBar
  position="fixed"
  sx={{
    zIndex: 1201,
    background: "linear-gradient(90deg, #00695c, #0b7a6e)",
    boxShadow: "0 4px 15px rgba(0,105,92,0.25)"
  }}
>
<Toolbar
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    minHeight: '64px',
  }}
>
  {/* Left side: Menu + Title */}
 <Box
  onMouseEnter={() => setIsMenuHovered(true)}
  onMouseLeave={() => setIsMenuHovered(false)}
  sx={{
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }}
>


  <IconButton
  color="inherit"
  onClick={() => setMobileOpen(prev => !prev)}
  edge="start"
  sx={{
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    transition: '0.3s',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.25)',
      transform: 'scale(1.05)',
    }
  }}
>
  <MenuIcon />
</IconButton>
  
    {/* <IconButton
      color="inherit"
      onClick={() => setMobileOpen(prev => !prev)}
      edge="start"
      sx={{

        background: '#ffffff',
borderRight: '1px solid #b2dfdb',
boxShadow: '4px 0 15px rgba(0,105,92,0.08)',
        // backgroundColor: 'rgba(255,255,255,0.2)',
        // transform: 'scale(1.1)',
        // transition: 'all 0.2s ease-in-out',
      }}
    >
      <MenuIcon />
    </IconButton> */}
  
</Box>

  {/* Right side: Logout */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {/* <IconButton
      color="inherit"
      onClick={() => {
        localStorage.removeItem("jwt");
        window.location.href = "/";
      }}
      edge="end"
      title="Logout"
    >
      <LogoutIcon />
    </IconButton> */}

    <IconButton
  color="inherit"
  onClick={() => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }}
  sx={{
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.15)',
      transform: 'scale(1.05)'
    },
    transition: '0.3s'
  }}
>
  <LogoutIcon />
</IconButton>

  </Box>
</Toolbar>

      </AppBar>

      {/* Sidebar - Responsive */}
      <Box component="nav">
<Drawer
  variant="temporary" // ← Always temporary
  open={mobileOpen}   // ← Controlled only by state
  onClose={() => setMobileOpen(false)}
  ModalProps={{ keepMounted: true }}
  sx={{
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid #e0e0e0',
      paddingTop: '64px',
      alignItems: 'flex-start',
    },
  }}
>
  {drawerContent}
</Drawer>

      </Box>


      {/* Main Content */}
      {/* <Box
  component="main"
  sx={{
    p: 3,
    width:"100%"
  }}
> */}

<Box
  component="main"
  sx={{
    p: 3,
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f4f8f7"
  }}
>

        <Toolbar />
      
        {/* <Typography variant="body1" sx={{ mb: 2 }}> */}

  <Typography
  variant="h5"
  sx={{
    color: "#00695c",
    fontWeight: 700,
    mb: 3,
    mt: 1
  }}
>
  Hospital Management System
</Typography>
<div style={{ display: 'flex' }}>
      {/* Sidebar here */}
      <div style={{ flex: 1 }}>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <SocketContext/> ✅ Socket logic */}
      </div>
    </div>
         <Outlet />
         <ToastContainer position="top-right" autoClose={3000} />

      </Box>
    </Box>
  );
};

export default  ReceptionistDashboard;
