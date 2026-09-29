export function calculateEstimatedValue(quantityKg: number, pricePerKg: number) {
  if (!Number.isFinite(quantityKg) || quantityKg <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }
  if (!Number.isFinite(pricePerKg) || pricePerKg < 0) {
    throw new Error("Invalid category price.");
  }
  return Math.round(quantityKg * pricePerKg * 100) / 100;
}
