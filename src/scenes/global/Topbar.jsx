import React, { useState } from "react";
import { useContext } from "react";
import FlexBetween from "../../components/FlexBetween";
import { ColorModeContext, tokens } from '../../theme';
import { 
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    useTheme, } from "@mui/material";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    NotificationsOutlined,
    ArrowDropDownOutlined,
  } from "@mui/icons-material";
  


const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.creamAccent[400]}>
            {/* LEFT SIDE */}
            <FlexBetween>

                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="9px"
                    gap="3rem"
                    p="0.1rem 1.5rem"
                >
                    <FlexBetween
                    gap="1rem"
                    >
                    <Box
                        sx={{ objectFit: "cover" }}
                    >
                        <img
                            alt="logo"
                            height="60px"
                            src={`../../assets/app-logo.png`}
                            style={{ cursor: "pointer" }}
                        />
                    </Box>
                    <Box
                        sx={{ objectFit: "cover" }}
                    >
                        <img
                            alt="logo"
                            height="40px"
                            src={`../../assets/app-logo-text.png`}
                            style={{ cursor: "pointer" }}
                        />
                    </Box>
                    </FlexBetween>
                    
                
                    <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                    <InputBase sx={{ml:2, flex:1}} placeholder="Search"/>
                    <IconButton type="button" sx={{p:1}}>
                        <Search/>
                    </IconButton>
                    </Box> 
                </FlexBetween>
            </FlexBetween>
            
            
            
            {/* SEARCH BAR */}
            <FlexBetween gap="1rem">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontSize: "25px", color: "#3F3430"}}/>
                    ): (
                        <LightModeOutlined sx={{ fontSize: "25px", color: "#3F3430"}}/>
                    )}
                    
                </IconButton>
                <IconButton>
                    <NotificationsOutlined sx={{ fontSize: "25px", color: "#3F3430"}}/>
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px", color: "#3F3430"}}/>
                </IconButton>
                <Button
                    onClick={handleClick}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        gap: "1rem",
                    }}
                    >
                    <Box
                        sx={{ objectFit: "cover" }}
                    >
                        <img
                            alt="profile-user"
                            height="38px"
                            width="38px"
                            src={`../../assets/user.png`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="left">
                        <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: "#3F3430" }}
                        >
                        Mr.Samantha Wickramasinge
                        </Typography>
                        <Typography
                        fontSize="0.75rem"
                        sx={{ color: "#3F3430" }}
                        >
                        Receptionist
                        </Typography>
                    </Box>
                    <ArrowDropDownOutlined
                        sx={{ color: "#3F3430", fontSize: "25px" }}
                    />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
                
            </FlexBetween>
        </Box>
    )
}

export default TopBar;