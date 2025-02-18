import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'; // <-- Import RouterLink here

import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Container,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  Link,
  CircularProgress, // Import CircularProgress for loading animation
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import './Login.scss';

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        ...values,
        email: values.email.toLowerCase(),
      });

      const { message, token, userId, email } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', email);

        console.log({ token, userId, email });

        navigate('/');
        window.location.reload(); // Reload page to update UI
      }

      setSnackbarMessage(message || 'Login successful!');
      setSnackbarType('success');
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Login failed!');
      setSnackbarType('error');
    } finally {
      setLoading(false);
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
                <Button type="submit"
                  variant="contained"
                  className="login-button"
                  disabled={loading}
                  sx={{
                    backgroundColor: "black",
                    color: "white", // Text color
                    padding: "10px 10px", // Padding
                    fontSize: "16px", // Font size
                    fontWeight: "500",
                    borderRadius: "4px", // Border radius
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black", // Text color
                      border: "1px solid black", // Border on hover

                    },
                  }}


                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" className="register-link">
            If New User ,{" "}
            <Link component={RouterLink} to="/register" className="register-link-text">
              Register here
            </Link>
          </Typography>


        </CardContent>
      </Card>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarType} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
