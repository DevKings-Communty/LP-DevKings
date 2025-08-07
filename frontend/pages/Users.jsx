import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';
import SideBar from '../components/sideBar/SideBar';
import logo from "../public/logo.png";
import { get } from '../services/adminApi';
import Message from '../components/Message/Message';
// ! Random Data to test
const Users = () => {
  const [usersData, setUsersData] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [msg, setMsg] = React.useState(null);
    
      const showMessage = (message, type = 'info') => {
        setMsg({ message, type });
      };
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await get('/users/getAllUsers');
      const users = response.allUsers.map(user=>{
        return {
          ...user,username:user.firstName+' '+user.lastName
        }
      })
      setUsersData(users)
    }
    fetchData();
  }, [])

  const handleAddUser = () => {
    setIsAddingUser(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsAddingUser(false);
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      role:selectedUser?.role,
      email: formData.get('email'),
      password:formData.get('password'),
      profilePic: formData.get('avatar')
    };
    console.log(userData)

    if (isAddingUser) {
      const response = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/admin/users/addAdmin`,{
        method:"POST",
        headers:{
          'Content-Type':'Application/json'
        },
        body:JSON.stringify(userData)
      })
      const data = await response.json();
      if(!response.ok){
        showMessage(data.message, 'error')
      }else{
        const newUser = {...data, username:data.firstName+''+data.lastName}
        setUsersData(prevUsersData=>[newUser,...prevUsersData]);
        showMessage('Admin added succefully', 'success')
      }
    } else {
      const response = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/admin/users/updateUser/${selectedUser._id}`,{
        method:"PUT",
        headers:{
          'Content-Type':'Application/json'
        },
        body:JSON.stringify(userData)
      })
      const data = await response.json();
      if(!response.ok){
        showMessage(data.message, 'error')
      }else{
        setUsersData(prevData=>prevData.map(u=>{
          return u._id===userData.id?{...data, username:data.firstName+' '+data.lastName}:u
        }))
        showMessage("User Updated Succefully", 'success')
      }
    }
    
    handleModalClose();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    const response = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/admin/users/deleteUser/${user._id}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({
        role:user.role
      })
    });
    const data = await response.json();
    if(!response.ok){
      showMessage(data.message, 'error')
    }else{
      setUsersData(prevUsersData=>prevUsersData.filter(u=>u._id !== user._id));
      showMessage('user deleted succeffuly', 'success')
    }
  };

  return (
    <div className="users-container">
      {msg && <Message message={msg.message} type={msg.type}/>}
      {/* Sidebar */}
      <SideBar logo={logo}/>
      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h2>Users Management</h2>
          <div className="header-actions">
            <button className="add-user-btn" onClick={handleAddUser}>+ Add New Admin</button>
          </div>
        </header>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>ID</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <img src={user.profilePic} alt={user.username} className="user-avatar" />
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>{user._id}</td>
                  <td><span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td>{user.email}</td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Edit User Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isAddingUser ? 'Add New Admin' : 'Update User'}</h3>
              <button className="close-modal" onClick={handleModalClose}>x</button>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
              {!isAddingUser && (
                <div className="form-group">
                  <label>ID</label>
                  <input
                    type="text"
                    name="id"
                    defaultValue={selectedUser?._id}
                    disabled
                  />
                </div>
              )}
              <div className="form-group">
                <label>firstName</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={selectedUser?.firstName}
                  required
                />
              </div>
              <div className="form-group">
                <label>lastName</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={selectedUser?.lastName}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser?.email}
                  required
                />
              </div>
              {
                isAddingUser && <div className="form-group">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  required
                />
              </div>
              }
              <div className="form-group">
                <label>Avatar URL</label>
                <input
                  type="text"
                  name="avatar"
                  defaultValue={selectedUser?.profilePic}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">{isAddingUser ? 'Add Admin' : 'Update User'}</button>
                <button type="button" className="cancel-btn" onClick={handleModalClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

