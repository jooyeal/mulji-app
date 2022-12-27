import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/TabNavigation";
import useMutation from "../hooks/useMutation";
import { getData } from "../utils/storageManager";
import { isLocationChangedWithFloor } from "../utils/common";
import useQuery from "../hooks/useQuery";

type Props = BottomTabScreenProps<TabParamList, "Map">;
type User = {
  id: string;
  latitude: number;
  longitude: number;
  username: string;
};

const Home = ({}: Props) => {
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>();
  //get users info in database except self
  const { data } = useQuery<{ users: User[] }>({
    path: "getUsers",
    asyncParams: {
      email: () => getData("user"),
    },
  });

  const { mutate } = useMutation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);
  useEffect(() => {
    //update database of user's latitude and longitude
    (async () => {
      const email = await getData("user");
      if (email && location?.latitude && location?.longitude) {
        mutate({
          path: "location",
          data: {
            email: email,
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
          //update user latitude and longitude
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
        {data?.users.map((user) => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            title={user.username}
          >
            <Image source={require("../assets/favicon.png")} />
          </Marker>
        ))}
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
