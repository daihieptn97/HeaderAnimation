import * as React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import { useAnimatedStyle } from "react-native-reanimated";
import ItemBottomBar from "./ItemBottomBar";
import Home from "./Home";
import { ifIphoneX } from "react-native-iphone-x-helper";
import StackShareAnimation from "./ShareElement/StackShareAnimation";
import StackShareElement2Animation from "./ShareElement2/ShareElement2.Stack";

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Settings!</Text>
        </View>
    );
}

export const KEY_HOME = "home";
export const KEY_FIND = "find";
export const KEY_ADD = "add";
export const KEY_CHAT = "chat";
export const KEY_SETTING = "setting";


export const PRIMARY_COLOR = "#e8314c";
export const SUB_COLOR = "#79889b";
export const ICON_SELECTED_COLOR = "#ffffff";


function MyTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: 1 }]
        };
    });

    return (
        <View style={{
            flexDirection: "row",
            backgroundColor: "white",
            ...ifIphoneX({ paddingBottom: 25, height: 60 + 20 }, { paddingBottom: 0, height: 60 })
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    // @ts-ignore
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key
                    });
                };


                // console.log(state);


                return (
                    <View key={index.toString() + "_hello"} style={{ flex: 1, position: "relative" }}>
                        <ItemBottomBar
                            isFocused={isFocused} onPress={onPress}
                            onLongPress={onLongPress}
                            label={label}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            name={route.name}
                        />
                    </View>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Style2() {
    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name={KEY_FIND} component={StackShareAnimation} />
            <Tab.Screen name={KEY_HOME} component={StackShareElement2Animation} />
            <Tab.Screen name={KEY_CHAT} component={Home} />
            <Tab.Screen name={KEY_ADD} component={SettingsScreen} />
            <Tab.Screen name={KEY_SETTING} component={SettingsScreen} />
        </Tab.Navigator>
    );
}

