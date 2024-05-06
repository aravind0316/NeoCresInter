import React from "react";
import { styled } from "@mui/system";
import { Typography, Link, Box } from "@mui/material";
import MaskImage from "../../Assets/Images/Mask.png";
import InputComponent from "../../components/InputFields";
import ButtonComponent from "../../components/Buttons";
import appTheme from "../../styles/theme";
import { Formik, Form, Field } from "formik"; // Corrected import
import logoImage from "../../Assets/Images/logo.png";
import { authenticateUser } from "../../service/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ContainerRoot = styled("div")({
  display: "flex",
  height: "100vh",
});

const PaneLeft = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(2),
}));

const ImageHolder = styled("div")({
  position: "relative",
  maxWidth: "90%",
  maxHeight: "80%",
  "& img": {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  [appTheme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const LogoImage = styled("img")({
  position: "absolute",
  top: "20px",
  left: "20px",
  width: "100px",
});

const PaneRight = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  padding: theme.spacing(2),
  [appTheme.breakpoints.down("sm")]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const FormLogin = styled(Form)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  display: "flex",
  flexDirection: "column",
}));

const LoginComponent = ({ onLoginFunc }) => {
  const navigate = useNavigate();
  const initialVals = {
    email: "",
    password: "",
  };

  const handleSubmitFunc = async (values, { resetForm }) => {
    try {
      const responseFromAuth = await authenticateUser(values);
      const tokenVal = responseFromAuth.data.token;
      localStorage.setItem("token", tokenVal);
      resetForm();
      onLoginFunc();
      toast.success(responseFromAuth.data.message);
      navigate("/profile");
    } catch (error) {
      console.log("🚀 ~ handleSubmitFunc ~ error:", error);
      toast.error("An error occured");
    }
  };

  return (
    <ContainerRoot>
      <PaneLeft>
        <ImageHolder>
          <img src={MaskImage} alt="Login" />
          <LogoImage src={logoImage} alt="Logo" />
        </ImageHolder>
      </PaneLeft>
      <PaneRight>
        <Typography
          variant="h6"
          style={{
            fontSize: "1rem",
            color: "#757575",
            textAlign: "left",
            marginBottom: "8px",
          }}
        >
          Welcome
        </Typography>
        <Typography
          variant="h4"
          style={{ textAlign: "left", marginBottom: "8px" }}
        >
          Login
        </Typography>
        <Formik initialValues={initialVals} onSubmit={handleSubmitFunc}>
          {({ errors, touched }) => (
            <FormLogin noValidate autoComplete="off">
              <Field
                as={InputComponent}
                name="email"
                label="Email"
                type="email"
                placeholder={"John.snow@gmail.com"}
                required
                color={appTheme.palette.text.secondary}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                style={{ marginBottom: "8px" }}
              />
              <Field
                as={InputComponent}
                name="password"
                label="Password"
                type="password"
                placeholder={"*********"}
                required
                color={appTheme.palette.text.secondary}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                style={{ marginBottom: "8px" }}
              />
              <Typography
                variant="body2"
                gutterBottom
                sx={{ alignSelf: "flex-end" }}
              >
                <Link href="#" color={appTheme.palette.primary.button}>
                  Forgot password?
                </Link>
              </Typography>
              <ButtonComponent
                variant="contained"
                color="primary"
                width="75%"
                type="submit"
                style={{
                  marginTop: "8px",
                  backgroundColor: appTheme.palette.primary.button,
                }}
              >
                Login
              </ButtonComponent>
            </FormLogin>
          )}
        </Formik>
        <Typography variant="body2" color={appTheme.palette.text.secondary}>
          Don't have an account?{" "}
          <Link href="/register" color="primary">
            Sign up
          </Link>
        </Typography>
      </PaneRight>
    </ContainerRoot>
  );
};

export default LoginComponent;
