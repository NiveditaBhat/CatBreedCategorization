import { styled } from "@mui/material/styles";
import Card, { CardProps } from "@mui/material/Card";

export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  width: "auto",
  height: "300px",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  "&:focus": {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    outlineStyle: "none",
  },
}));
