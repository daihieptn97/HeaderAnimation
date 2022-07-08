import React from "react";
import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { ShareElement2Data } from "./ShareElement2.Common";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DETAIL_STACK_SHARE_ANIMATION_2 } from "./ShareElement2.Stack";
import { SharedElement } from "react-navigation-shared-element";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const data = ShareElement2Data;

function ShareElement2({}) {
    const navigation = useNavigation<any>();
    return (
        <View style={{ flex: 1, paddingTop : 40 }}>
            <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={"transparent"} />
            <ScrollView
                indicatorStyle="white"
                contentContainerStyle={{ alignItems: "center" }}
            >
                {data.map(item => (
                    <View key={item.id}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ marginBottom: 14 }}
                            onPress={() => navigation.navigate(DETAIL_STACK_SHARE_ANIMATION_2, { item })}
                        >
                            <SharedElement id={`item.${item.id}.image_url`}>
                                <Image
                                    style={{
                                        borderRadius: 14,
                                        width: ITEM_WIDTH,
                                        height: ITEM_HEIGHT
                                    }}
                                    source={{ uri: item.image_url }}
                                    resizeMode="cover"
                                />
                            </SharedElement>
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: 10
                                }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <Icon size={40} color="white" name={item.iconName} />
                                    <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 24,
                                                fontWeight: "bold",
                                                lineHeight: 28
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                lineHeight: 18
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>);
}

export default React.memo(ShareElement2);
