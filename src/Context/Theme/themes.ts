import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
     palette: {
          mode: "light",
          background: {
               default: "#FFFAFA",
          },
     },
     components: {
          MuiTextField: {
               defaultProps: {
                    // You can set default props here
               },
               styleOverrides: {
                    root: {
                         color: "red",
                    },
               },
          },
          MuiOutlinedInput: {
               styleOverrides: {
                    root: {
                         "& fieldset": {
                              borderColor: "green", // Default border color
                         },
                         "&:hover fieldset": {
                              borderColor: "blue", // Border color on hover
                         },
                         "&.Mui-focused fieldset": {
                              borderColor: "purple", // Border color when focused
                         },
                    },
               },
          },
          MuiInputLabel: {
               styleOverrides: {
                    root: {
                         // Default label color
                         color: "black",
                         // Label color when the input is focused
                         "&.Mui-focused": {
                              color: "red",
                         },
                    },
               },
          },
          MuiInput: {
               styleOverrides: {
                    root: {
                         "&:before": {
                              // Underline color
                              borderBottomColor: "cyan",
                         },
                         "&:hover:not(.Mui-disabled):before": {
                              // Underline color on hover
                              borderBottomColor: "darkcyan",
                         },
                         "&.Mui-focused:before": {
                              // Underline color when focused
                              borderBottomColor: "magenta",
                         },
                         fontSize: "20px",
                    },
               },
          },
          MuiButton: {
               styleOverrides: {
                    root: {
                         // The root style applies to the <button> element
                         fontSize: "1rem",
                    },
               },
          },
     },
});

export const darkTheme = createTheme({
     palette: {
          mode: "dark",
          background: {
               default: "#2F4F4F",
          },

          /*
          primary?: PaletteColorOptions;
          secondary?: PaletteColorOptions;
          error?: PaletteColorOptions;
          warning?: PaletteColorOptions;
          info?: PaletteColorOptions;
          success?: PaletteColorOptions;
          mode?: PaletteMode;
          tonalOffset?: PaletteTonalOffset;
          contrastThreshold?: number;
          common?: Partial<CommonColors>;
          grey?: ColorPartial;
          text?: Partial<TypeText>;
          divider?: string;
          action?: Partial<TypeAction>;
          background?: Partial<TypeBackground>;
          */
     },
     components: {
          MuiTextField: {
               defaultProps: {
                    // You can set default props here
               },
          },
          MuiOutlinedInput: {
               styleOverrides: {
                    root: {
                         "& fieldset": {
                              borderColor: "green", // Default border color
                         },
                         "&:hover fieldset": {
                              borderColor: "blue", // Border color on hover
                         },
                         "&.Mui-focused fieldset": {
                              borderColor: "purple", // Border color when focused
                         },
                    },
               },
          },
          MuiInputLabel: {
               styleOverrides: {
                    root: {
                         // Default label color
                         color: "yellow",
                         // Label color when the input is focused
                         "&.Mui-focused": {
                              color: "red",
                         },
                    },
               },
          },
          MuiInput: {
               styleOverrides: {
                    root: {
                         "&:before": {
                              // Underline color
                              borderBottomColor: "cyan",
                         },
                         "&:hover:not(.Mui-disabled):before": {
                              // Underline color on hover
                              borderBottomColor: "darkcyan",
                         },
                         "&.Mui-focused:before": {
                              // Underline color when focused
                              borderBottomColor: "magenta",
                         },
                         fontSize: "25px",
                    },
               },
          },
          MuiButton: {
               styleOverrides: {
                    root: {
                         // The root style applies to the <button> element
                         fontSize: "1rem",
                    },
               },
          },
     },
});
