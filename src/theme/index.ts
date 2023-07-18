import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiSvgIcon: {
            defaultProps: {
                fontSize: "inherit",
            },
        },
    },
    typography: {
        body2: {
            fontWeight: "bold",
            color: "#222529",
        },
        caption: {
            color: "#a6a6a6",
        },
    },
});
