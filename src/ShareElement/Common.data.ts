import { ImageRequireSource } from "react-native";
import { img_assets_demo1, img_assets_demo2, img_assets_demo3, img_assets_demo4 } from "../assets";

export interface DataTestInterface {
    id: number,
    src: ImageRequireSource,
    text: string
    sub: string

}

export const DATA_TEST_LIST: DataTestInterface[] = [
    {
        id: 1,
        src: img_assets_demo1,
        text: "How it works",
        sub: "react-native-shared-element"
    },
    {
        id: 2,
        src: img_assets_demo2,
        text: "How it works",
        sub: "react-native-shared-element"
    },
    {
        id: 3,
        src: img_assets_demo3,
        text: "How it works",
        sub: "react-native-shared-element"
    },
    {
        id: 4,
        src: img_assets_demo4,
        text: "How it works",
        sub: "react-native-shared-element"
    }
];
