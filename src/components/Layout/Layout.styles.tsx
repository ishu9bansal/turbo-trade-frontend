import type { SxProps } from "@mui/material";

export const appBarStyles: SxProps = {
    position: "static",
    bgcolor: "linear-gradient(135deg, #4F46E5, #9333EA)",
    background: "linear-gradient(135deg, #4F46E5, #9333EA)",
};

export const toolbarStyles: SxProps = {
    display: "flex",
    justifyContent: "space-between",
};

export const titleStyles: SxProps = {
    flexGrow: 1,
};

export const tabsStyles: SxProps = {
    flexGrow: 1,
};

export const authBoxStyles: SxProps = {
    color: "black",
    display: "flex",
    alignItems: "center",
    gap: 2,
    marginLeft: 2,
};

export const userButtonStyle = {
    elements: {
        userAvatarStyles: {
            width: "32px",
            height: "32px",
            borderRadius: "100%",
            "&:hover": {
                outline: "2px solid rgba(255,255,255,0.4)",
            },
        }
    }
}

export const containerStyles: SxProps = {
    mt: 4,
};
