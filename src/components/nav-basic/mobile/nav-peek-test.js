import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import NavCustomMobilePeek from "./nav-custom-mobile-peek";

// Test data for navigation
const TEST_NAV_ITEMS = [
  {
    title: "Home",
    path: "/",
    icon: null,
  },
  {
    title: "Services",
    path: "/services",
    icon: null,
    children: [
      {
        title: "Wedding",
        path: "/services/wedding",
      },
      {
        title: "Photography",
        path: "/services/photo",
      },
    ],
  },
  {
    title: "About",
    path: "/about",
    icon: null,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: null,
  },
];

export default function NavPeekTest() {
  const [testMode, setTestMode] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mobile Navigation Peek Test
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          This test component demonstrates the mobile navigation with peek functionality:
        </Typography>
        <ul>
          <li>Drawer partially visible (peeking) when closed</li>
          <li>Smooth slide animation</li>
          <li>Touch/swipe gestures support</li>
          <li>Backdrop blur effect</li>
          <li>Accessibility features</li>
        </ul>
      </Paper>

      <Button 
        variant="contained" 
        onClick={() => setTestMode(!testMode)}
        sx={{ mb: 2 }}
      >
        {testMode ? "Hide" : "Show"} Navigation Test
      </Button>

      {testMode && (
        <Box sx={{ 
          position: "relative", 
          height: 400, 
          border: "1px solid #ccc",
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "#f5f5f5"
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              position: "absolute", 
              top: 16, 
              right: 16, 
              zIndex: 1 
            }}
          >
            Look for the peeking edge on the left side
          </Typography>
          
          <NavCustomMobilePeek data={TEST_NAV_ITEMS} />
          
          <Box sx={{ 
            p: 3, 
            pl: 6, // Account for peek width
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Typography variant="h6" color="text.secondary">
              Main Content Area
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}