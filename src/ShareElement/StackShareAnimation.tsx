import { createStackNavigator } from "@react-navigation/stack";
import MainShareAnimation from "./MainShareAnimation";
import DetailShareAnimation from "./DetailShareAnimation";
import React from "react";
const Stack = createStackNavigator();

export default function StackShareAnimation() {
    let MAIN_STACK_SHARE_ANIMATION = "MAIN_STACK_SHARE_ANIMATION";
    let DETAIL_STACK_SHARE_ANIMATION = "DETAIL_STACK_SHARE_ANIMATION";
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MAIN_STACK_SHARE_ANIMATION} component={MainShareAnimation} />
            <Stack.Screen name={DETAIL_STACK_SHARE_ANIMATION} component={DetailShareAnimation} />
        </Stack.Navigator>
    );
}
