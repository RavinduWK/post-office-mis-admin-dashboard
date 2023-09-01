import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false); // Initialize state for showing/hiding password

  const paperStyle = {
    padding: 20,
    height: 600,
    width: 400,
    position: "fixed", // Set to fixed position
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Center both horizontally and vertically
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#852318" };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle the showPassword state
  };

  return (
    <div className="app-container">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        {/* Use the Grid container to center the Paper */}
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
                  borderColor: "#696969", // Your desired color
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
            type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
            fullWidth
            required
            sx={{
              backgroundColor: "#E6E6E6",
              fontSize: "16px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#696969", // Your desired color
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: "#696969",
              },
            }}
            InputProps={{
              // Add InputProps to the TextField
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
                    {/* Toggle the icon */}
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
