import { render, screen } from '@testing-library/react'
import Home from '../pages'
import { calculateTotal, calculateIva, calculateSubtotal } from '../lib/utils'

describe('Inicio', () => {
  it('La página de Login ha cargado sin errores', () => {
    render(<Home />);
    expect(
      screen.getByText('Tienda')
    ).toBeInTheDocument();
  });
});

describe("Calcular el total de la factura", () => {
  test('Función sin datos', () => {
    expect(calculateTotal()).toBeGreaterThanOrEqual(0)
  });
  test('Función con datos', () => {
    expect(calculateTotal([{ price: 10, cant: 1 }, { price: 20, cant: 10 }])).toBeGreaterThanOrEqual(0)
  });
});

describe("Calcular el iva de la factura", () => {
  test('Función sin datos', () => {
    expect(calculateIva()).toBeGreaterThanOrEqual(0)
  });
  test('Función con datos', () => {
    expect(calculateIva(10, 0.12)).toBeGreaterThanOrEqual(0)
  });
});

describe("Calcular el subtotal de la factura", () => {
  test('Función sin datos', () => {
    expect(calculateSubtotal()).toBeGreaterThanOrEqual(0)
  });
  test('Función con datos', () => {
    expect(calculateSubtotal(8.8, 1.12)).toBeGreaterThanOrEqual(0)
  });
});