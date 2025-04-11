import { MMKV } from 'react-native-mmkv';
import uuid from 'react-native-uuid';

export const storage = new MMKV();

export type Meal = {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  date: Date;
  id?: string; // uuid or timestamp
};

export type Macros = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  date?: string; // ISO format (e.g., '2025-04-02')
};

export const saveMeals = (meals: Meal[]) => {
  for (const meal of meals) {
    if (!meal.id) {
      meal.id = uuid.v4();
    }
  }

  storage.set('meals', JSON.stringify(meals));
};

export const addMealEatenToday = (newMeal: Meal) => {
  console.log('New Meal', newMeal);
  const mealsEaten = getMealsEatenToday();
  const currentDate = new Date();
  if (!newMeal.date) newMeal.date = currentDate;

  const updatedMealsEaten = [...mealsEaten, newMeal];
  storage.set('mealsEatenToday', JSON.stringify(updatedMealsEaten));
};

export const saveMacros = (macros: Macros) => {
  const currMacros = loadMacros();

  const newMacros: Macros = {
    calories: macros.calories + currMacros.calories,
    protein: macros.protein + currMacros.protein,
    fat: macros.fat + currMacros.fat,
    carbs: macros.carbs + currMacros.carbs,
    date: currMacros.date, // Store only the date part
  };

<<<<<<< HEAD
	storage.set('macros', JSON.stringify(newMacros));
};

export const decreaseMacros = (macros: Macros) => {
	const currMacros = loadMacros();

	const newMacros: Macros = {
		calories: currMacros.calories - macros.calories,
		protein: currMacros.protein - macros.protein,
		fat: currMacros.fat - macros.fat,
		carbs: currMacros.carbs - macros.carbs,
		date: currMacros.date, // Store only the date part
	};

	storage.set('macros', JSON.stringify(newMacros));
=======
  console.log('New Macros', newMacros);
  storage.set('macros', JSON.stringify(newMacros));
>>>>>>> b2e9bec (added workout saving)
};

export const loadMeals = (): Meal[] => {
  const raw = storage.getString('meals');
  return raw ? JSON.parse(raw) : [];
};

export const loadMacros = (): Macros => {
  const raw = storage.getString('macros');
  const currMacros = raw
    ? JSON.parse(raw)
    : {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        date: new Date().toISOString().split('T')[0],
      };

  // If macros are from the past, reset them
  const currentDate = new Date().toISOString().split('T')[0];
  if (currMacros.date !== currentDate) {
    currMacros.calories = 0;
    currMacros.protein = 0;
    currMacros.fat = 0;
    currMacros.carbs = 0;
    currMacros.date = currentDate;
  }
  return currMacros;
};

export const getMealsEatenToday = (): Meal[] => {
  const raw = storage.getString('mealsEatenToday');
  const mealsEaten = raw ? JSON.parse(raw) : [];
  const currentDate = new Date();
  // Filter out meals that are not from today
  const filteredMealsEaten = mealsEaten.filter(
    (meal: Meal) =>
      new Date(meal.date).toISOString().split('T')[0] ===
      currentDate.toISOString().split('T')[0],
  );

  // Save the filtered meals back to storage
  storage.set('mealsEatenToday', JSON.stringify(filteredMealsEaten));
  return filteredMealsEaten;
};

export const addMeal = (newMeal: Meal) => {
  const meals = loadMeals();
  const updatedMeals = [...meals, newMeal];
  saveMeals(updatedMeals);
  return updatedMeals;
};

export const removeMeal = (mealId: string) => {
  const meals = loadMeals();
  const updatedMeals = meals.filter((meal) => meal.id !== mealId);
  saveMeals(updatedMeals);
};

export const removeMealEatenToday = (mealId?: string) => {
	if (!mealId) {
		console.error('Meal ID is required to remove a meal.');
		return;
	}
	const mealsEaten = getMealsEatenToday();
	const updatedMealsEaten = mealsEaten.filter((meal) => meal.id !== mealId);
	storage.set('mealsEatenToday', JSON.stringify(updatedMealsEaten));
	return updatedMealsEaten;
};

export const resetMacros = () => {
  const macros = loadMacros();
  const resetMacros: Macros = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    date: macros.date, // Keep the date
  };
  storage.set('macros', JSON.stringify(resetMacros));
};

export const clearMeals = () => {
  storage.delete('meals');
};

// WORKOUT SECTION
export type WorkoutGroup = {
  name: string;
  exercises: string[];
  id?: string;
};

export const getWorkoutGroups = (): WorkoutGroup[] => {
  const raw = storage.getString('workoutGroups');
  return raw ? JSON.parse(raw) : [];
};

export const saveWorkoutGroups = (groups: WorkoutGroup[]) => {
  storage.set('workoutGroups', JSON.stringify(groups));
};

export const addWorkoutGroup = (group: WorkoutGroup) => {
  const current = getWorkoutGroups();
  if (!group.id) group.id = uuid.v4();
  const updated = [...current, group];
  saveWorkoutGroups(updated);
};

export const clearMealsEatenToday = () => {
	storage.delete('mealsEatenToday');
};
