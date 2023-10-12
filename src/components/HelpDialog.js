import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tab,
  Tabs,
  Box,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";

const HelpDialog = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Dialog
      fullWidth
      minWidth="200px"
      minHeight="200px"
      open={open}
      onClose={onClose}
      aria-labelledby="help-dialog-title"
      PaperProps={{
        style: {
          width: "600px",
          maxHeight: "600px",
        },
      }}
    >
      <DialogTitle id="help-dialog-title">Help Center</DialogTitle>
      <DialogContent style={{ minHeight: "500px" }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="Help Tabs"
        >
          <Tab label="FAQs" />
          <Tab label="User Guide" />
          <Tab label="Contact Us" />
        </Tabs>
        {selectedTab === 0 && (
          <Box mt={2}>
            {/* Frequently Asked Questions */}
            <Typography variant="h6">How to do X?</Typography>
            <Typography>Explanation about how to do X...</Typography>
            <Typography variant="h6">Where can I find Y?</Typography>
            <Typography>Answer about where to find Y...</Typography>
          </Box>
        )}
        {selectedTab === 1 && (
          <Box mt={2}>
            {/* User guide details */}
            <Typography>
              Visit our comprehensive user guide{" "}
              <Link href="#" color="secondary">
                here
              </Link>{" "}
              to understand the full features of our platform.
            </Typography>
          </Box>
        )}
        {selectedTab === 2 && (
          <Box mt={2}>
            {/* Contact Us Form */}
            <Typography variant="h6">Have a question? Ask us below!</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Your Question"
              variant="outlined"
              multiline
              rows={4}
            />
            <Box mt={2}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
