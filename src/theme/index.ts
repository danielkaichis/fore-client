import { extendTheme } from "@chakra-ui/react";
import { tooltipTheme } from "./components/Tooltip";

const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.50",
          color: "gray.800",
        },
      },
    },
    components: {
      Tooltip: tooltipTheme,
    },
});
  
export default theme;