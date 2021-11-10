import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { Player } from "../types";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPlayersState, myFormationState } from "../atoms/MyTeam";

interface Props {
  player: Player;
}

const PlayerListItem = ({ player }: Props) => {
  const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState);
  const myFormation = useRecoilValue(myFormationState);

  const numberOfPlayersOnPosition = myPlayers.filter(
    (p) => p.position == player.position
  ).length;

  //Petir sol:
  /* const handlePickPlayer = () => {
    if (myPlayers.some((item) => item.id === player.id)) {
      //This player is already in the arr -> we want to remove it
      return setMyPlayers(myPlayers.filter((item) => item.id !== player.id));
    } else {
      //This player isn't in the arr -> we want to add it
      return setMyPlayers((currPlayers) => [...currPlayers, player]);
    }
  }; */

  //V sol:
  const handlePickPlayer = () => {
    setMyPlayers((currPlayers) => {
      if (currPlayers.some((item) => item.id === player.id)) {
        //This player is already in the arr -> we want to remove it
        return currPlayers.filter((item) => item.id !== player.id);
      }
      //This player isn't in the arr -> we want to add it
      //Check if it is possible to add (formation)
      if (numberOfPlayersOnPosition < myFormation[player.position]) {
        return [...currPlayers, player];
      }
      return currPlayers;
    });
  };

  /*  const isSelected = myPlayers.includes(item => item.id === player.id) */
  //Use some instead: ->
  const isSelected = myPlayers.some((item) => item.id === player.id);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${isSelected ? "purple" : "transparent"}`,
        },
      ]}
    >
      <AntDesign
        name="infocirlce"
        size={24}
        color="#42bff5"
        style={{
          paddingLeft: 20,
          paddingRight: 8,
        }}
      />
      {/* PRESSABLE TO BE ABLE TO PICK PLAYER */}
      <Pressable
        style={{
          flexDirection: "row",
          width: "88%",
        }}
        onPress={handlePickPlayer}
      >
        <View style={styles.uriNameGameContainer}>
          <Avatar
            containerStyle={{ marginLeft: 3 }}
            rounded
            size={30}
            source={{
              /*             uri: "data:image/jpeg;base64,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",
               */
              uri: `https://media.api-sports.io/football/players/${player.id}.png`,
            }}
          />
          <View style={styles.nameGameContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {player.name}
            </Text>
            <Text>{player.match}</Text>
          </View>
        </View>

        {/* RIGHT SECTION CONTAINER */}
        <View
          style={{
            flexDirection: "row",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <View style={styles.additionalInfoContainer}>
            <Text style={{ fontWeight: "600", fontSize: 15 }}>
              €{(player.price / 1_000_000).toFixed(1)}m
            </Text>
            <Text
              style={{
                fontWeight: "300",
              }}
            >
              {player.position}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginRight: 26,
            }}
          >
            {player.totalPoints}
          </Text>
          {/* END OF RIGHT SECTION CONTAINER */}
        </View>
      </Pressable>
      {/* END OF PRESSABLE FOR PICKING PLAYER */}
    </View>
  );
};

export default PlayerListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1.2,
    borderBottomColor: "#e1e5eb",
  },
  uriNameGameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    /* FOR GRAY BORDER BETWEEN ICON AND URI -> */
    borderLeftWidth: 1,
    borderLeftColor: "#e1e5eb",
    paddingLeft: 10,
  },
  nameGameContainer: { marginLeft: 5 },
  additionalInfoContainer: {
    marginRight: 20,
    alignItems: "flex-end",
  },
});
