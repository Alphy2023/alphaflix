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

const SignInForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest,setIsLoginRequest] = useState(false);
  const [errorMessage,setErrorMessage] = useState();
  const [showPassword,setShowPassword]=useState(false);
  const handleClickShowPassword = ()=>setShowPassword((show)=> !show);
  const handleMouseDownPassword = (event) => { event.preventDefault()}

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username should be a minimum of 8 characters!")
        .required("Username is required!"),
      password: Yup.string()
        .min(8, "Password should be a minimum of 8 characters!")
        .required("Password is required!"),
    }),
    onSubmit: async values =>{
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const {response, err} = await userApi.signIn(values);
      setIsLoginRequest(false);
      if(response){
        formik.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in successful.");
      }

      if(err) setErrorMessage(err?.message)
    }
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
      <Stack spacing={3}>
        <TextField
          type="text"
          // placeholder="username"
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
          type={showPassword ? "text" : "password"}
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
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="medium"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>
    </Box>
  ); 

};

export default SignInForm