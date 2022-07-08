import React, { useCallback, useRef } from "react";
import { Animated, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ItemMenu } from "../Home";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataTestInterface } from "./Common.data";
import StyleGlobal from "../Common/StyleGlobal";
import { SharedElement } from "react-navigation-shared-element";
import { img_src_bg1 } from "../index";
import * as Animatable from "react-native-animatable";

const HEIGHT_IMAGE = 300;

function DetailShareAnimation() {

    const route = useRoute<{ params: { item: DataTestInterface }, key: string, name: string }>();
    const navigation = useNavigation();

    const item = route.params.item;
    const ani = useRef(new Animated.Value(1)).current;


    const runAnimation = (x: number) => {
        Animated.timing(ani, {
            toValue: x,
            duration: 0,
            useNativeDriver: false
        }).start();
    };

    const scale = ani.interpolate({
        inputRange: [-219, -1],
        outputRange: [2.5, 1],
        extrapolate: "clamp"
    });

    const inputRangeArr = [0, 1, 100, 150];
    const opaHeader = ani.interpolate({
        inputRange: inputRangeArr,
        outputRange: [0, 0, 0.75, 1],
        extrapolate: "clamp"
    });

    const opaHeaderImg = ani.interpolate({
        inputRange: inputRangeArr,
        outputRange: [1, 1, 0.75, 0],
        extrapolate: "clamp"
    });


    const hgHeaderImg = ani.interpolate({
        inputRange: [0, 1, 30, 60],
        outputRange: [300, 200, 150, 1],
        extrapolate: "clamp"
    });


    const dataView = useCallback(() => {
        return [1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
            return <Animatable.View
                key={i.toString() + "Animatable.View.ItemMenu"}
                animation={"fadeInUpBig"}
                delay={150 * ((i + 1) / 2)}>
                <ItemMenu />
            </Animatable.View>;
        });
    }, []);


    return <View style={{ flex: 1 }}>

        {/*<View style={{ height: 200, width: "100%", position: "absolute", top: 0, left: 0, right: 0 }}>*/}
        {/*  <Image source={img_src_bg1} style={{ width: "100%", resizeMode: "center", height: "100%" }} />*/}
        {/*</View>*/}
        <StatusBar backgroundColor="transparent" barStyle={"dark-content"} translucent={true} />

        <Animated.View style={{
            height: HEIGHT_IMAGE,
            width: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            transform: [{ scale: scale }],
            opacity: opaHeaderImg
        }}>
            <SharedElement
                id={`item.${item.id}.src`}>
                <Animated.Image
                    source={item.src}
                    style={{
                        width: "100%",
                        resizeMode: "cover",
                        height: HEIGHT_IMAGE,
                        transform: [{ scale: scale }]
                    }} />
            </SharedElement>

        </Animated.View>


        <Animated.View
            style={{
                ...StyleGlobal.styleHeader,
                opacity: opaHeader
            }}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back-outline"} size={30} color={"#000"} />
            </TouchableOpacity>
            <View style={{ justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
                    {item.text}
                </Text>
            </View>
            <View>
                <Icon name={"alert-circle-outline"} size={30} color={"#000"} />
            </View>
        </Animated.View>


        <ScrollView
            scrollEventThrottle={16}
            onScroll={(event) => {
                // console.log(event.nativeEvent.contentOffset.y);
                runAnimation(Math.floor(event.nativeEvent.contentOffset.y));
            }
            }>

            <Animated.View style={{ height: HEIGHT_IMAGE, width: "100%" }}>
                <Animated.Image
                    source={img_src_bg1}
                    style={{
                        width: "100%",
                        resizeMode: "stretch",
                        height: HEIGHT_IMAGE,
                        opacity: 0
                        // transform: [{ scale: scale }]

                    }} />
            </Animated.View>
            <View style={{ height: 80 }}>
                <SharedElement id={`item.${item.id}.text`}>
                    <View style={{
                        justifyContent: "center",
                        position: "absolute",
                        backgroundColor: "rgba(255,255,255,0.52)",
                        left: 0, right: 0, padding: 14, top: 0
                    }}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>{item.text}</Text>
                        <Text style={{}}>{item.sub}</Text>
                    </View>
                </SharedElement>
            </View>

            {dataView()}

        </ScrollView>
    </View>;
}

DetailShareAnimation.sharedElements = (route: { params: { item: DataTestInterface } }) => {
    let item = route.params.item;
    return [
        {
            id: `item.${item.id}.src`,

        },
        {
            id: `item.${item.id}.text`,
            animated: "move",
            resize: "clip"
        }

    ];

};

// export default React.memo();
export default DetailShareAnimation;
