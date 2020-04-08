import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { DefaultErrorFallback } from "@Core/view/layouts";
import { ErrorPage } from "@Modules/error/view/pages/ErrorPage";

export function ErrorRouter(): ReactElement {
  return (
    <Switch>

      <Route path={"/error"} component={ErrorPage} exact={true}/>

      <Route render={() => <DefaultErrorFallback reload={false}/>}/>

    </Switch>
  );
}

export const HotErrorRouter: typeof ErrorRouter = hot(ErrorRouter);
