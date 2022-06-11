import React, { useRef } from "react";
import { Alert, Animated, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { img_src_bg1 } from "./index";

function Home() {

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

  const opaHeader = ani.interpolate({
    inputRange: [0, 1, 20, 60],
    outputRange: [0, 0, 0.75, 1],
    extrapolate: "clamp"
  });

  const opaHeaderImg = ani.interpolate({
    inputRange: [0, 1, 30, 60],
    outputRange: [1, 1, 0.75, 0],
    extrapolate: "clamp"
  });


  const hgHeaderImg = ani.interpolate({
    inputRange: [0, 1, 30, 60],
    outputRange: [200, 200, 150, 1],
    extrapolate: "clamp"
  });


  return <View style={{ flex: 1 }}>

    {/*<View style={{ height: 200, width: "100%", position: "absolute", top: 0, left: 0, right: 0 }}>*/}
    {/*  <Image source={img_src_bg1} style={{ width: "100%", resizeMode: "center", height: "100%" }} />*/}
    {/*</View>*/}
    <StatusBar backgroundColor="transparent" barStyle={"dark-content"} translucent={true} />

    <Animated.View style={{
      height: 200,
      width: "100%",
      overflow: "hidden",
      position: "absolute",
      top: 0,
      transform: [{ scale: scale }],
      opacity: opaHeaderImg
    }}>
      <Animated.Image source={img_src_bg1}
                      style={{
                        width: "100%",
                        resizeMode: "stretch",
                        height: "100%",
                        transform: [{ scale: scale }],
                        zIndex: 90

                      }} />
    </Animated.View>

    <Animated.View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 80,
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        justifyContent: "space-between",
        paddingHorizontal: 14,
        zIndex: 999,
        opacity: opaHeader
      }}>

      <TouchableOpacity onPress={() => Alert.alert("Hello")}>
        <Icon name={"arrow-back-outline"} size={30} color={"#000"} />
      </TouchableOpacity>
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
          Hiệp trần
        </Text>
      </View>
      <View>
        <Icon name={"alert-circle-outline"} size={30} color={"#000"} />
      </View>
    </Animated.View>


    <ScrollView
      scrollEventThrottle={16}
      onScroll={(event) => {
        console.log(event.nativeEvent.contentOffset.y);
        runAnimation(Math.floor(event.nativeEvent.contentOffset.y));
      }
      }>

      <Animated.View style={{ height: 200, width: "100%" }}>
        <Animated.Image
          source={img_src_bg1}
          style={{
            width: "100%",
            resizeMode: "stretch",
            height: "100%",
            opacity: 0
            // transform: [{ scale: scale }]

          }} />
      </Animated.View>


      <ItemMenu />
      <ItemMenu />

      <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
        Hiệp trần
      </Text>

      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
      <ItemMenu />
    </ScrollView>
  </View>;
}

function ItemMenu() {
  return <View style={{
    width: "80%", alignSelf: "center", alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 14
  }}>

    <Text>Hello</Text>
    <View style={{ backgroundColor: "green", width: "100%", height: 100 }} />
  </View>;
}

export default Home;
