import { cssVar, defineStyleConfig } from '@chakra-ui/react'


const $arrowBg = cssVar("popper-arrow-bg");
// define the base component styles
const baseStyle = {
  borderRadius: 'base', // add a border radius
  backgroundColor: 'black',
  [$arrowBg.variable]: "colors.black",
}

// export the component theme
export const tooltipTheme = defineStyleConfig({ baseStyle })