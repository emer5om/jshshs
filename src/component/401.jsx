// import { Box, Typography } from '';
import { Box, Button, Typography, useTheme } from "@mui/joy";

export const UnAuth = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Use the Image component to display the 401 image */}
      <img
        src={"/401.svg"}
        alt="401 - Page Not Found"
        style={{
          maxWidth: "45%",
          maxHeight: "45%",
          display: "block",
          margin: "auto",
        }}
      />
    </Box>
  );
};
