import React, { useEffect, useState, useContext } from "react";
import { getTeacherProfile, updateTeacherProfile } from "./api";
import { AuthContext } from "../../context/AuthProvider";
import Message from "../../components/Message/Message";
import "./teacherProfile.css";

export default function TeacherProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profile: "",
    bio: "",
    profilePic: ""
  });
  const [msg, setMsg] = useState(null);

  const showMessage = (message, type = "info") => {
    setMsg({ message, type });
  };

  useEffect(() => {
    getTeacherProfile(user._id)
      .then(res => {
        const teacher = res.data?.teacher;
        if (!teacher) return showMessage("Invalid profile data", "danger");

        setProfile(teacher);
        setForm(prev => ({
          ...prev,
          firstName: teacher.firstName || "",
          lastName: teacher.lastName || "",
          profile: teacher.profile || "",
          bio: teacher.bio || "",
          profilePic: teacher.profilePic || ""
        }));
      })
      .catch(() => {
        showMessage("Failed to load profile", "danger");
      });
  }, [user._id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, profilePic: file }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      const res = await updateTeacherProfile(user._id, formData);
      setProfile(res.data);
      showMessage("Profile updated successfully", "success");
    } catch (err) {
      showMessage("Failed to update profile", "danger");
    }
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="teacher-profile-container">
      {msg && (
        <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />
      )}
      <div className="profile-card">
        <h2>Your Profile</h2>
        <img
          src={
            typeof profile.profilePic === "string" &&
            profile.profilePic.startsWith("http")
              ? profile.profilePic
              : `/uploads/${profile.profilePic}`
          }
          alt="Profile"
          className="profile-pic"
        />

        <form onSubmit={handleSubmit} className="profile-form">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <label>Profile</label>
          <input
            type="text"
            name="profile"
            value={form.profile}
            onChange={handleChange}
          />

          <label>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />

          <label>Change Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
