import React, { useEffect, useRef } from "react";
import { Animated as Animated1, TouchableOpacity } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICON_SELECTED_COLOR, KEY_ADD, KEY_CHAT, KEY_FIND, KEY_HOME, KEY_SETTING, PRIMARY_COLOR } from "./Style1";


interface ItemBottomBarProps {
    isFocused: boolean;
    onPress: () => void;
    onLongPress: () => void;
    label: string | any;
    accessibilityLabel: string | undefined;
    name: string;
}


function ItemBottomBar({ isFocused, onPress, onLongPress, label, accessibilityLabel, name }: ItemBottomBarProps) {
    const offset = useSharedValue(isFocused ? -20 : 0);
    const ani = useRef(new Animated1.Value(isFocused ? -20 : 0)).current;

    const animatedStyles = useAnimatedStyle(() => {
        return {
            top: offset.value
        };
    });

    // const colorBgAnimated = interpolateColors(offset.value, {
    //     inputRange: [-20, 0],
    //     outputColorRange: ["#fffff", SUB_COLOR]
    // });

    const ran = [-20, 0];

    const animatedTitleStyles = useAnimatedStyle(() => {
        return {
            // position: "absolute",
            height: interpolate(offset.value, ran, [0, 20]),
            opacity: interpolate(offset.value, [-5, 0], [0, 1], Extrapolation.CLAMP)
            // color: interpolateColor(offset.value, [-20, -10, 0], [PRIMARY_COLOR, PRIMARY_COLOR, SUB_COLOR])
        };
    });

    const animatedIcon = useAnimatedStyle(() => {
        return {
            transform: [{ scale: interpolate(offset.value, ran, [1.5, 1]) }]
        };
    });

    useEffect(() => {
        console.log("------", isFocused, label, name);
        if (isFocused) {
            offset.value = withTiming(-20, { duration: 250 });

            runAnimation(-20);

        } else {
            runAnimation(0);
            offset.value = withTiming(0, { duration: 250 });
        }
    }, [isFocused]);


    const isChanger = useDerivedValue(() => {
        return isFocused ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 500 });
    }, [isFocused]);


    const color = interpolateColor(isChanger.value, [0, 1], [PRIMARY_COLOR, "#ffffff"]);


    const runAnimation = (x: number) => {
        Animated1.timing(ani, {
            toValue: x,
            duration: 100,
            useNativeDriver: false

        }).start();
    };

    const bgColor = ani.interpolate({
        inputRange: [-20, -5, 0],
        outputRange: [PRIMARY_COLOR, "#f6adb7", "white"]
    });


    return <Animated1.View style={[{
        alignSelf: "center",
        position: "absolute",
        backgroundColor: bgColor,
        borderRadius: 30,
        top: ani
    }]}>
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: 60,
                borderRadius: 30,
                width: 60
            }}
        >
            <Animated.View style={animatedIcon}>
                {getIcon(name, isFocused)}
            </Animated.View>
            <Animated.Text style={animatedTitleStyles}>
                {label}
            </Animated.Text>
        </TouchableOpacity>
    </Animated1.View>;
}

function compare(next: ItemBottomBarProps, prev: ItemBottomBarProps) {
    console.log("DEBUG123 ", next.isFocused, prev.isFocused, next.label);
    return next.isFocused === prev.isFocused;
}

export default React.memo(ItemBottomBar, compare);


function getIcon(key: string, isFocused: boolean) {

    let color = isFocused ? ICON_SELECTED_COLOR : "#79889b";
    let sizeIcon = isFocused ? 18 : 16;
    switch (key) {
        case KEY_HOME : {
            return <Icon name="home" size={sizeIcon} color={color} />;
        }
        case KEY_FIND : {
            return <Icon name="magnify" size={sizeIcon} color={color} />;
        }
        case KEY_ADD : {
            return <Icon name="plus" size={sizeIcon} color={color} />;
        }
        case KEY_CHAT : {
            return <Icon name="message-outline" size={sizeIcon} color={color} />;
        }
        case KEY_SETTING : {
            return <Icon name="cog-outline" size={sizeIcon} color={color} />;
        }
    }
}
