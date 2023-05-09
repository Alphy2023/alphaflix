import React,{ useState } from "react";
import {LoadingButton} from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import {setAuthModalOpen} from "../../redux/features/authModalSlice";
import {setUser} from "../../redux/features/userSlice";

const SignUpForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest,setIsLoginRequest] = useState(false);
  const [errorMessage,setErrorMessage] = useState();

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
      confirmPassword: "",
      displayName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username should be a minimum of 8 characters!")
        .required("Username is required!"),
      password: Yup.string()
        .min(8, "Password should be a minimum of 8 characters!")
        .required("Password is required!"),
      displayName: Yup.string()
        .min(8, "Your name should be a minimum of 8 characters!")
        .required("Please enter your name!"),
      confirmPassword: Yup.string()
        .min(8, "Confirm Password should be a minimum of 8 characters!")
        .oneOf([Yup.ref("password")], "Passwords do not match!")
        .required("Please confirm your password!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signUp(values);
      setIsLoginRequest(false);
      if (response) {
        formik.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Registration successful.");
      }

      if (err) setErrorMessage(err.message);
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      {errorMessage && (
        <Box sx={{ marginTop: 2, marginBottom: 3 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
      <Stack spacing={2}>
        <TextField
          type="text"
          name="displayName"
          fullWidth
          value={formik.values.displayName}
          onChange={formik.handleChange("displayName")}
          onBlur={formik.handleChange("displayName")}
          color="success"
          variant="outlined"
          label="Full name"
          error={
            formik.touched.displayName && formik.errors.displayName !== undefined
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
        />
        <TextField
          type="text"
          name="username"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange("username")}
          onBlur={formik.handleChange("username")}
          color="success"
          variant="outlined"
          label="Username"
          error={
            formik.touched.username && formik.errors.username !== undefined
          }
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          type="password"
          name="password"
          fullWidth
          variant="outlined"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleChange("password")}
          color="success"
          error={
            formik.touched.password && formik.errors.password !== undefined
          }
          helperText={formik.touched.password && formik.errors.password}
      
        />
        <TextField
          type="password"
          name="confirmPpassword"
          fullWidth
          variant="outlined"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmPassword")}
          onBlur={formik.handleChange("confirmPassword")}
          color="success"
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword !== undefined
          }
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
      
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="medium"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
        // loadingIndicator="Please wait....."
      >
        sign up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>
    </Box>
  ); 

};

export default SignUpForm