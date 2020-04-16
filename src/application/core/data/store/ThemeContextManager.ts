import { Bind, ContextManager } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";

// Lib.
import { createDefaultTheme, IApplicationTheme, toggleTheme, TThemeType } from "@Lib/theme";
import { encrypt, getFromLocalStorage, parse, setLocalStorageItem } from "@Lib/utils";
import { log } from "@Macro/log.macro";

/**
 * Theme context description.
 */
export interface IThemeContext {
  themeActions: {
    toggleTheme(): void;
  };
  theme: IApplicationTheme;
}

/**
 * Context manager related to theme management.
 * It is responsible for theming, styling and generation configuration.
 */
export class ThemeContextManager extends ContextManager<IThemeContext> {

  public static readonly JSS_ID_GENERATION_CONFIG: CreateGenerateIdOptions = {
    minify: !IS_DEV
  };

  public context: IThemeContext = {
    themeActions: {
      toggleTheme: this.toggleTheme.bind(this)
    },
    theme: createDefaultTheme(getFromLocalStorage("theme_type") || GTheme.DEFAULT_THEME_TYPE)
  };

  /**
   * Toggle application theme mode and save it into local storage.
   * Apply it to document body.
   */
  public toggleTheme(): void {
    const { theme } = this.context;

    const nextThemeType: TThemeType = (theme.palette.type === "light" ? "dark" : "light");
    const nextTheme: IApplicationTheme = toggleTheme(theme, nextThemeType);

    log.info(`Toggle theme mode to '${nextThemeType}'.`);

    try {
      setLocalStorageItem("theme_type", nextThemeType);
    } catch (error) {
      log.warn("Failed to cache application theme:", error);
    }

    document.body.style.backgroundColor = nextTheme.palette.background.default;
    document.body.style.color = nextTheme.palette.text.primary;

    this.setContext({ theme: nextTheme });
  }

  /**
   * Send generic message on manager provision start and subscribe to events.
   */
  protected onProvisionStarted(): void {
    const { theme } = this.context;

    log.info(`Theme provision started [${theme.palette.type}].`);

    window.addEventListener("storage", this.onLocalStorageDataChanged);
  }

  /**
   * Unsubscribe from events after provision end.
   */
  protected onProvisionEnded(): void {
    log.info("Theme provision ended.");
    window.removeEventListener("storage", this.onLocalStorageDataChanged);
  }

  /**
   * Observe theme configuration changes and set same theme across tabs.
   */
  @Bind()
  private onLocalStorageDataChanged(event: StorageEvent): void {
    const { theme } = this.context;
    const { key, newValue } = event;

    if (key === encrypt("theme_type")) {
      // Listen to changes from all tabs.
      if (newValue) {
        this.setContext({ theme: toggleTheme(theme, parse(newValue) === "dark" ? "dark" : "light") });
      } else {
        this.setContext({ theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE) });
      }
    }
  }

}
