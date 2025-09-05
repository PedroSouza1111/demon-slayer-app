import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

const API_URL = 'https://www.demonslayer-api.com/api/v1/characters?id=';

const backgroundHuman = require('../../assets/background-human.png');
const backgroundDemon = require('../../assets/background-demon.png');

export default function DetailsScreen({ route }) {
  const { id } = route.params; 
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Personagem não encontrado.</Text>
      </View>
    );
  }

  const backgroundImage =
    character.race === 'Human' ? backgroundHuman : backgroundDemon;

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: character.img }} style={styles.characterImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{character.name}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Idade: {character.age}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Raça: {character.race}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Gênero: {character.gender}</Text>
            </View>
          </View>

          <Text style={styles.description}>{character.description}</Text>

          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>"{character.quote}"</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
  characterImage: {
    width: '80%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -50,
    alignItems: 'center',
    width: '90%',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  quoteContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  quote: {
    color: '#FFF',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});