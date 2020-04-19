import { Recipe } from "./recipe.model";

interface Hit {
  recipe: Recipe,
  bookmarked: boolean,
  bought: boolean
}

export interface RecipeResponseData {
  q: string,
  from: number,
  to: number,
  params: string[][],
  count: number,
  more: boolean,
  hits: Hit[]
}
