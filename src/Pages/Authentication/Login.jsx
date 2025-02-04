import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert, Container, Card, CardContent, Typography, InputAdornment, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import './Login.scss';

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const navigate = useNavigate();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Handle form submit
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://e-book-backend-sna2.onrender.com/login', values);
      const { message, token } = response.data;

      if (token) {
        // Save the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to Category Page
        navigate('/');
      }

      setSnackbarMessage(message || 'Login successful!');
      setSnackbarType('success');
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Login failed!');
      setSnackbarType('error');
    }
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="sm">
      <Card className="login-card">
        <CardContent>
          <Typography variant="h5" className="login-title">Login</Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="login-form">
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="submit" variant="contained" className="login-button">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="body2" color="textSecondary" className="register-link">
            New User?{' '}
            <Link href="/register" variant="body2" className="register-link-text">
              Register Here
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarType} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
