import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/TabNavigation";

type Props = BottomTabScreenProps<TabParamList, "Map">;

const Home = ({ navigation }: Props) => {
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>();

  useEffect(() => {
    // TODO: update user location of database
    console.log(location);
  }, [location?.latitude, location?.longitude]);
  return (
    <View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={({ nativeEvent: { coordinate } }) => {
          setLocation({
            latitude: coordinate?.latitude,
            longitude: coordinate?.longitude,
          });
        }}
      >
        <Marker
          coordinate={{ latitude: 37.5326, longitude: 127.024612 }}
          title="Marker"
        >
          <Image source={require("../assets/favicon.png")} />
        </Marker>
      </MapView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
