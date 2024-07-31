import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

const Busqueda = ({ onSearch, onBack }) => {
  const [inputText, setInputText] = useState("");

  const handlePress = () => {
    onSearch(inputText);
  };

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={onBack} />
      <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder="Ingrese el nombre del Pokémon"
      />
      <Button title="Buscar" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    padding: 3,
  },
});

export default Busqueda;
