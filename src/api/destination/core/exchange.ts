// Lib.
import { ERequestMethod } from "@Lib/api/types";

// Api.
import { coreApiConfig } from "@Api/destination/core/coreApiConfig";

type TRequestBody = object | URLSearchParams;

/**
 * Generic request method with project scoped transformations.
 * todo: Review.
 */
async function doRequest(
  method: ERequestMethod,
  mapping: string,
  body?: object | URLSearchParams,
  headers?: Headers
): Promise<object> {
  const requestBody: undefined | string | URLSearchParams = body instanceof URLSearchParams
    ? body
    : body && JSON.stringify(body);

  const rawRequest: RequestInit = {
    body: requestBody,
    headers: headers || coreApiConfig.DEFAULT_HEADERS,
    method
  };

  let rawResponse: Response | null = null;

  try {
    rawResponse = await fetch(mapping, rawRequest);

    if (rawResponse.status >= 500) {
      throw new Error("Could not reach server.");
    }

    return await rawResponse.json();
  } catch (error) {
    return {
      error: error.message,
      status: (!!rawResponse && (rawResponse as Response).status) || 400,
      success: false
    };
  }
}

export const getRequest = async (mapping: string, urlParams?: {}, headers?: Headers): Promise<object> =>
  await doRequest(ERequestMethod.GET, mapping, urlParams, headers);

export const postRequest = async (mapping: string, body: TRequestBody, headers?: Headers): Promise<object> =>
  await doRequest(ERequestMethod.POST, mapping, body, headers);

export const deleteRequest = async (mapping: string, body: TRequestBody, headers?: Headers): Promise<object> =>
  await doRequest(ERequestMethod.DELETE, mapping, body, headers);

export const putRequest = async (mapping: string, body: TRequestBody, headers?: Headers): Promise<object> =>
  await doRequest(ERequestMethod.PUT, mapping, body, headers);
