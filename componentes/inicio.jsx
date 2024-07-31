import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Cuadro = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonColor, setPokemonColor] = useState("white");

  useEffect(() => {
    if (pokemonName) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then((response) => {
          setPokemon(response.data);
          return axios.get(response.data.species.url);
        })
        .then((response) => {
          const colorUrl = response.data.color.url;
          return axios.get(colorUrl);
        })
        .then((response) => {
          const colorName = response.data.name;
          setPokemonColor(getColorByName(colorName));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pokemonName]);

  if (!pokemon) {
    return <Text> </Text>;
  }

  return (
    <View style={styles.innerContainer}>
      <View style={[styles.box, { backgroundColor: pokemonColor }]}>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1, justifyContent: "space-around", margin: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>#{pokemon.id}</Text>
              <Text style={styles.text}>{pokemon.name}</Text>
              <Image
                source={{
                  uri: "https://cpng.pikpng.com/pngl/s/144-1444561_small-circulo-color-amarillo-png-clipart.png",
                }}
                style={{ width: 10, height: 10, alignSelf: "flex-end" }}
              />
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/1/18/Estrella_amarilla.png",
                }}
                style={{ width: 15, height: 15, alignSelf: "flex-end" }}
              />
            </View>
            <View style={styles.typesContainer}>
              {pokemon.types.map((typeInfo) => (
                <View
                  key={typeInfo.slot}
                  style={{
                    ...styles.type,
                    backgroundColor: getBackgroundColorByType(
                      typeInfo.type.name
                    ),
                  }}
                >
                  <Text style={styles.typeText}>{typeInfo.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: pokemon.sprites.front_default,
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
      </View>
    </View>
  );
};

const getColorByName = (colorName) => {
  const colors = {
    black: "#303943",
    blue: "#429BED",
    brown: "#B0736C",
    gray: "#999999",
    green: "#7AC74C",
    pink: "#F95587",
    purple: "#A33EA1",
    red: "#DC2624",
    white: "#EAEAEA",
    yellow: "#F7D02C",
  };

  return colors[colorName.toLowerCase()] || "white";
};

const getBackgroundColorByType = (type) => {
  switch (type) {
    case "normal":
      return "gray";
    case "fire":
      return "red";
    case "water":
      return "blue";
    case "electric":
      return "yellow";
    case "grass":
      return "green";
    case "ice":
      return "lightblue";
    case "fighting":
      return "brown";
    case "poison":
      return "purple";
    case "ground":
      return "saddlebrown";
    case "flying":
      return "skyblue";
    case "psychic":
      return "pink";
    case "bug":
      return "limegreen";
    case "rock":
      return "darkgray";
    case "ghost":
      return "indigo";
    case "dragon":
      return "darkblue";
    case "dark":
      return "black";
    case "steel":
      return "lightgray";
    case "fairy":
      return "lightpink";
    default:
      return "black";
  }
};

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  box: {
    width: 350,
    height: 120,
    flexDirection: "row",
    borderRadius: 30,
    padding: 10,
  },
  text: {
    marginHorizontal: 10,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  type: {
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  typeText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Cuadro;
