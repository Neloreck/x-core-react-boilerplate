import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

export const errorPageStyle = ({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    alignSelf: "normal",
    backgroundColor: palette.background.default,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexWrap: "nowrap",
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "350ms"
  },
  label: {
    color: palette.text.primary
  }
});