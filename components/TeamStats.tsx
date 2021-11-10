import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { numberOfPlayers, valueOfPlayers } from "../atoms/MyTeam";

const TeamStats = () => {
  const _nrOfPlayers = useRecoilValue(numberOfPlayers);
  const _valueOfPlayers = useRecoilValue(valueOfPlayers);

  return (
    <View style={styles.container}>
      {/* PLAYERS CONTAINER */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>Players</Text>
        <Text style={styles.amount}>{`${_nrOfPlayers}/11`}</Text>
      </View>

      {/* MONEY CONTAINER */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>Remaining</Text>
        <Text style={styles.amount}>
          €{((100_000_000 - _valueOfPlayers) / 1_000_000).toFixed(1)}m
        </Text>
      </View>
      {/* AUTO COMPLETE CONTAINER */}
    </View>
  );
};

export default TeamStats;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    padding: 15,
    marginTop: 40,
    borderColor: "#42bff5",
    borderWidth: 3,
  },
  sectionContainer: { marginLeft: 10 },
  header: { fontWeight: "200" },
  amount: { fontWeight: "600" },
});
