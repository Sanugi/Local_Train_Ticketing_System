import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import image from './assets/train.jpg'; 

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function Forgetpassword() {
  const [value, setValue] = useState({ email: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value.email) {
      Swal.fire({
        position: 'top',
        text: 'Please fill the required fields',
        customClass: { confirmButton: 'my-button' },
      });
      return;
    }

    axios.post('http://localhost:3000/forgetpassword', value)
      .then((result) => {
        if (result.data) {
          Swal.fire({
            position: 'top',
            text: result.data.msg,
            customClass: { confirmButton: 'my-button' },
          });

          if (result.status === 201) {
            navigate('/Varify', {
              state: {
                email: value.email,
                code: result.data.code,
              },
            });
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            position: 'top',
            text: err.response.data.msg,
            customClass: { confirmButton: 'my-button' },
          }).then(() => {
            navigate('/');
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
          <b>Forget Password</b>
        </Typography>
        <Typography variant="body1">
          Enter your registered email address:
        </Typography>

        <Input
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Send Email
        </Button>
      </Paper>
    </main>
  );
}

export default Forgetpassword;
