import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { tokens } from "../../styles/theme";
import { SignOut } from "phosphor-react";
import { receptionistMenuItems } from "../../data/menuItems";
import { postmasterMenuItems } from "../../data/menuItems";
import { supervisorMenuItems } from "../../data/menuItems";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClick = () => {
    setSelected(title);
    if (title === "Log Out") {
      navigate("/");
    } else {
      navigate(to);
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100], marginTop: "3px", marginBottom: "3px" }}
      onClick={handleClick}
      icon={icon}
    >
      {!isCollapsed && (
        <Typography style={{ fontSize: "1.1rem" }}>{title}</Typography>
      )}
    </MenuItem>
  );
};

const SideBar = ({ isCollapsed, setIsCollapsed, role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const roleMenuItems = {
    receptionist: receptionistMenuItems,
    postmaster: postmasterMenuItems,
    supervisor: supervisorMenuItems,
  };

  const menuItems = roleMenuItems[role] || [];

  const [selected, setSelected] = useState(menuItems[0]?.title || "");

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
                if (level === 0)
                  return {
                    color: active ? "#3F3430" : undefined,
                  };
              },
              label: ({ level, active }) => {
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
              {menuItems.map((section, index) => (
                <Box key={index}>
                  {section.title && (
                    <Typography
                      variant="h6"
                      color={colors.grey[200]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      {section.title}
                    </Typography>
                  )}
                  {section.items.map((item) => (
                    <Item
                      key={item.title}
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                  {index < menuItems.length - 1 && (
                    <Divider
                      sx={{
                        height: "2px",
                        backgroundColor: colors.brown,
                        marginTop: "8px",
                        marginBottom: "8px",
                        borderBottomWidth: 2,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Menu>
        </Box>
        <Box style={{ borderTop: "1px solid #ccc" }}>
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
                isCollapsed={isCollapsed}
              />
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
