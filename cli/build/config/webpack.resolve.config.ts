import * as path from "path";

import { Configuration } from "webpack";

import { default as packageConfig } from "../../../package.json";

import {
  BUILD_CONFIGURATION_PATH,
  PROJECT_ROOT_NODE_MODULES_PATH,
  PROJECT_ROOT_PATH
} from "./webpack.constants";

/**
 * Generate global alias for top-level dependencies.
 * Allows avoid defining react everywhere for JSX usage.
 */
function generateGlobalDependenciesAlias(): Record<string, string> {
  return Object
    .keys(packageConfig.dependencies)
    .reduce((acc: Record<string, string>, pkg: string) =>
      (acc[pkg] = path.resolve(PROJECT_ROOT_NODE_MODULES_PATH, pkg), acc), {});
}

export const RESOLVE_CONFIG: Configuration["resolve"] = {
  alias: {
    "#": path.resolve(BUILD_CONFIGURATION_PATH, "./"),
    "@": path.resolve(PROJECT_ROOT_PATH, "src/application/"),
    ...generateGlobalDependenciesAlias()
  },
  extensions: [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json"
  ],
  modules: [
    "node_modules"
  ]
};
