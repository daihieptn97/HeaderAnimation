import * as React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from "react-native-reanimated";


const handlerRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  return `${progress.value * 360}rad`;
};

export default function App() {

  const progress = useSharedValue(0.2);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: handlerRotation(progress) }],
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(1), 3, true);
    scale.value = withRepeat(withSpring(2), 3, true);
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={[{ width: 100, height: 100, backgroundColor: "green" }, reanimatedStyle]}>

      </Animated.View>
    </View>
  );
}
