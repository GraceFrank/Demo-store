import type { Review } from "@/types";

export function averageRating(reviews: Review[]): number {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
