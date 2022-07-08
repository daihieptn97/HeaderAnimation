import React from "react";
import { FlatList, Image, ListRenderItem, StatusBar, Text, TouchableOpacity, View } from "react-native";
import StyleGlobal from "../Common/StyleGlobal";
import { useNavigation } from "@react-navigation/native";
import { DETAIL_STACK_SHARE_ANIMATION } from "./StackShareAnimation";
import { DATA_TEST_LIST, DataTestInterface } from "./Common.data";
import { SharedElement } from "react-navigation-shared-element";

function MainShareAnimation() {
    const navigation = useNavigation<any>();

    const dataRenderItem: ListRenderItem<DataTestInterface> = ({ item }) => {
        return <TouchableOpacity
            style={{
                flexDirection: "row",
                marginBottom: 10,
                backgroundColor: "rgb(255,255,255)",
                margin: 14,
                padding: 10,
                borderRadius: 5
            }}
            onPress={() => navigation.navigate(DETAIL_STACK_SHARE_ANIMATION, { item })}>
            <View style={{ flex: 1 }}>
                <SharedElement id={`item.${item.id}.src`}>
                    <Image source={item.src}
                           style={{ width: "50%", height: 200, resizeMode: "cover" }} />
                </SharedElement>
                <SharedElement id={`item.${item.id}.text`}>
                    <View style={{
                        justifyContent: "center",
                        position: "absolute",
                        backgroundColor: "rgba(255,255,255,0.52)",
                        left: 0, right: 0, padding: 14, bottom: 0
                    }}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>{item.text}</Text>
                        <Text style={{}}>{item.sub}</Text>

                    </View>
                </SharedElement>

            </View>
            {/*<View style={{ flex: 4 }}>*/}
            {/*    <Image source={item.src}*/}
            {/*           style={{ width: "100%", height: 200, resizeMode: "cover" }} />*/}
            {/*</View>*/}
            {/*<View style={{ flex: 6, justifyContent: "center" }}>*/}
            {/*    <Text style={{ fontWeight: "bold", color: "black" }}>{item.text}</Text>*/}
            {/*    <Text style={{}}>{item.sub}</Text>*/}
            {/*</View>*/}
        </TouchableOpacity>;
    };

    return <View style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={"transparent"} />
        <View style={StyleGlobal.styleHeaderNoPosition}>
            <Text>Hello Hiep</Text>
        </View>
        <View style={{ flex: 1 }}>
            <FlatList data={DATA_TEST_LIST} renderItem={dataRenderItem} />


        </View>
    </View>;
}

export default React.memo(MainShareAnimation);
