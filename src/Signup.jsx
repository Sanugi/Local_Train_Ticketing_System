
// import {useState}  from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// function Signup() {

//     const[name, setName] = useState()
//     const[email, setEmail] = useState()
//     const[password, setPassword] = useState()
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3000/register',{name, email,password})
//         .then (result => {console.log(result)
//           navigate('/login')
//         })
//         .catch (err => console.log(err))
//     }

// // return (
// //     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
// //     <div className="bg-white p-3 rounded w-25">
// //     <h2> Register </h2>

// //     <form onSubmit={handleSubmit}>
// //         <div className="mb-3">
// //          <label htmlFor="email">
// //          <strong>Name</strong>
// //          </label>
         
// //          <input
// //          type="text"
// //          placeholder="Enter name"
// //          autoComplete="off"
// //          name="email"
// //          className="form-control rounded-0"
// //          onChange={(e) => setName(e.target.value)}
// //          />
// //         </div>

// //         <div className="mb-3">
// //          <label htmlFor="email">
// //          <strong>email</strong>
// //          </label>
         
// //          <input
// //          type="text"
// //          placeholder="Enter email"
// //          autoComplete="off"
// //          name="email"
// //          className="form-control rounded-0"
// //          onChange={(e) => setEmail(e.target.value)}
// //          />
// //         </div>

// //         <div className="mb-3">
// //          <label htmlFor="email">
// //          <strong>password</strong>
// //          </label>
         
// //          <input
// //          type="text"
// //          placeholder="Enter password"
// //          autoComplete="off"
// //          name="password"
// //          className="form-control rounded-0"
// //          onChange={(e) => setPassword(e.target.value)}
// //          />
// //         </div>

// //         <button type="submit" className="btn btn-success w-100 rounded-0">
// //             Register
// //      </button>
// // </form>

// // <p> Already have an account </p>
// // <Link to= "/" className="btn default border w-100 bg-light rounded-0 text-decoration-none">
// // Login
// // </Link>
// //     </div>
// //     </div>
// // )

// return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
           
//             backgroundImage: `url(${image})`,
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//               Login 
//           </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 // onChange={(e) => setValues({...values, email : e.target.value})}
//                 onChange={(e) => setName(e.target.value)}
//               />
//                <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Name"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 // onChange={(e) => setValues({...values, email : e.target.value})}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 // onChange={(e) => setValues({...values, password : e.target.value})}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Log in'}
//               </Button>
             
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="/Forgetpassword" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from './assets/train.jpg'; 
import axiosInstance from './service/axiosInstance';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    axiosInstance.post('users/register', { username: name, email, password })
      .then((result) => {
        console.log(result);
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  };

  
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="/Forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signup;
