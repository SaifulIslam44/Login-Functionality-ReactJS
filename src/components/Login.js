import React, { useState } from 'react';
import './Login.css'; 
import TaskForm from './TaskForm';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Track whether the user is registering
  const [profilePicture, setProfilePicture] = useState(''); // To store the image file
  const [bio, setBio] = useState('');
  const [tasks, setTasks] = useState([]); // State to store created tasks

  const handleLogin = () => {
    // Check if the user exists in local storage
    const storedUser = JSON.parse(localStorage.getItem(username));

   

    if (storedUser) {
      console.log('Stored User:', storedUser);
      console.log('Input Password:', password);

      if (storedUser.password === password) {
        console.log('Login Successful');
        // Set user profile information after successful login
        setUserProfile(storedUser);

        // Pass user data to the parent component to set authentication
        onLogin(storedUser);
      } else {
        // Handle invalid credentials
        alert('Invalid username or password');
      }
    } else {
      alert('User not found');
    }
  };

  const handleRegister = () => {
    // Convert the profile picture to a base64-encoded string
    const reader = new FileReader();
    reader.onload = () => {
      const user = {
        username,
        password,
        profilePicture: reader.result, // Store the base64-encoded image
        bio,
      };
      localStorage.setItem(username, JSON.stringify(user));

      onLogin(user);
      setIsRegistering(false);
    };

    // Read the selected file and convert it to base64
    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    } else {
      const user = {
        username,
        password,
        profilePicture: '', // Set an empty string if no profile picture is selected
        bio,
      };
      localStorage.setItem(username, JSON.stringify(user));

      // Notify the parent component that registration is successful
      onLogin(user);

      // Switch back to the login form after successful registration
      setIsRegistering(false);
    }
  };

  const toggleForm = () => {
    // Toggle between login and registration forms
    setIsRegistering(!isRegistering);
  };

  const handleLogout = () => {
    // Clear the user profile and log the user out
    setUserProfile(null);
    onLogin(null); // Pass null to indicate logout to the parent component
  };

  const handleProfilePictureChange = (e) => {
    // Update the profilePicture state when a file is selected
    setProfilePicture(e.target.files[0]);
  };

    // Define the handleCreateTask function
    const handleCreateTask = (task) => {
      // Add the newly created task to the tasks array
      setTasks([...tasks, task]);
    };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegistering && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </>
      )}

      {isRegistering ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      {isRegistering ? (
        <p>
          Already have an account?{' '}
          <span className="toggle-link" onClick={toggleForm}>
            Login
          </span>
        </p>
      ) : (
        <p>
          Don't have an account?{' '}
          <span className="toggle-link" onClick={toggleForm}>
            Register
          </span>
        </p>
      )}

      {/* Display user profile information if available */}
      {userProfile && (
        <div className="profile-info">
          <h3>Welcome, {userProfile.username}!</h3>
          {/* Display the profile picture as an image */}
          <img
            src={userProfile.profilePicture}
            alt="Profile Picture"
            style={{ maxWidth: '200px' }}
          />
          <p>Bio: {userProfile.bio}</p>

          {/* Logout button */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}


  {/* Display the task creation form */}
  {userProfile && (
    <>
      <TaskForm onCreateTask={handleCreateTask} />
      {/* Display the list of tasks */}
      <div className="task-list">
        <h3>Tasks:</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )}
  </div>
    );
  };



export default Login;
