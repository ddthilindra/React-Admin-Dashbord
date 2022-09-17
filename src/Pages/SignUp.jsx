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
import styled from '@emotion/styled';
import Paper from "@mui/material/Paper";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <Paper elevation={3}  sx={{ m:6,pt:6,pb:6,pl:0,pr:0}}>
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
        Welcome To Loop True!
      </Typography>
      <div className="logincontainer" style={{display:"flex"}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
        <hr/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Typography
                    variant='h6'
                    component='p'
                    sx={{
                      paddingLeft: { sm: '3rem' },
                      mb: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    EMPsys
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}
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