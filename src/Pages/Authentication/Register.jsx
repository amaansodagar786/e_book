import React, { useState } from "react";
import axios from "axios";
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
    Link, // Import Link from react-router-dom
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Person, Email, Lock } from "@mui/icons-material"; // Import Material-UI icons
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import "./Register.scss";

const Register = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("success");

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Too short").required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // Handle form submit
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post("http://localhost:4000/register", values);
            setSnackbarMessage(response.data.message || "Registration successful!");
            setSnackbarType("success");
            resetForm();
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || "Registration failed!");
            setSnackbarType("error");
        }
        setOpenSnackbar(true);
    };

    return (
        <Container maxWidth="sm">
            <Card className="register-card">
                <CardContent>
                    <Typography variant="h5" className="register-title">
                        Register
                    </Typography>
                    <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="register-form">
                                <Field
                                    as={TextField}
                                    label="Name"
                                    name="name"
                                    fullWidth
                                    margin="normal"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="register-button"
                                >
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography variant="body2" className="login-link">
                        Already have an account?{" "}
                        <Link component={RouterLink} to="/login">
                            Login here
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity={snackbarType}
                    onClose={() => setOpenSnackbar(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;
