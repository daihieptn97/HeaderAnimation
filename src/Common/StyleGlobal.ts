import { StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    styleHeader: {
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
        opacity: 1
    }, styleHeaderNoPosition: {
        flexDirection: "row",
        backgroundColor: "white",

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
        opacity: 1
    }
});
