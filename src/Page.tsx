import React from "react";
import { Dimensions, StatusBar, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

interface PageInterface {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height + 40 + 20;
const SIZE = 200;

function Page({ title, translateX, index }: PageInterface) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];


  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
    // const borRadius = interpolate(translateX.value, inputRange, [0, width / 2, 0], Extrapolation.CLAMP);
    const borRadius = interpolate(translateX.value, inputRange, [width / 2, 14, width / 2], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      borderRadius: borRadius
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const tranY = interpolate(translateX.value, inputRange, [height / 2, 0, -(height / 2)]);
    const scale = interpolate(translateX.value, inputRange, [0, 1, 5], Extrapolation.CLAMP);
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    return {
      opacity,
      transform: [{ translateY: tranY }, { scale }]
    };
  });


  return <View
    style={{
      backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
      width,
      height,
      justifyContent: "center",
      alignItems: "center"
    }}>
    <StatusBar translucent={true} backgroundColor="transparent" />
    <Animated.View style={[{
      width: SIZE,
      height: SIZE,
      backgroundColor: "green",
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center"
    }, rStyle]}>
      <Animated.Text style={[{ fontSize: 30, color: "white", fontWeight: "bold" }, rTextStyle]}>{title}</Animated.Text>
    </Animated.View>

  </View>;
}

export default React.memo(Page);
