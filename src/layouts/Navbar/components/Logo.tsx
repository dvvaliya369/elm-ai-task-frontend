import React, { memo } from "react";
import { Box } from "@mui/material";
import elmLogo from "../../../assets/elm-logo.png";
import { navbarComponentStyles } from "./styles";

const Logo: React.FC = () => (
  <Box sx={navbarComponentStyles.logoContainer}>
    <Box
      component="img"
      src={elmLogo}
      alt="Elm Logo"
      sx={navbarComponentStyles.logoContainerImage}
    />
  </Box>
);

export default memo(Logo);
