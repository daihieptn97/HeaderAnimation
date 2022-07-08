
import MainShareAnimation from "./MainShareAnimation";
import DetailShareAnimation from "./DetailShareAnimation";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();

export const MAIN_STACK_SHARE_ANIMATION = "MAIN_STACK_SHARE_ANIMATION";
export const DETAIL_STACK_SHARE_ANIMATION = "DETAIL_STACK_SHARE_ANIMATION";

export default function StackShareAnimation() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MAIN_STACK_SHARE_ANIMATION} component={MainShareAnimation} />
            <Stack.Screen
                name={DETAIL_STACK_SHARE_ANIMATION}
                component={DetailShareAnimation}
                options={() => ({
                    cardStyleInterpolator: ({ insets, current }) => {
                        return {
                            cardStyle: {
                                opacity: current.progress
                            }
                        };
                    }
                })}
            />
        </Stack.Navigator>
    );
}
