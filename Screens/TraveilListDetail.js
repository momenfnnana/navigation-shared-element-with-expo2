import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { height, tutorial2Spec, width } from '../theme';
const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = tutorial2Spec;
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable"
import { FlatList } from "react-native-gesture-handler";

const zoomIn = {
    0:{
        opacity: 0,
        scale:0
    },
    1:{
        opacity: 1,
        scale: 1
    }
}

const TraveilListDetails = ({ navigation, route }) => {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AntDesign
                name="arrowleft"
                size={24}
                color="#fff"
                style={{
                    paddingHorizontal: SPACING,
                    position: "absolute",
                    top: 50,
                    left: 10,
                    zIndex: 2
                }}
                onPress={navigation.goBack}
            />
            <View style={[StyleSheet.absoluteFillObject]}>
                <SharedElement
                    id={`item.${item.key}.photo`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <View style={[StyleSheet.absoluteFillObject, { borderRadius: 0 }]}>
                        <Image
                            source={{ uri: item.image }}
                            style={[
                                StyleSheet.absoluteFillObject,
                                {
                                    resizeMode: "cover"
                                }]}
                        />
                    </View>
                </SharedElement>
                <SharedElement id={`item.${item.key}.location`}>
                    <Text style={styles.location}>
                        {item.location}
                    </Text>
                </SharedElement>
                <View style={{
                    position: "absolute",
                    bottom: 120,
                }}>
                    <Text style={[
                        {
                            fontSize: 16,
                            width: "100%",
                            textTransform: "uppercase",
                            fontWeight: "800",
                            color: "#fff",
                            marginHorizontal: SPACING
                        }
                    ]}
                    >Activities</Text>
                    <FlatList
                        data={[...Array(8).keys()]}
                        keyExtractor={item => String(item)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ padding: SPACING }}
                        renderItem={({ item, index }) => {
                            return <Animatable.View
                            // here in animation type you can write what animation you want such as "fadeIn" or you can customize it as i did
                                animation={zoomIn}
                                duration={700}
                                delay={400 + (index * 100)}
                                style={{
                                    backgroundColor: "white",
                                    padding: SPACING,
                                    width: width * .33,
                                    height: width * .5,
                                    marginRight: SPACING
                                }}>
                                <Image source={{ uri: "https://im0-tub-com.yandex.net/i?id=fb5c549397bc40cb0b98a010d08b910d&n=13&exp=1" }}
                                    style={{ width: "100%", height: "70%", resizeMode: "cover" }}
                                />
                                <Text>Activity #${item + 1}</Text>
                            </Animatable.View>
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    location: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "800",
        width: ITEM_WIDTH * 0.8,
        textTransform: "uppercase",
        position: "absolute",
        top: 100,
        left: SPACING * 2
    },
})

TraveilListDetails.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.key}.photo`
        },
        {
            id: `item.${item.key}.location`
        }
    ]
}

export default TraveilListDetails;