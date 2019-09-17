/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit-element";

// Lib.
import { ICustomElementAttributes } from "@Lib/components";
import { CustomElement, Property } from "@Lib/decorators";
import { BLACK } from "@Lib/theme";

// Props.
export type TCustomHeadingSize = 1 | 2 | 3 | 4 | 5;

export interface ICustomHeadingProps extends ICustomElementAttributes {
  text: string;
  size?: TCustomHeadingSize;
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("custom-heading")
export class CustomHeading extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        color: ${ unsafeCSS(BLACK) };
        font-weight: bold;
      }

      :host, :host([size="1"]) {
        font-size: 4rem;
      }

      :host([size="2"]) {
        font-size: 3.5rem;
      }

      :host([size="3"]) {
        font-size: 3rem;
      }

      :host([size="4"]) {
        font-size: 2.5rem;
      }

      :host([size="5"]) {
        font-size: 2rem;
      }
    `;
  }

  @Property()
  private text: string = "";

  @Property()
  private size: TCustomHeadingSize = 1;

  public render(): TemplateResult {
    return html`${this.text}`;
  }

}