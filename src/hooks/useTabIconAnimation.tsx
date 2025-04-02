import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useTabIconAnimation(focused: boolean) {
	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		console.log("focused changed:", focused);
		Animated.timing(scale, {
			toValue: focused ? 1.2 : 1,
			duration: 300,
			easing: Easing.out(Easing.exp),
			useNativeDriver: true,
		}).start();
	}, [focused]);

	return scale;
}
