import * as React from "react";
import { StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
/* import { View } from "../components/Themed"; */
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Field from "../components/Field";
import TeamStats from "../components/TeamStats";
import { useCallback, useMemo, useRef } from "react";
import { View /*  Text, StyleSheet */ } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PlayerListItem from "../components/PlayerListItem";
import PlayersList from "../components/PlayersList";
import { players } from "../assets/data/players";
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";
import Filters from "../components/Filters";

export default function TabOneScreen() {
  const playersBottomSheet = useRef<BottomSheet>(null);
  const filtersBottomSheet = useRef<BottomSheet>(null);

  const viewPlayers = () => {
    /* console.warn("teeest"); */
    playersBottomSheet.current?.expand();
  };

  const closeSheet = () => {
    playersBottomSheet.current?.close();
  };

  // variables
  const snapPoints = useMemo(() => [0, "50%"], []);

  // callbacks (not using right now)
  const handleSheetChanges = useCallback((index: number) => {
    /* console.log("handleSheetChanges", index); */
  }, []);

  const viewFilteredPlayers = () => {
    filtersBottomSheet.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TeamStats />
      <Field />

      <Pressable onPress={viewPlayers} style={styles.buttonContainer}>
        <Text>View Players</Text>
      </Pressable>

      <BottomSheet
        ref={playersBottomSheet}
        /* index=1 -> what index of the snap point it should initialize /V */
        index={0}
        snapPoints={snapPoints}
        /* onChange={handleSheetChanges} */
      >
        {/* TOP SECTION CONTAINER */}
        <View style={styles.topSectionContainer}>
          {/* ADD FILTER BUTTON */}
          <Pressable
            onPress={viewFilteredPlayers}
            style={styles.buttonFilteredContainer}
          >
            <Text style={{ color: "white" }}>Add filter</Text>
          </Pressable>
          {/* TOP SECTION RIGHT CONTAINER */}
          {/* FIRE BUTTON */}
          <View style={styles.topSectionRightContainer}>
            <Pressable>
              <MaterialCommunityIcons
                name="fire"
                size={24}
                color="black"
                /* style={{ marginRight: 10 }} */
              />
            </Pressable>
            {/* SEARCH BUTTON */}
            <Pressable>
              <Ionicons
                name="ios-search-sharp"
                size={22}
                color="black"
                /* style={{ marginRight: 10 }} */
              />
            </Pressable>
            {/* CROSS/CLOSE BUTTON */}
            <Pressable onPress={closeSheet}>
              <Entypo
                name="cross"
                size={28}
                color="black"
                /* style={{ marginRight: 15 }} */
              />
            </Pressable>
          </View>
        </View>

        {/* <BottomSheetFlatList
          data={players}
          renderItem={({ item }) => <PlayerListItem player={item} />}
          contentContainerStyle={styles.contentContainer}
        /> */}
        {/* 2:28: -> Refactored: -> */}

        {/* //4:02 Suspense */}
        <React.Suspense fallback={<Text>Loading</Text>}>
          <PlayersList />
        </React.Suspense>
      </BottomSheet>
      <BottomSheet ref={filtersBottomSheet} index={0} snapPoints={snapPoints}>
        <Filters />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#72CC5E",
  },
  buttonContainer: {
    padding: 12,
    backgroundColor: "orange",
    borderRadius: 50,
    width: "60%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 15,
  },
  buttonFilteredContainer: {
    padding: 10,
    backgroundColor: "#42bff5",
    borderRadius: 50,
    width: "35%",
    alignItems: "center",
    marginLeft: 10,
  },
  topSectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e1e5eb",
  },
  topSectionRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    justifyContent: "space-around",
  },
  contentContainer: {},
});
