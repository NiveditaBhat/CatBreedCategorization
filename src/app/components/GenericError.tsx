import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type ErrorProps = {
  onResetClicked: () => void;
};

export default function GenericError({ onResetClicked }: ErrorProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <Box>
        <Image src="/error.svg" alt="error image" height={100} width={100} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h5">
          Oops... An unexpected error occurred
        </Typography>
        <Typography fontSize="16px" color="#4B4B4B">
          Please try again or refresh the page
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={onResetClicked}
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
}
