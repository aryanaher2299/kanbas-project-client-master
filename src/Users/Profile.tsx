import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  const formatDate = (date: any) => {
    if (date === "") {
      return "";
    }

    return date;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="SignInBox">
        <h1>Profile</h1>
        {profile && (
          <div className="d-flex flex-column gap-3 w-100">
            <input
              className="input-group mb-3"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              className="input-group mb-3"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              placeholder="Password"
              type="password"
            />
            <input
              className="input-group mb-3"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              placeholder="First Name"
            />
            <input
              className="input-group mb-3"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              placeholder="Last Name"
            />
            <input
              className="input-group mb-3"
              value={formatDate(profile.dob)}
              type="date"
              onChange={(e) =>
                setProfile({ ...profile, dob: e.target.value })
              }
              placeholder="Date of Birth"
            />
            <select
              className="input-group mb-3"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
        )}
        <br />
        <div className="d-flex flex-column gap-3 w-100">
          <button onClick={save} className="siginbutton">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger">
            Signout
          </button>
          <Link to="/Kanbas/Account/Admin/Users" className="btn btn-secondary">
            Users
          </Link>
        </div>
      </div>
    </div>
  );
}
