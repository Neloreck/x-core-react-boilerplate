import { useManager } from "dreamstate";
import { ReactElement, ReactNode, useCallback } from "react";
import { createUseStyles } from "react-jss";

import { down } from "#/macroses/style.macro";
import { RouterManager } from "@/core/data/store";
import { MainHeader } from "@/core/view/components/MainHeader";
import { IApplicationTheme } from "@/lib/theme";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  link: {
    "& a": {
      color: palette.text.primary
    },
    backgroundColor: palette.background.paper,
    display: "flex",
    justifyContent: "center",
    margin: spacing.unit * 2,
    padding: spacing.unit * 2,
    minWidth: spacing.unit * 15
  },
  content: {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.unit * 2,
    overflowY: "auto"
  },
  linksList: {
    [down("sm")]: {
      flexDirection: "column"
    },
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
}));

const renderReferenceCard = (className: string, label: string, href: string): ReactNode => (
  <div className={className}>
    <a
      href={href}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      { label }
    </a>
  </div>
);

export function HomePage({
  classes: { content, link, linksList } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterManager)
}): ReactElement {
  const onAboutNavigated = useCallback(() => hardPush("/about"), []);

  return (
    <>
      <MainHeader/>

      <main className={content}>

        <div className={linksList}>
          { renderReferenceCard(link, "React", "https://reactjs.org/") }
          { renderReferenceCard(link, "Typescript", "https://www.typescriptlang.org/") }
          { renderReferenceCard(link, "DreamState", "https://github.com/Neloreck/dreamstate/") }
        </div>

        <button onClick={onAboutNavigated}>
          About
        </button>
      </main>
    </>
  );
}
