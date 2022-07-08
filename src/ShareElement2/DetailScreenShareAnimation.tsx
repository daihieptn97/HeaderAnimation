import React from "react";
import { Dimensions, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SharedElement } from "react-navigation-shared-element";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;

function DetailScreenShareAnimation() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { item } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
            <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={"transparent"} />
            <SharedElement id={`item.${item.id}.image_url`}>
                <Image
                    source={{ uri: item.image_url }}
                    style={{
                        width: "100%",
                        height: ITEM_HEIGHT,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                    }}
                    resizeMode="cover"
                />
            </SharedElement>
            <MaterialCommunityIcons
                name="close"
                size={28}
                color="#fff"
                style={{
                    position: "absolute",
                    top: 40,
                    right: 20,
                    zIndex: 2
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <View
                style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 20 }}
            >
                <MaterialCommunityIcons size={40} color="white" name={item.iconName} />
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
            <ScrollView
                indicatorStyle="white"
                style={{
                    paddingHorizontal: 20,
                    backgroundColor: "#0f0f0f"
                }}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: "#fff",
                        lineHeight: 24,
                        marginBottom: 4
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: "#fff",
                        lineHeight: 24,
                        marginBottom: 4
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
        </View>
    );
}

DetailScreenShareAnimation.sharedElements = (route: any) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.id}.image_url`,
            animation: "stretch",
            resize: "clip"
        }
    ];
};

export default DetailScreenShareAnimation;
