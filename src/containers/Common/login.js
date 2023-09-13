import React, { useState, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const paperStyle = {
    padding: 20,
    height: 600,
    width: 400,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#852318" };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="app-container">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Box sx={{ objectFit: "cover" }}>
              <img
                alt="logo"
                height="100px"
                src={`../../assets/app-logo.png`}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box sx={{ objectFit: "cover" }}>
              <img
                alt="logo"
                height="40px"
                src={`../../assets/app-logo-text.png`}
                style={{ cursor: "pointer" }}
              />
            </Box>

            <h2>Sign In</h2>
          </Grid>

          <TextField
            label="Email"
            placeholder="Enter email address"
            fullWidth
            required
            sx={{
              backgroundColor: "#E6E6E6",
              fontSize: "16px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#696969",
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: "#696969",
              },
            }}
          />

          <Box m={2} />

          <TextField
            id="outlined-required"
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            sx={{
              backgroundColor: "#E6E6E6",
              fontSize: "16px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#696969",
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: "#696969",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>

          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;