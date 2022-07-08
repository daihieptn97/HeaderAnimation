import React from "react";
import Style1 from "./src/Style1";
import { createStackNavigator } from "@react-navigation/stack";
import Style2 from "./src/Style2";
import { StatusBar, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StackShareAnimation from "./src/ShareElement/StackShareAnimation";

const Stack = createStackNavigator();

function Main() {

    const navigation = useNavigation<any>();


    const styles: ViewStyle = {
        padding: 14,
        backgroundColor: "#06c572",
        margin: 14,
        paddingHorizontal: 20,
        borderRadius: 12
    };

    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar backgroundColor="transparent" barStyle={"dark-content"} translucent={true} />
        <TouchableOpacity style={styles} onPress={() => navigation.navigate("style1")}>
            <Text>Style 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles} onPress={() => navigation.navigate("style2")}>
            <Text>Style 2</Text>
        </TouchableOpacity>
    </View>;
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown : false}}>
                <Stack.Screen name="style2" component={Style2} />
                <Stack.Screen name="style1" component={Style1} />
                <Stack.Screen name="StackShareAnimation" component={StackShareAnimation} />
                <Stack.Screen name="main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
