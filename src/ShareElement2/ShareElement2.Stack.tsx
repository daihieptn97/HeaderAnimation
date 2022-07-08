import DetailShareAnimation from "../ShareElement/DetailShareAnimation";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShareElement2 from "./ShareElement2";
import DetailScreenShareAnimation from "./DetailScreenShareAnimation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";


export const MAIN_STACK_SHARE_ANIMATION_2 = "MAIN_STACK_SHARE_ANIMATION_2";
export const DETAIL_STACK_SHARE_ANIMATION_2 = "DETAIL_STACK_SHARE_ANIMATION_2";

const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({ current: { progress } } :any) => {
        return {
            cardStyle: {
                opacity: progress
            }
        };
    }
};

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();
export default function StackShareElement2Animation() {


    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MAIN_STACK_SHARE_ANIMATION_2} component={ShareElement2} />
            <Stack.Screen
                name={DETAIL_STACK_SHARE_ANIMATION_2}
                // @ts-ignore
                component={DetailScreenShareAnimation}
                options={options}
            />
        </Stack.Navigator>
    );
}
