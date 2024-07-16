import { SafeAreaView, StyleSheet, ScrollView } from "react-native"
import PokemonCard from "@/components/PokemonCard";

export default function Pokemon() {
  const charmanderData = {
    name: "Charmander",
    image: require("@/assets/images/R(3).png"),
    type: "Fire",
    hp: 39,
    moves: ["Scratch", "Ember", "Growl", "Leer"],
    weaknesses: ["Water", "Rock"]
  };

  const squirtleData = {
    name: "Squirtle",
    image: require("@/assets/images/R(2).png"),
    type: "Water",
    hp: 44,
    moves: ["Tackle", "Water Gun", "Tail Whip", "Withdraw"],
    weaknesses: ["Electric", "Grass"]
  };

  const bulbasaurData = {
    name: "Bulbasaur",
    image: require("@/assets/images/R(1).png"),
    type: "Grass",
    hp: 45,
    moves: ["Tackle", "Vine Whip", "Growl", "Leech Seed"],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"]
  };

  const pikachuData = {
    name: "Pikachu",
    image: require("@/assets/images/R(5).png"),
    type: "Electric",
    hp: 35,
    moves: ["Quick Attack", "ThunderBolt", "Tail Whip", "Growl"],
    weaknesses: ["Ground"]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PokemonCard {...charmanderData} />
        <PokemonCard {...squirtleData} />
        <PokemonCard {...bulbasaurData} />
        <PokemonCard {...pikachuData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  }
})