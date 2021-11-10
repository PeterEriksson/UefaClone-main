import { atom, selector } from "recoil";
import { Player } from "../types";
import { Positions } from "../types";

export const myFormationState = atom({
  key: "myFormation",
  default: {
    FWD: 3,
    MID: 3,
    DEF: 4,
    GK: 1,
  },
});

export const myPlayersState = atom({
  key: "MyPlayersState",
  default: [] as Player[],
});

const positions = ["FWD", "MID", "DEF", "GK"] as Positions[];

export const myPlayersByPosition = selector({
  key: "myPlayersByPosition",
  get: ({ get }) => {
    const players = get(myPlayersState);

    const groupedPlayers = {};

    const formation = get(myFormationState);
    //3:29
    positions.forEach((position) => {
      groupedPlayers[position] = players.filter((p) => p.position === position);
      //Fill with null values, up to the amount of expected players from formation (3:42:10)
      for (
        let i = groupedPlayers[position].length;
        i < formation[position];
        i++
      ) {
        groupedPlayers[position].push(null);
      }
    });
    return groupedPlayers;
  },
});

export const numberOfPlayers = selector({
  key: "numberOfPlayers",
  get: ({ get }) => get(myPlayersState).length,
});

//P sol: (later -> added , 0 (we start counting at 0))
export const valueOfPlayers = selector({
  key: "valueOfPlayers",
  get: ({ get }) =>
    get(myPlayersState)
      .map((item) => item.price)
      .reduce((total, curr) => total + curr, 0),
});

//V sol: (cleaner):
/* export const valueOfPlayers = selector({
  key: "valueOfPlayers",
  get: ({ get }) =>
    get(myPlayersState).reduce((acc, player) => acc + player.price, 0),
}); */
