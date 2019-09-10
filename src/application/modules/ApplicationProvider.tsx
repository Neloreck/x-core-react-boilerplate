import { useManager } from "dreamstate";
import { ReactElement, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";
import { Router as ReactRouter } from "react-router";

// Data.
import { routerContextManager, ThemeContextManager, themeContextManager } from "@Main/data/store";

// View.
import { DefaultLoader } from "@Main/view/utils";

export function ApplicationProvider(props: any): ReactElement {

  const { themeState: { theme } } = useManager(themeContextManager);

  return (
    <ReactRouter history={routerContextManager.history}>

      <JssProvider id={ThemeContextManager.JSS_ID_GENERATION_CONFIG}>

        <ThemeProvider theme={theme}>

          <Suspense fallback={<DefaultLoader/>}>

            { props.children }

          </Suspense>

        </ThemeProvider>

      </JssProvider>

    </ReactRouter>
  );
}
