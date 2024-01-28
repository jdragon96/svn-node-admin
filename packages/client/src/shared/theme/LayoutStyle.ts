import { CSSProperties } from 'react';
import { PaletteOptions } from '@mui/material/styles';

declare module "@mui/material/styles" {
  interface Palette {
    name: string;
    appBar: {
      main: CSSProperties["color"];
      primary: CSSProperties["color"];
      text: CSSProperties["color"];
    };
    color: {
      menu: {
        base: CSSProperties["color"];
        buttonBase: CSSProperties["color"];
        hover: CSSProperties["color"];
        click: CSSProperties["color"];
      },
      topbar: {
        base: CSSProperties["color"];
      }
    }
    size: {
      menuWidth: number
    };
  }
  interface PaletteOptions {
    name: string;
    appBar: {
      main: CSSProperties["color"];
      primary: CSSProperties["color"];
      text: CSSProperties["color"];
    };
    color: {
      menu: {
        base: CSSProperties["color"];
        buttonBase: CSSProperties["color"];
        hover: CSSProperties["color"];
        click: CSSProperties["color"];
      },
      topbar: {
        base: CSSProperties["color"];
      }
    }
    size: {
      menuWidth: string
    };
  }
  //> 기존 속성에 추가하고자 하는 경우
  interface TypeBackground {
    menu: CSSProperties["color"];
  }
}

export const dark: PaletteOptions = {
  name: "dark",
  mode: "dark",
  tonalOffset: 0.15,
  appBar: {
    main: "#35363A",
    primary: "#9480ed",
    text: "#ffffff",
  },
  primary: { main: "#9480ed" },
  secondary: { main: "#b1b1b1" },
  error: { main: "#f54966" },
  warning: { main: "#eba800" },
  success: { main: "#92c353" },
  info: { main: "#29bee7" },
  text: {
    primary: "#e1e1e4",
    secondary: "#a7a6af",
  },
  divider: "#585861",
  background: {
    default: "#15151a",
    paper: "#27272b",
  },
  grey: {
    50: "#121217",
    100: "#16161b",
    200: "#212127",
    300: "#27272b",
    400: "#2d2d33",
    500: "#2f2f35",
    600: "#33333a",
    700: "#35353d",
    800: "#3b3b44",
    900: "#45474d",
    A100: "#313138",
    A200: "#60636c",
    A400: "#aeb0b7",
    A700: "#d2d5df",
  },
  color: {
    menu: {
      base: "#000000",
      buttonBase: "#35363A",
      hover: "#313131",
      click: "#4d4d4d"
    },
    topbar: {
      base: "#35363A"
    }
  },
  size: {
    menuWidth: "300px"
  }
};