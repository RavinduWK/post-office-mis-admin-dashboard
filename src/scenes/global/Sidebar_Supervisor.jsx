import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";

import { tokens } from "../../theme";
import { Truck, SignOut } from "phosphor-react";
import GridViewIcon from "@mui/icons-material/GridView";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClick = () => {
    setSelected(title);
    if (title === "Log Out") {
      navigate("/"); // Navigate to absolute path for Log Out
    } else {
      navigate(`/receptionist${to}`); // Navigate to relative path for other items
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        marginTop: "3px",
        marginBottom: "3px",
      }}
      onClick={handleClick} // set onClick to handleClick
      icon={icon}
    >
      {!isCollapsed && (
        <Typography style={{ fontSize: "1.1rem" }}>{title}</Typography>
      )}
    </MenuItem>
  );
};

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.white}
        style={{
          height: "100%",
          overflowY: "auto",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Menu
            iconShape="square"
            menuItemStyles={{
              icon: ({ level, active }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: active ? "#3F3430" : undefined,
                  };
              },
              label: ({ level, active }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: active ? "#3F3430" : undefined,
                  };
              },
              button: ({ level, active, disabled }) => {
                if (level === 0) {
                  return {
                    color: disabled ? "#eee" : "#455A64",
                    backgroundColor: active ? colors.yellow[500] : undefined,
                    borderRadius: "8px 8px 8px 8px !important",
                    fontWeight: "bold !important",
                    "&:hover": {
                      backgroundColor: colors.grey[400],
                      marginTop: "3px",
                      marginBottom: "3px",
                      color: "white !important",
                      borderRadius: "8px 8px 8px 8px !important",
                      fontWeight: "bold !important",
                    },
                  };
                }
              },
            }}
          >
            <Box paddingLeft={isCollapsed ? undefined : "5%"} paddingRight="5%">
              <Divider
                sx={{
                  marginTop: "4px",
                  marginBottom: "8px",
                  height: "2px",
                  backgroundColor: colors.brown,
                  borderBottomWidth: 2,
                }}
              />
              <Item
                title="Dashboard"
                to="/"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Divider
                sx={{
                  height: "2px",
                  backgroundColor: colors.brown,
                  marginTop: "8px",
                  marginBottom: "8px",
                  borderBottomWidth: 2,
                }}
              />

              <Item
                title="Register Employee"
                to="/register-employee"
                icon={<HowToRegIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Mail Assignment"
                to="/mail-assignment"
                icon={<AssignmentTurnedInOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Mail Transfer"
                to="/mail-transfer"
                icon={<Truck size={25} />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Box>

        <Box
          style={{
            borderTop: "1px solid #ccc",
          }}
        >
          <Menu>
            <Box
              paddingLeft={isCollapsed ? undefined : "0.5%"}
              paddingRight="5%"
              style={{
                position: "fixed",
                bottom: 0,
                left: "0px",
                zIndex: 1000,
              }}
            >
              <Item
                title="Log Out"
                to="/login"
                icon={<SignOut size={20} />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed} // Pass the isCollapsed state
              />
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
