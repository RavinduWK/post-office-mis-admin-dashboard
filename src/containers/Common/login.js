import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import getUserRole from "../../data/getRole";
import LoadingScreen from "./LoadingScreen";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in successfully");
      const user = userCredential.user;
      const role = await getUserRole(user.uid);
      if (role === "Receptionist") {
        navigate("/receptionist/");
      } else if (role === "Postmaster") {
        navigate("/postmaster/");
      } else if (role === "Supervisor") {
        navigate("/supervisor/");
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Invalid username or password");
      // Handle error appropriately in your app
    } finally {
      setLoading(false);
    }
  };

  const paperStyle = {
    padding: 20,
    height: 600,
    width: 450,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const btnstyle = {
    margin: "15px 0",
    backgroundColor: "#852318",
    paddingY: "10px",
    fontSize: "18px",
    fontWeight: "normal",
  };

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
      {loading && <LoadingScreen />}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            sx={{ marginTop: "10px", marginleft: "2px" }}
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSignIn}
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
