import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PlayerListItem from "./PlayerListItem";

import { allPlayersState, filteredPlayers } from "../atoms/Players";
import { useRecoilState, useRecoilValue } from "recoil";

const PlayersList = () => {
  /* Note: diff ways: */
  /* const [players, setPlayers] = useRecoilState(allPlayersState); */
  /*   const _players = useRecoilValue(allPlayersState); */

  const __players = useRecoilValue(filteredPlayers);

  return (
    <BottomSheetFlatList
      /* data={_players} */
      data={__players}
      renderItem={({ item }) => <PlayerListItem player={item} />}
      /* contentContainerStyle={styles.contentContainer} */
    />
  );
};

export default PlayersList;

const styles = StyleSheet.create({});
