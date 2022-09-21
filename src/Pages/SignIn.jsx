import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import { ReactComponent as GoogleLogo } from "../assets/google.svg";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EMPsys
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setemailError] = useState(false);
  const [emailHError, setemailHError] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const [passwordHError, setpasswordHError] = useState("");

  var isSuccess = false;
  async function handelLogin(e) {
    e.preventDefault();
    setemailError(false);
    setpasswordError(false);
    if (email == "") {
      setemailError(true);
      setemailHError("Required");
    }

    if (password == "") {
      setpasswordError(true);
      setpasswordHError("Required");
    }

    if (email && password) {
      const userData = {
        email,
        password,
      };

      localStorage.clear();
      if (!isSuccess) {
        await axios
          .post(`http://localhost:8000/user/login`, userData)
          .then((res) => {
            console.log(res);
            if (res.status == 200 && res.data.success == true) {
              // isSuccess = true;
              localStorage.setItem("username", res.data.sub.firstName);
              localStorage.setItem("email", res.data.sub.email);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("role", "admin");
              window.alert(res.data.message);
              history.push("/home");
            } else {
              console.log(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
      // if (!isSuccess) {
      //   await axios
      //     .post(`http://localhost:8000/editor/login`, userData)
      //     .then((res) => {
      //       if (res.data.code == 200 && res.data.success == true) {
      //         // isSuccess = true;
      //         localStorage.setItem("username", res.data.token.sub.firstName);
      //         localStorage.setItem("email", res.data.token.sub.email);
      //         localStorage.setItem("token", res.data.token.token);
      //         localStorage.setItem("isLoggedIn", true);
      //         localStorage.setItem("role", "editor");
      //         window.alert(res.data.message);
      //         history.push("/news");
      //       } else {
      //         console.log(res.data.message);
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // }
    }
  }

  useEffect(() => {
    setemailError(false);
    setpasswordError(false);
    setemailHError("");
    setpasswordHError("");
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ m: 6, pt: 6, pb: 6, pl: 0, pr: 0 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            width: "100%",
            mb: "1.5rem",
            pb: { sm: "3rem" },
          }}
        >
          Welcome To EMPsys!
        </Typography>
        <div className="logincontainer" style={{ display: "flex" }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handelLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  error={emailError}
                  helperText={emailHError}
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
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  error={passwordError}
                  helperText={passwordHError}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <hr />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography
              variant="h2"
              component="p"
              sx={{
                paddingLeft: { sm: "3rem" },
                mt: "1rem",
                textAlign: "center",
              }}
            >
              EMPsys
            </Typography>
            <Typography
              variant="h7"
              component="p"
              sx={{
                paddingLeft: { sm: "3rem" },
                mt: "1rem",
                textAlign: "center",
              }}
            >
              The EMPsys : Employee Management System
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ paddingLeft: { sm: "3rem" }, rowGap: "1rem" }}
            >
              {/* <OauthMuiLink href=''>
                      <GoogleLogo style={{ height: '2rem' }} />
                      Google
                    </OauthMuiLink> */}
              {/* <OauthMuiLink href=''>
                      <GitHubLogo style={{ height: '2rem' }} />
                      GitHub
                    </OauthMuiLink> */}
            </Box>
          </Container>
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Paper>
    </ThemeProvider>
  );
}

export const OauthMuiLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;
