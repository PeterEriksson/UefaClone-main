import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useRecoilState /* , useRecoilValue */ } from "recoil";
import { players } from "../assets/data/players";
import { positionFilterState } from "../atoms/Players";
import PlayerListItem from "./PlayerListItem";

const Filters = () => {
  /*   const positions = ["GK", "DEF", "MID", "FWD"]; */
  const positions = ["FWD", "MID", "DEF", "GK"];

  const [positionFilter, setPositionFilter] =
    useRecoilState(positionFilterState);

  const onFilterPress = (position: string) => {
    setPositionFilter((currPositionFilter) => {
      if (currPositionFilter.includes(position)) {
        //We want to remove the filter pos so that it can be unselected
        return currPositionFilter.filter((item) => item !== position);
      } else {
        //In this case we want to add the filter pos so that it is selected
        return [...currPositionFilter, position];
      }
    });
  };

  const isSelected = (position) => {
    return positionFilter.includes(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSectionContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 24, marginLeft: 10 }}>
          Filters
        </Text>
        {/* TOP SECTION RIGHT */}
        <View style={styles.topSectionRightContainer}>
          <Pressable
            style={styles.buttonReset}
            onPress={() => setPositionFilter([])}
          >
            <Text style={{ color: "#42bff5" }}>Reset</Text>
          </Pressable>
          <Pressable style={styles.buttonConfirm}>
            <Text style={{ color: "white" }}>Confirm</Text>
          </Pressable>
        </View>
      </View>

      {/* POSITIONS SECTION */}
      <Text>Position</Text>
      <View style={styles.positionContainer}>
        {positions.map((pos, i) => (
          <Pressable
            key={i}
            style={[
              styles.positionCircleContainer,
              { backgroundColor: isSelected(pos) ? "red" : "#ddd" },
            ]}
            onPress={() => onFilterPress(pos)}
          >
            <Text style={styles.positionText}>{pos}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {},
  topSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topSectionRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    /* justifyContent: "space-around", */
  },
  buttonReset: {
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 30,
    width: "45%",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#42bff5",
    marginRight: 10,
  },
  buttonConfirm: {
    padding: 8,
    backgroundColor: "#42bff5",
    borderRadius: 30,
    width: "45%",
    alignItems: "center",
  },
  positionContainer: { flexDirection: "row", justifyContent: "space-around" },
  positionCircleContainer: {
    borderWidth: 1,
    borderRadius: 45,
    width: 60,
    height: 60,
    borderColor: "lightgray",
    /* backgroundColor: "#ddd", */
    alignItems: "center",
    justifyContent: "center",
  },
  positionText: { fontWeight: "500", fontSize: 15 },
});
