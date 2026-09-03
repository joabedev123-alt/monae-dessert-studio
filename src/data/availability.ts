import { ProductCategory } from "./catalog";

export type AvailabilityStatus = "available" | "limited" | "sold_out";

export interface DayAvailability {
  dateString: string; // YYYY-MM-DD
  categories: Record<ProductCategory, AvailabilityStatus>;
}

// Mock database function
// In a real app, this would fetch from Firebase or an API.
// For now, we simulate availability based on the date.
export function checkAvailability(date: Date): Record<ProductCategory, AvailabilityStatus> {
  const dateStr = date.toISOString().split("T")[0];
  
  // Default status
  const status: Record<ProductCategory, AvailabilityStatus> = {
    custom_cakes: "available",
    mini_cakes: "available",
    brigadeiros: "available",
    mini_desserts: "available",
    brazilian_sweets: "available",
    desserts: "available",
    party_packages: "available",
  };
  
  // Simulate some random sold outs or limits based on day of week / month for demonstration
  const day = date.getDay();
  
  if (day === 0 || day === 6) { // Weekends
    status.custom_cakes = "limited";
    status.party_packages = "sold_out";
  }
  
  if (day === 1) { // Mondays usually closed or sold out
    Object.keys(status).forEach(k => {
      status[k as ProductCategory] = "sold_out";
    });
  }

  // Hardcode a specific date as an example (e.g. Christmas, Valentine's)
  if (dateStr.endsWith("-02-14") || dateStr.endsWith("-12-25")) {
    status.custom_cakes = "sold_out";
    status.mini_cakes = "limited";
  }

  return status;
}
