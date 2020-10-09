export const calculateTotal = (data = []) => {
  if (data.length > 0) {
    return data.map(e => e.price * e.cant).reduce((acc, cur) => acc + cur, 0)
  }
  return 0
}

export const calculateIva = (total = 0, TAX_RATE = 0) => total * TAX_RATE

export const calculateSubtotal = (total = 0, iva = 0) => total - iva;