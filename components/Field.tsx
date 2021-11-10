import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useRecoilValue } from "recoil";
import field from "../assets/images/field.jpg";
import { myPlayersByPosition } from "../atoms/MyTeam";
import Player from "./Player";

/* const players = {
  FWD: ["costa", "ronaldo", "Isak"],
  MID: ["Claesson", "Ekdal", "Larsson"],
  DEF: ["Danielson", "VNL", "Lustig", "Ludde"],
  GK: ["Olsen"],
}; */

//hejej ehej jee hejej

const Field = () => {
  const players = useRecoilValue(myPlayersByPosition);

  return (
    <ImageBackground
      source={field}
      resizeMode="contain"
      style={{
        width: "100%",
        aspectRatio: 2 / 3,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* The Object.keys() method returns an array of a given object's own 
        enumerable property names, iterated in the same order 
        that a normal loop would. */}
      {Object.keys(players).map((pos, i) => (
        <View /* VIEW FOR THE ROW */
          key={i}
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            backgroundColor: "transparent",
            marginTop: 75,
          }}
        >
          {players[pos].map((_player, i) => (
            <Player pos={pos} key={i} /* name={name}*/ player={_player} />
          ))}
        </View>
      ))}
    </ImageBackground>
  );
};

export default Field;
