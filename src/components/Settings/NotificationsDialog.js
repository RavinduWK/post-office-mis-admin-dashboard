import React from "react";
import {
  Dialog,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  useTheme,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NotificationsDialog = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
        }}
      >
        <Typography sx={{ color: theme.palette.text.typography }} variant="h4">
          Notifications
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {[
          "Dummy Notification 1",
          "Dummy Notification 2",
          "Dummy Notification 3",
        ].map((notification, index) => (
          <ListItem
            key={index}
            button
            style={{ paddingLeft: "24px", paddingRight: "24px" }}
          >
            <Avatar
              variant="rounded"
              style={{ marginRight: "8px", backgroundColor: "#F2C848" }}
            >
              N
            </Avatar>
            <ListItemText primary={notification} secondary="2 minutes ago" />
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default NotificationsDialog;
