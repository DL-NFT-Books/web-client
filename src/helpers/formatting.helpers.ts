import getSymbolFromCurrency from 'currency-symbol-map'
import { BN, BnLike } from '@/utils/math.util'

export function cropAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-5)}`
}

function _formatMoney(formattedAmount: string, currency = '') {
  const symbol = getSymbolFromCurrency(currency)
  return symbol
    ? `${symbol}${formattedAmount}`
    : `${formattedAmount} ${currency}`
}

export function formatFiatAsset(amount: BnLike, currency = '') {
  const formattedAmount = new BN(amount).format({
    decimals: 2,
  })

  return _formatMoney(formattedAmount, currency)
}

export function formatFiatAssetFromWei(amount: BnLike, currency = '') {
  const formattedAmount = new BN(amount).fromWei().format({
    decimals: 2,
  })

  return _formatMoney(formattedAmount, currency)
}

export function formatAmount(amount: BnLike, decimals: number) {
  const formattedAmount = new BN(amount).fromFraction(decimals)

  return formattedAmount.toString()
}

export function formatNumber(amount: BnLike) {
  const formattedAmount = new BN(amount).format({
    decimals: 2,
  })

  return formattedAmount
}
