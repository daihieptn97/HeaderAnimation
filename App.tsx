import * as React from "react";
import { Dimensions, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import Page from "./src/Page";

type ContextType = {
  translateX: number;
  translateY: number;
}

const WIDTH = Dimensions.get("window").width;

const SIZE = 100;
const SIZE_CIRCLE = WIDTH - 28;

const LIST_TITLE = ["Hello", "World", "React Native", "Reanimated", "Gesture Handler", "Hiep"];

export default function App() {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.ScrollView onScroll={onGestureEvent} pagingEnabled={true} horizontal={true}
                             showsHorizontalScrollIndicator={false}>
          {LIST_TITLE.map((title, index) => {
            return <Page index={index} title={title} translateX={translateX} key={index.toString()} />;
          })}
        </Animated.ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}
