import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
// @@ts-expect-error
import logo from "../../assets/logo.png";

const AppBarComponent: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <Image src={logo} alt="Logo" width={30} height={30} />
        <Typography
          variant="h6"
          component="a"
          sx={{ marginLeft: "8px", color: "#4592b1" }}
        >
          Snowfall Entertainment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
