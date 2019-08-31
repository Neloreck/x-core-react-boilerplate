import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

export const mainHeaderStyle = ({ palette, spacing }: IApplicationTheme) => ({
  root: {
    "& > h2": {
      "-webkit-text-stroke": "1px black",
      cursor: "default",
      fontSize: spacing.unit * 6,
      fontWeight: 600
    },
    alignSelf: "normal",
    alignItems: "center",
    background: palette.primary.dark,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10)`,
    boxSizing: "border-box",
    color: "#FFF",
    display: "flex",
    flexDirection: "row",
    fontSize: spacing.unit * 4,
    justifyContent: "space-between",
    minWidth: spacing.unit * 30,
    padding: `${spacing.unit}px ${spacing.unit * 3}px`,
    position: "relative",
    transitionDuration: "250ms"
  },
  switchButton: {
    "&:hover": {
      filter: "brightness(0.85)"
    },
    border: "1px solid #000",
    color: "#FFF",
    background: palette.primary.light,
    boxShadow: `6px 1px 4px 0px rgba(0, 0, 0, 0.25), 6px 7px 5px 0px rgba(0, 0, 0, 0.2)`,
    cursor: "pointer",
    fontSize: spacing.unit * 2,
    fontWeight: "bold",
    padding: spacing.unit * 1.5,
    transitionDuration: "250ms"
  }
});