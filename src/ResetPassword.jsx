import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import image from './assets/train.jpg';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axiosInstance from './service/axiosInstance';

function ResetPassword() {
  const [value, setValue] = useState({
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
    const { email } = location.state || {};

  const handleSubmit = (event) => {
    event.preventDefault();

    const { password, confirmPassword } = value;

    if (!password || !confirmPassword) {
      Swal.fire({
        position: 'top',
        text: 'Please fill all required fields',
        customClass: { confirmButton: 'my-button' },
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        position: 'top',
        text: 'Passwords do not match',
        customClass: { confirmButton: 'my-button' },
      });
      return;
    }


    axiosInstance
      .post('/users/reset-password', { email, password })
      .then((result) => {
        if (result.data) {
          Swal.fire({
            position: 'top',
            text: result.data.msg || 'Password reset successful!',
            customClass: { confirmButton: 'my-button' },
          });

          if (result.status === 200) {
            navigate('/');
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            position: 'top',
            text: err.response.data.msg || 'Error resetting password',
            customClass: { confirmButton: 'my-button' },
          });
        }
      });
  };

  return (
    <main
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Paper
        sx={{
          width: 400,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'rgba(190, 216, 230, 0.93)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 'lg',
          },
        }}
        variant="outlined"
      >
        <Typography variant="h5" component="h3">
          <b>Reset Password</b>
        </Typography>
        <Typography variant="body1">
          Enter your new password below:
        </Typography>

        <Input
          name="password"
          type="password"
          placeholder="New password"
          onChange={(e) => setValue({ ...value, password: e.target.value })}
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={(e) =>
            setValue({ ...value, confirmPassword: e.target.value })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Paper>
    </main>
  );
}

export default ResetPassword;
