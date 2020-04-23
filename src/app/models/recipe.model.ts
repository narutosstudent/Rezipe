
interface Measure {
  uri: string,
  label: string
}

interface Food {
  foodId: string,
  label: string
}

interface NutrientInfo {
  uri: string,
  label: string,
  quantity: number,
  unit: string
}

interface Ingredient {
  text: string,
  foodId: string,
  quantity: number,
  measure: Measure,
  weight: number,
  food: Food
}

enum DietLabel {
  "balanced",
  "high-protein",
  "high-fiber",
  "low-fat",
  "low-carb",
  "low-sodium"
}

enum HealthLabel {
  "vegan",
  "vegetarian",
  "paleo",
  "dairy-free",
  "gluten-free",
  "wheat-free",
  "fat-free",
  "low-sugar",
  "egg-free",
  "peanut-free",
  "tree-nut-free",
  "soy-free",
  "fish-free",
  "shellfish-free"
}

export interface Recipe {
  uri: string,
  label: string,
  image: string,
  source: string,
  url: string,
  yield: number,
  calories: number,
  totalWeight: number,
  cautions?: any,
  ingredients: Ingredient[],
  totalNutrients: NutrientInfo[],
  totalDaily: NutrientInfo[],
  dietLabels?: DietLabel[],
  healthLabels?: HealthLabel[]
}
