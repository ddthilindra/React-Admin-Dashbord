import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Button } from "@mui/material";

const token = localStorage.getItem("token");

export default function AdminAddUpdate(props) {
  const { openUpdatePopup, setUpdateOpenPopup, adminrecordForEdit } = props;
  const [values, setValues] = useState("");

  const [fname, setfname] = useState("");
  const [email_address, setemail_address] = useState("");
  const [mobile_number, setmobile_number] = useState(Number);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [city, setcity] = useState("");
  const [role, setrole] = useState("");
  const [lname, setlname] = useState("");

  useEffect(() => {
    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
    setfname(values.admin_name);
    if (adminrecordForEdit != null) {
      setValues({
        ...adminrecordForEdit,
      });
      setfname(values.admin_name);
    }
  }, [adminrecordForEdit]);

  const handleClose = () => {
    setUpdateOpenPopup(false);
    setfname("");
    setemail_address("");
    setmobile_number("");
    setpassword("");
    setcpassword("");
    setrole("");
    setcity("");
    setlname("");

    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
    setErrorRole(false);
    setErrorCity(false);
    seterrorLname(false);

    setfNameError("");
    setemailAddressError("");
    setPhoneError("");
    setPassError("");
    setCPassError("");
    setcityError("");
    setroleError("");
    setlnameError("");
  };

  const [errorFname, setErrorFname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorCPass, setErrorCPass] = useState(false);

  const [errorRole, setErrorRole] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorLname, seterrorLname] = useState(false);

  const [roleError, setroleError] = useState(false);
  const [cityError, setcityError] = useState(false);
  const [lnameError, setlnameError] = useState(false);

  const [fNameError, setfNameError] = useState("");
  const [emailAddressError, setemailAddressError] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const [PassError, setPassError] = useState(false);
  const [CPassError, setCPassError] = useState(false);

  function validate() {
    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
    setErrorRole(false);
    setErrorCity(false);
    seterrorLname(false);

    setfNameError("");
    setemailAddressError("");
    setPhoneError("");
    setPassError("");
    setCPassError("");
    setcityError("");
    setroleError("");
    setlnameError("");

    if (fname == "") {
      setErrorFname(true);
      setfNameError("This field is required");
    }
    if (!lname.trim()) {
      seterrorLname(true);
      setlnameError("This field is required");
    }
    if (!city.trim()) {
      setErrorCity(true);
      setcityError("This field is required");
    }
    if (!email_address.trim()) {
      setErrorEmail(true);
      setemailAddressError("This field is required");
    }
    if (!role.trim()) {
      setErrorRole(true);
      setroleError("This field is required");
    }
    if (mobile_number < 10) {
      setErrorPhone(true);
      setPhoneError("This field is required");
    }
    //password validation
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    if (!password) {
      setErrorPass(true);
      setPassError("This field is required");
    } else if (password.length < 6) {
      setErrorPass(true);
      setPassError("Password must be longer than 6 characters");
    } else if (password.length >= 20) {
      setErrorPass(true);
      setPassError("Password must shorter than 20 characters");
    }

    if (!cpassword.trim()) {
      setErrorCPass(true);
      setCPassError("This field is required");
    } else if (cpassword != password) {
      setErrorCPass(true);
      setCPassError("Password does not match confirmation password");
    }
  }

  async function addAdmin(e) {
    e.preventDefault();
    const validation = await validate();
    if (fname && email_address && mobile_number && password && cpassword) {
      //   const config = {
      //     headers: { Authorization: Admintoken },
      //   };
      const empData = {
        firstName: fname,
        lastName: lname,
        email: email_address,
        contactNo: mobile_number,
        city,
        user_type: role,
        password,
      };
      console.log(empData);
      axios
        .post(`http://localhost:8000/user/register`, empData)
        .then((response) => {
          // console.log(response.data);

          if (response.status == 200) {
            window.alert(`${response.data.message}`);
            setUpdateOpenPopup(false);
            window.location.reload(false);
            // console.log(`${response.status}`);
            // console.log(response.data.message);
            setfname("");
            setemail_address("");
            setmobile_number("");
            setpassword("");
            setcpassword("");
          } else {
            window.alert(response.data.message);
            // console.log(`${response.status}`);
            // console.log(response.data.message);
          }
        })
        .catch((err) => {
          // console.log("Sever error");
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500
          ) {
            window.alert(`${err.response.data.message}`);
          }
        });
    } else {
    }
  }
  return (
    //<form onSubmit={addAdmin} method="post">
    <Dialog open={openUpdatePopup} onClose={handleClose} maxWidth="lg">
      <DialogTitle>Add New Employee</DialogTitle>
      <div
        className="dlgcontainer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <DialogContent dividers>
          <TextField
            error={errorFname}
            helperText={fNameError}
            value={fname}
            required
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setfname(e.target.value)}
          />

          <TextField
            error={errorRole}
            helperText={roleError}
            value={role}
            required
            margin="dense"
            id="name"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setrole(e.target.value)}
          />

          <TextField
            defaultValue={values.id}
            error={errorPhone}
            helperText={PhoneError}
            value={mobile_number}
            required
            margin="dense"
            id="name"
            label="Phone Number"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setmobile_number(e.target.value)}
          />

          <TextField
            error={errorPass}
            helperText={PassError}
            value={password}
            required
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setpassword(e.target.value)}
          />
        </DialogContent>
        <DialogContent dividers>
          <TextField
            error={errorLname}
            helperText={lnameError}
            value={lname}
            required
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setlname(e.target.value)}
          />

          <TextField
            error={errorEmail}
            helperText={emailAddressError}
            value={email_address}
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setemail_address(e.target.value)}
          />

          <TextField
            error={errorCity}
            helperText={cityError}
            value={city}
            required
            margin="dense"
            id="name"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setcity(e.target.value)}
          />

          <TextField
            error={errorCPass}
            helperText={CPassError}
            value={cpassword}
            required
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setcpassword(e.target.value)}
          />
        </DialogContent>
      </div>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={addAdmin} variant="contained" color="success">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    //</form>
  );
}
