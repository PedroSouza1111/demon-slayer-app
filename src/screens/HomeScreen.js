import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

const API_URL = 'https://www.demonslayer-api.com/api/v1/characters?limit=45';

export default function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Iniciando busca de personagens...');

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados recebidos! Personagens encontrados:', data.content.length);
        setCharacters(data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('ERRO AO BUSCAR DADOS:', error);
        setLoading(false);
      });
  }, []);

  const renderCharacter = ({ item }) => {

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      >
        <Image source={{ uri: item.img }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Escolha seu personagem abaixo</Text>
      </View>
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 18,
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});