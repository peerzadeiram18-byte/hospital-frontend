import React from "react";
import "./AdminHome.css";
import bgImage from "../../assets/admin.jpeg";

const AdminHome = () => {
  return (
    <div
      className="admin-home"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="admin-overlay"></div>

      <div className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">

          <div>
            <h1 className="dashboard-title">
              Welcome, Admin
            </h1>

            <p className="dashboard-subtitle">
              Hospital Management Overview
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">
              A
            </div>
            <span>Admin</span>
          </div>

        </div>

        {/* Banner */}

        <div className="analytics-banner">

          <div className="banner-left">
            <h2>Hospital Analytics</h2>

            <p>
              Manage patients, doctors,
              billing and hospital
              activities from one smart
              dashboard.
            </p>
          </div>

          <div className="banner-graphic">

            <div className="circle big"></div>

            <div className="circle mid"></div>

            <div className="circle small"></div>

          </div>

        </div>

        {/* Cards */}

        <div className="cards-container">

          <div className="card">
            <h3>👨‍⚕️ Doctors</h3>
            <p>Total: <strong>18</strong></p>
          </div>

          <div className="card">
            <h3>👩‍💼 Staff</h3>
            <p>Active: <strong>25</strong></p>
          </div>

          <div className="card">
            <h3>🏥 Departments</h3>
            <p>Count: <strong>12</strong></p>
          </div>

          <div className="card">
            <h3>📅 Appointments Today</h3>
            <p><strong>34</strong> Scheduled</p>
          </div>

          <div className="card">
            <h3>💰 Billing</h3>
            <p>Today: <strong>₹48,000</strong></p>
          </div>

          <div className="card">
            <h3>🧍 Patients Admitted</h3>
            <p><strong>58</strong> Currently</p>
          </div>

          <div className="card">
            <h3>🛏 Available Beds</h3>
            <p><strong>22</strong> Free</p>
          </div>

          <div className="card">
            <h3>🚑 Emergency Cases</h3>
            <p><strong>6</strong> Today</p>
          </div>

          <div className="card">
            <h3>💊 Medicine Stock</h3>
            <p><strong>154</strong> Items</p>
          </div>

          <div className="card">
            <h3>📈 Revenue</h3>
            <p><strong>₹12.4L</strong></p>
          </div>

          <div className="card">
            <h3>👶 Births</h3>
            <p><strong>11</strong> This Week</p>
          </div>

          <div className="card">
            <h3>⚰ Deaths</h3>
            <p><strong>2</strong> Reported</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminHome;