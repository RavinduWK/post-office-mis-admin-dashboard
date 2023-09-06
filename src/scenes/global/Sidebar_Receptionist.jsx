import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";

import { tokens } from "../../theme";
import { Package, SignOut } from "phosphor-react";
import GridViewIcon from "@mui/icons-material/GridView";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

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

              <Typography
                variant="h6"
                color={colors.grey[200]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Postal Services
              </Typography>
              <Item
                title="Normal Post"
                to="/normal-post"
                icon={<MailOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Registered Post"
                to="/registered-post"
                icon={<MailOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logi Post"
                to="/logi-post"
                icon={<Package size={20} />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Fast Track Courier"
                to="/fast-track-courier"
                icon={<Inventory2OutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Money Order"
                to="/money-order"
                icon={<PaymentsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Pay Money Order"
                to="/pay-money-order"
                icon={<CreditScoreOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[200]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Other Services
              </Typography>
              <Item
                title="Bill Payments"
                to="/bill-payments"
                icon={<ReceiptOutlinedIcon />}
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
