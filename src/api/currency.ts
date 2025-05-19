type Result = "success" | "error"

export interface CurrencyApiResponse {
  readonly result: Result;
}

export type ErrorType = "unsupported-code" |
  "malformed-request" |
  "invalid-key" |
  "inactive-account" |
  "quota-reached" |
  "request-failed"

export interface CurrencyApiResponseError extends CurrencyApiResponse {
  readonly 'error-type': ErrorType;
}

export type ConversionRates = { [key: string]: number };

export interface CurrencyApiResponseSuccess extends CurrencyApiResponse {
  readonly time_last_update_unix: number, // both in seconds
  readonly time_next_update_unix: number,
  readonly base_code: string,
  readonly rates: ConversionRates
}

export class CurrencyErrorResponse {
  readonly errorMessage: string;

  constructor(data: CurrencyApiResponseError | string) {
    if (typeof data === "string") {
      this.errorMessage = data
    } else {
      this.errorMessage = data["error-type"]
    }
  }
}

export class CurrencySuccessResponse {
  readonly lastUpdatedTime: Date;
  readonly nextUpdateTime: Date;
  readonly latestRates: ConversionRates;

  constructor(data: CurrencyApiResponseSuccess) {
    // date constructor uses ms, not seconds, so we need to convert
    this.lastUpdatedTime = new Date(data.time_last_update_unix * 1000);
    this.nextUpdateTime = new Date(data.time_next_update_unix * 1000);
    this.latestRates = data.rates;
  }
}

export type CurrencyResponse = CurrencySuccessResponse | CurrencyErrorResponse;

const baseCurrency = "USD"

export async function fetchCurrencyData(): Promise<CurrencyResponse> {
  const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`, { method: "GET" })

  if (!response.ok) {
    console.error(response)
    return new CurrencyErrorResponse(`Failed to fetch due to ${response.statusText}`);
  }

  return response.json().then(data => {
    switch (data.result) {
      case "success":
        return new CurrencySuccessResponse(data)
      case "error":
        return new CurrencyErrorResponse(data)
      default:
        return new CurrencyErrorResponse(`Failed to parse response ${data}`)
    }
  })
}
