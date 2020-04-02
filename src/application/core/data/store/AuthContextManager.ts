/**
 * @packageDocumentation
 * @module @application/main
 */

import { ContextManager, createLoadable, ILoadable } from "dreamstate";

// Lib.
import { TOptional } from "@Lib/ts";
import { log } from "@Macro/log.macro";

/**
 * Auth context description.
 */
export interface IAuthContext {
  authActions: {
  };
  authState: {
    user: ILoadable<TOptional<string>>;
  };
}

/**
 * Context manager related to auth and user management.
 * It is responsible for auth, security and account management.
 */
export class AuthContextManager extends ContextManager<IAuthContext> {

  public context: IAuthContext = {
    authActions: {
    },
    authState: {
      user: createLoadable(null)
    }
  };

  protected onProvisionStarted(): void {

    const { authState: { user } } = this.context;

    log.info("Auth provision started @", user.value);
  }

}