import * as React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import "react-native-gesture-handler";

type ContextType = {
  translateX: number;
  translateY: number;
}

const WIDTH = Dimensions.get("window").width;

const SIZE = 100;
const SIZE_CIRCLE = WIDTH - 28;


export default function App() {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 }, { translateX: translateX.value }, { translateY: translateY.value }]
    };
  });

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.translateX + event.translationX;
      translateY.value = ctx.translateY + event.translationY;


    },
    onEnd: (event, ctx) => {
      // console.log("onEnd");
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance > SIZE_CIRCLE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
    onFinish: (event, ctx) => {
      console.log("onFinish");
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{
          width: SIZE_CIRCLE,
          height: SIZE_CIRCLE,
          borderRadius: SIZE_CIRCLE / 2,
          borderWidth: 2,
          borderColor: "green",
          justifyContent: "center", alignItems: "center"
        }}>
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View
              style={[{ width: SIZE, height: SIZE, backgroundColor: "green", borderRadius: 14 }, reanimatedStyle]} />
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
