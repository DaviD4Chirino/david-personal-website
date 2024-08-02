import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
const theme = createTheme({
  palette: {
    primary: {
      main: "#474646",
    },
    secondary: {
      main: "#b6b6b6",
    },
    warning: {
      main: "#141414",
    },
  },
});
export default function MUIThemeProvider(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
