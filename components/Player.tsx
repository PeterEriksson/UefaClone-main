import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

//56:00...
/* type FieldPlayer = {
  name: string;
  pos: string;
}; */
type FieldPlayerProps = {
  player: null;
  pos: string;
};

/* const Player = ({ pos, name }) => { */
const Player = (props: FieldPlayerProps) => {
  const { player, pos } = props;

  return (
    <View /* VIEW FOR THE PLAYER SECTION (TSHIRT, PLUS ICON, NAME) */
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        marginTop: pos == "FWD" && 80,
      }}
    >
      <View /* VIEW FOR TSHIRT AND PLUS ICON */
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <FontAwesome5
          name="tshirt"
          size={35}
          color={player ? "#d170db" : "#5c5c5cbb"}
          style={
            {
              /* borderColor: "red" */
            }
          }
        />
        <AntDesign
          name="plus"
          size={16}
          color="white"
          style={{ position: "absolute", display: player && "none" }}
        />
      </View>
      <View /* POS TEXT VIEW */
        style={{
          backgroundColor: "#333333bb",
          paddingVertical: 4,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}
      >
        <Text
          /* key={i} */
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          {/* {pos} */}
          {player ? player.name : pos}
        </Text>
      </View>
    </View>
  );
};

export default Player;
