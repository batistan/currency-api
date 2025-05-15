import type {ConversionRates} from "../api/currency.ts";

/**
 *
 * @param baseCurrency {string} "From" currency, as ISO 4217 code
 * @param targetCurrency {string} Currency to which `targetCurrency` is being converted, as ISO 4217 code
 * @param currencies {ConversionRates} Map of currency codes to their values relative to a known base currency (usually USD, not necessarily `baseCurrency`)
 *
 * @returns {number | null} Target currency as proportion of base currency, or null if either `baseCurrency` or `targetCurrency` are not
 * supported or are not valid ISO 4217 currency codes.
 *
 * @example
 * // returns 1.2
 * const eurosPerDollar = convert("USD", "EUR", { "USD": 1, "EUR": 1.2 })
 *
 * @see https://en.wikipedia.org/wiki/ISO_4217
 */
export default function convert(baseCurrency: string, targetCurrency: string, currencies: ConversionRates): number | null {
  if (!currencies[targetCurrency] || !currencies[baseCurrency]) {
    return null
  } else {
    return currencies[targetCurrency] / currencies[baseCurrency]
  }
}
