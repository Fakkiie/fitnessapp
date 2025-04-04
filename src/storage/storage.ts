import { MMKV } from 'react-native-mmkv';
import uuid from 'react-native-uuid';

export const storage = new MMKV();

export type Meal = {
	name: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	date: string; // ISO format (e.g., '2025-04-02')
	id?: string; // uuid or timestamp
};

export const saveMeals = (meals: Meal[]) => {
	for (let meal of meals) {
		if (!meal.id) {
			meal.id = uuid.v4();
		}
	}

	storage.set('meals', JSON.stringify(meals));
};

export const loadMeals = (): Meal[] => {
	const raw = storage.getString('meals');
	return raw ? JSON.parse(raw) : [];
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

export const clearMeals = () => {
	storage.delete('meals');
};
