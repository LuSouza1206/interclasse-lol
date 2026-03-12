import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Nossos ícones para o sininho

// Lista de logos para puxarmos dinamicamente
const logos = {
  'Fluxo': 'https://lol.fandom.com/wiki/Special:FilePath/Fluxologo_square.png',
  'FURIA': 'https://lol.fandom.com/wiki/Special:FilePath/FURIA_Esportslogo_square.png',
  'LEVIATÁN': 'https://lol.fandom.com/wiki/Special:FilePath/Leviatanlogo_square.png',
  'LOS': 'https://lol.fandom.com/wiki/Special:FilePath/LOSlogo_square.png',
  'LOUD': 'https://lol.fandom.com/wiki/Special:FilePath/LOUDlogo_square.png',
  'paiN Gaming': 'https://lol.fandom.com/wiki/Special:FilePath/PaiN_Gaminglogo_square.png',
  'RED Canids': 'https://lol.fandom.com/wiki/Special:FilePath/RED_Canidslogo_square.png',
  'Vivo Keyd': 'https://lol.fandom.com/wiki/Special:FilePath/Vivo_Keyd_Starslogo_square.png',
};

// Nossa agenda de jogos fictícia (ou real!) da rodada
const agendaJogos = [
  { id: '1', data: 'Sábado, 14 Mar', hora: '13:00', time1: 'LOUD', time2: 'paiN Gaming', local: 'CBLOL Arena' },
  { id: '2', data: 'Sábado, 14 Mar', hora: '15:00', time1: 'Fluxo', time2: 'FURIA', local: 'CBLOL Arena' },
  { id: '3', data: 'Domingo, 15 Mar', hora: '13:00', time1: 'RED Canids', time2: 'Vivo Keyd', local: 'CBLOL Arena' },
  { id: '4', data: 'Domingo, 15 Mar', hora: '15:00', time1: 'LOS', time2: 'LEVIATÁN', local: 'CBLOL Arena' },
];

export default function Calendario() {
  // Estado para guardar os IDs das partidas que o usuário quer ser lembrado
  const [lembretes, setLembretes] = useState([]);

  // Carrega os lembretes salvos assim que a tela abre
  useEffect(() => {
    const carregarLembretes = async () => {
      try {
        const lembretesSalvos = await AsyncStorage.getItem('@meus_lembretes');
        if (lembretesSalvos) {
          setLembretes(JSON.parse(lembretesSalvos));
        }
      } catch (e) {
        console.error('Erro ao carregar lembretes', e);
      }
    };
    carregarLembretes();
  }, []);

  // Função para favoritar/desfavoritar um jogo e salvar no celular
  const favoritarJogo = async (idJogo) => {
    try {
      let novaLista;
      if (lembretes.includes(idJogo)) {
        // Se já está na lista, a gente tira
        novaLista = lembretes.filter((id) => id !== idJogo);
      } else {
        // Se não está, a gente adiciona
        novaLista = [...lembretes, idJogo];
      }
      
      setLembretes(novaLista);
      await AsyncStorage.setItem('@meus_lembretes', JSON.stringify(novaLista));
    } catch (e) {
      alert('Erro ao salvar o lembrete.');
    }
  };

  const renderizarPartida = ({ item }) => {
    const isFavorito = lembretes.includes(item.id);

    return (
      <View style={styles.cardPartida}>
        {/* Cabeçalho do Card (Data e Local) */}
        <View style={styles.headerPartida}>
          <Text style={styles.dataTexto}>{item.data} • {item.hora}</Text>
          <Text style={styles.localTexto}>{item.local}</Text>
        </View>

        {/* Corpo do Card (Times e Placar) */}
        <View style={styles.corpoPartida}>
          {/* Time 1 */}
          <View style={styles.timeContainer}>
            <Image source={{ uri: logos[item.time1] }} style={styles.logoTime} resizeMode="contain" />
            <Text style={styles.nomeTime}>{item.time1}</Text>
          </View>

          {/* VS */}
          <View style={styles.vsContainer}>
            <Text style={styles.vsTexto}>VS</Text>
          </View>

          {/* Time 2 */}
          <View style={styles.timeContainer}>
            <Image source={{ uri: logos[item.time2] }} style={styles.logoTime} resizeMode="contain" />
            <Text style={styles.nomeTime}>{item.time2}</Text>
          </View>
        </View>

        {/* Rodapé (Botão de Lembrete) */}
        <TouchableOpacity 
          style={[styles.botaoLembrete, isFavorito && styles.botaoLembreteAtivo]}
          onPress={() => favoritarJogo(item.id)}
        >
          <Ionicons name={isFavorito ? "notifications" : "notifications-outline"} size={20} color={isFavorito ? "#010A13" : "#C89B3C"} />
          <Text style={[styles.textoBotaoLembrete, isFavorito && styles.textoBotaoLembreteAtivo]}>
            {isFavorito ? "Lembrete Ativo" : "Lembrar-me"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>Calendário de Jogos</Text>
        <Text style={styles.subtitulo}>LTA Sul - 1º Split</Text>
      </View>

      <FlatList
        data={agendaJogos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarPartida}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A13', // Azul escuro LoL
  },
  tituloContainer: {
    padding: 20,
    backgroundColor: '#091428',
    borderBottomWidth: 2,
    borderBottomColor: '#C89B3C',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F0E6D2',
  },
  subtitulo: {
    fontSize: 14,
    color: '#A09B8C',
    marginTop: 5,
  },
  listaContainer: {
    padding: 15,
  },
  cardPartida: {
    backgroundColor: '#1E2328',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3C3C41',
    overflow: 'hidden',
  },
  headerPartida: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#091428',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C41',
  },
  dataTexto: {
    color: '#C89B3C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  localTexto: {
    color: '#A09B8C',
    fontSize: 12,
  },
  corpoPartida: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoTime: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  nomeTime: {
    color: '#F0E6D2',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vsContainer: {
    paddingHorizontal: 15,
  },
  vsTexto: {
    color: '#A09B8C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoLembrete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#3C3C41',
  },
  botaoLembreteAtivo: {
    backgroundColor: '#C89B3C', // Fica dourado quando ativado
  },
  textoBotaoLembrete: {
    color: '#C89B3C',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  textoBotaoLembreteAtivo: {
    color: '#010A13', // Texto escuro para dar contraste com o fundo dourado
  },
});