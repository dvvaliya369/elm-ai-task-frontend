import React, { memo } from "react";
import { Box } from "@mui/material";
import elmLogo from "../../../assets/elm-logo.png";
import { navbarComponentStyles } from "./styles";

const Logo: React.FC = () => (
  <Box sx={navbarComponentStyles.logoContainer}>
    <img
      src={elmLogo}
      alt="Elm Logo"
      style={navbarComponentStyles.logoContainerImage}
    />
  </Box>
);

export default memo(Logo);
