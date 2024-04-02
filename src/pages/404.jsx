// import { Box, Typography } from '';
import { Box ,Button,Typography,  useTheme,
} from '@mui/joy';
// import ErrorImage from '../public/404.svg'; // Import the 404 image from your public folder

export default function Custom404() {
    const theme = useTheme();

    const goBack = () => {
        window.history.back(); // This will take the user to the previous page
      };
  return (
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 'auto', // Make the height fit its content

  }}
>
  {/* Use the Image component to display the 404 image */}
  <img 
    src={"/404.svg"} 
    alt="404 - Page Not Found" 
    style={{
      maxWidth: '70%',
      maxHeight: '70%',
      display: 'block',
      margin: 'auto',
    }}
  />

<Button
              variant={"solid"}
              color={"primary"}
              sx={{
                py: 1,
                borderRadius: "var(--border-radius-lg)",
                color: "white",
                "&.MuiButton-contained": {
                  borderRadius: "var(--border-radius-lg)",
                },
                // Apply different styles based on screen size
                [theme.breakpoints.down('sm')]: {
                  // Styles for small screens
                  py: 0.8, // Reduce the vertical padding
                  fontSize: theme.fontSize.sm, // Reduce the font size
                },
                [theme.breakpoints.up('md')]: {
                  // Styles for medium and larger screens
                  py: 1.2, // Increase the vertical padding
                  fontSize: theme.fontSize.md, // Increase the font size
                },
              }}
              onClick={goBack} 

            >
              Go Back
            </Button>

   

   

</Box>

  
  );
}
