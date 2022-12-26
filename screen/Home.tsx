import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/TabNavigation";
import useMutation from "../hooks/useMutation";
import { getData } from "../utils/storageManager";
import { isLocationChangedWithFloor } from "../utils/common";
import useQuery from "../hooks/useQuery";

type Props = BottomTabScreenProps<TabParamList, "Map">;

const Home = ({ navigation }: Props) => {
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>();
  const { data } = useQuery({
    path: "getUsers",
  });
  const { mutate } = useMutation();

  useEffect(() => {
    (async () => {
      const email = await getData("user");
      if (email && location?.latitude && location?.longitude) {
        mutate({
          path: "location",
          data: {
            email: email.value,
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
        });
      }
    })();
  }, [location?.latitude, location?.longitude]);
  return (
    <View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={({ nativeEvent: { coordinate } }) => {
          setLocation((prev) => {
            if (
              isLocationChangedWithFloor(
                prev?.latitude,
                coordinate?.latitude
              ) ||
              isLocationChangedWithFloor(prev?.longitude, coordinate?.longitude)
            ) {
              return {
                latitude: coordinate?.latitude,
                longitude: coordinate?.longitude,
              };
            } else {
              return prev;
            }
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
