export const formattedCurrency = (currency: string, value: number) => {
  try {
    return `${currency.toUpperCase()} ${Intl.NumberFormat().format(value)}`
  } catch {
    return `${currency.toUpperCase()} ${value}`
  }
}
