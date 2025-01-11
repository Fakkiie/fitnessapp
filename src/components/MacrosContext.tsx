import React, { createContext, useContext, useState } from 'react';

interface MacrosContextType {
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalCalories: number;
  addMacros: (
    protein: number,
    fat: number,
    carbs: number,
    calories: number,
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
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const addMacros = (
    protein: number,
    fat: number,
    carbs: number,
    calories: number,
  ) => {
    setTotalProtein((prev) => prev + protein);
    setTotalFat((prev) => prev + fat);
    setTotalCarbs((prev) => prev + carbs);
    setTotalCalories((prev) => prev + calories);
  };

  const value = React.useMemo(
    () => ({ totalProtein, totalFat, totalCarbs, totalCalories, addMacros }),
    [totalProtein, totalFat, totalCarbs, totalCalories],
  );

  return (
    <MacrosContext.Provider value={value}>{children}</MacrosContext.Provider>
  );
};
