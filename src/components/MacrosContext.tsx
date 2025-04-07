import React, { createContext, useContext, useState } from 'react';
import {
	loadMacros,
	Macros,
	saveMacros,
	decreaseMacros,
} from 'src/storage/storage';

interface MacrosContextType {
	totalProtein: number;
	totalFat: number;
	totalCarbs: number;
	totalCalories: number;
	addMacros: (
		protein: number,
		fat: number,
		carbs: number,
		calories: number
	) => void;
	removeMacros: (
		protein: number,
		fat: number,
		carbs: number,
		calories: number
	) => void;
}

const MacrosContext = createContext<MacrosContextType | undefined>(undefined);

export const useMacros = () => {
	const context = useContext(MacrosContext);
	if (!context) {
		throw new Error('useMacros must be used within a MacrosProvider');
	}
	return context;
};

interface MacrosProviderProps {
	children: React.ReactNode;
}

export const MacrosProvider: React.FC<MacrosProviderProps> = ({ children }) => {
	const initialMacros = loadMacros();
	const [totalProtein, setTotalProtein] = useState(initialMacros.protein);
	const [totalFat, setTotalFat] = useState(initialMacros.fat);
	const [totalCarbs, setTotalCarbs] = useState(initialMacros.carbs);
	const [totalCalories, setTotalCalories] = useState(initialMacros.calories);

	const addMacros = (
		protein: number,
		fat: number,
		carbs: number,
		calories: number
	) => {
		setTotalProtein((prev) => prev + protein);
		setTotalFat((prev) => prev + fat);
		setTotalCarbs((prev) => prev + carbs);
		setTotalCalories((prev) => prev + calories);

		const macros: Macros = {
			protein: protein,
			fat: fat,
			carbs: carbs,
			calories: calories,
		};
		saveMacros(macros);
	};

	const removeMacros = (
		protein: number,
		fat: number,
		carbs: number,
		calories: number
	) => {
		setTotalProtein((prev) => prev - protein);
		setTotalFat((prev) => prev - fat);
		setTotalCarbs((prev) => prev - carbs);
		setTotalCalories((prev) => prev - calories);
		const macros: Macros = {
			protein: protein,
			fat: fat,
			carbs: carbs,
			calories: calories,
		};
		decreaseMacros(macros);
	};

	const value = React.useMemo(
		() => ({
			totalProtein,
			totalFat,
			totalCarbs,
			totalCalories,
			addMacros,
			removeMacros,
		}),
		[totalProtein, totalFat, totalCarbs, totalCalories]
	);

	return (
		<MacrosContext.Provider value={value}>
			{children}
		</MacrosContext.Provider>
	);
};
