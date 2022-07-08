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
import { KEY_ADD, KEY_CHAT, KEY_FIND, KEY_HOME, KEY_SETTING, PRIMARY_COLOR } from "./Style1";


interface ItemBottomBarProps {
    isFocused: boolean;
    onPress: () => void;
    onLongPress: () => void;
    label: string | any;
    accessibilityLabel: string | undefined;
    name: string;
}

const MAX_TOP = -30;

function ItemBottomBarNewStyle({
                                   isFocused,
                                   onPress,
                                   onLongPress,
                                   label,
                                   accessibilityLabel,
                                   name
                               }: ItemBottomBarProps) {
    const offset = useSharedValue(isFocused ? MAX_TOP : 0);
    const ani = useRef(new Animated1.Value(isFocused ? MAX_TOP : 0)).current;

    const animatedStyles = useAnimatedStyle(() => {
        return {
            top: offset.value
        };
    });

    // const colorBgAnimated = interpolateColors(offset.value, {
    //     inputRange: [MAX_TOP, 0],
    //     outputColorRange: ["#fffff", SUB_COLOR]
    // });

    const ran = [MAX_TOP, 0];

    const animatedTitleStyles = useAnimatedStyle(() => {
        return {
            // position: "absolute",
            height: interpolate(offset.value, ran, [0, 20]),
            opacity: interpolate(offset.value, [-5, 0], [0, 1], Extrapolation.CLAMP)
            // color: interpolateColor(offset.value, [MAX_TOP, -10, 0], [PRIMARY_COLOR, PRIMARY_COLOR, SUB_COLOR])
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
            offset.value = withTiming(MAX_TOP, { duration: 250 });

            runAnimation(MAX_TOP);

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
        inputRange: [MAX_TOP, -5, 0],
        outputRange: [PRIMARY_COLOR, "#f6adb7", "white"]
    });


    return <Animated1.View style={[{
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "white",
        borderRadius: ani.interpolate({ inputRange: [MAX_TOP, MAX_TOP * 0.75, 0], outputRange: [37, 20, 10] }),
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
                height: 80,
                borderRadius: 40,
                width: 80
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

export default React.memo(ItemBottomBarNewStyle, compare);


function getIcon(key: string, isFocused: boolean) {

    let color = "#79889b";
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
