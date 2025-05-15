import {describe, expect, it} from "vitest";
import convert from "../src/components/convert";
import type {ConversionRates} from "../src/api/currency";

describe("currency convert tests", () => {
  const rates: ConversionRates = { "USD": 1, "EUR": 0.9, "GBP": 0.76 }

  it('should return null if baseCurrency is not in rates', () => {
    const result = convert("UXD", "EUR", rates)

    expect(result).toBeNull()
  });

  it('should return null if targetCurrency is not in rates', () => {
    const result = convert("USD", "foo", rates)

    expect(result).toBeNull()
  })

  it('should return converted currency if all fields are defined', () => {
    const result = convert("USD", "EUR", rates)

    // equality doesn't quite work for doubles, floating point shenanigans
    expect(result).toBeCloseTo(0.9, 3)
  })

  it('should return converted currency if neither argument is the base currency', () => {
    const result = convert("EUR", "GBP", rates)

    expect(result).toBeCloseTo(0.844, 3)
  })

  it('should convert correctly when converting to base currency (USD)', () => {
    const result = convert("EUR", "USD", rates)

    expect(result).toBeCloseTo(1.111, 3) // 1/0.9
  })

  it('should return 1 when converting same currency', () => {
    const result = convert("USD", "USD", rates)

    expect(result).toBe(1)
  })

  it('should return null when rates object is empty', () => {
    const result = convert("USD", "EUR", {} as ConversionRates)

    expect(result).toBeNull()
  })
})