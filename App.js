import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Cuadro from "./componentes/inicio";
import Busqueda from "./componentereutilizable/busqueda";
import Lista from "./componentes/lista";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (name) => {
    setPokemonName(name);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
  };

  return (
    <View style={styles.Todo}>
      <Busqueda onSearch={handleSearch} onBack={handleBackToList} />
      {showDetails ? <Cuadro pokemonName={pokemonName} /> : <Lista />}
    </View>
  );
}

const styles = StyleSheet.create({
  Todo: {
    flex: 1,
    paddingTop: 50,
  },
});
