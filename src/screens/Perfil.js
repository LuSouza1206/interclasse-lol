import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Switch, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Nossa lista de Times
const timesLoL = [
  { id: '1', nome: 'Fluxo', logo: 'https://lol.fandom.com/wiki/Special:FilePath/Fluxologo_square.png' },
  { id: '2', nome: 'FURIA', logo: 'https://lol.fandom.com/wiki/Special:FilePath/FURIA_Esportslogo_square.png' },
  { id: '3', nome: 'LEVIATÁN', logo: 'https://lol.fandom.com/wiki/Special:FilePath/Leviatanlogo_square.png' },
  { id: '4', nome: 'LOS', logo: 'https://lol.fandom.com/wiki/Special:FilePath/LOSlogo_square.png' },
  { id: '5', nome: 'LOUD', logo: 'https://lol.fandom.com/wiki/Special:FilePath/LOUDlogo_square.png' },
  { id: '6', nome: 'paiN Gaming', logo: 'https://lol.fandom.com/wiki/Special:FilePath/PaiN_Gaminglogo_square.png' },
  { id: '7', nome: 'RED Canids', logo: 'https://lol.fandom.com/wiki/Special:FilePath/RED_Canidslogo_square.png' },
  { id: '8', nome: 'Vivo Keyd', logo: 'https://lol.fandom.com/wiki/Special:FilePath/Vivo_Keyd_Starslogo_square.png' },
];

// 2. Nossa lista de Jogadores
const jogadoresLTA = [
  { id: '1', nome: 'Robo' }, { id: '2', nome: 'Croc' }, { id: '3', nome: 'Tinowns' }, { id: '4', nome: 'Route' }, { id: '5', nome: 'RedBert' },
  { id: '6', nome: 'Wizer' }, { id: '7', nome: 'Cariok' }, { id: '8', nome: 'dyNquedo' }, { id: '9', nome: 'TitaN' }, { id: '10', nome: 'Kuri' },
];

// 3. Nossa nova lista de Ícones de Perfil do LoL
const avataresLoL = [
  { id: '1', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png' }, // Poro
  { id: '2', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/29.png' },  // Rosa de Cristal
  { id: '3', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/4662.png' }, // Pinguim
  { id: '4', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/5367.png' }, // Abelha Feliz
  { id: '5', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/3532.png' }, // Teemo Escoteiro
  { id: '6', uri: 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/10.png' },  // Poção
];

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [jogador, setJogador] = useState('');
  const [timeFavorito, setTimeFavorito] = useState('');
  const [notificacoes, setNotificacoes] = useState(false);
  
  // Novo estado para a foto de perfil (começa com o Poro por padrão)
  const [fotoPerfil, setFotoPerfil] = useState(avataresLoL[0].uri);

  // Estados para controlar qual janela (Modal) está aberta
  const [modalJogadorVisivel, setModalJogadorVisivel] = useState(false);
  const [modalTimeVisivel, setModalTimeVisivel] = useState(false);
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('@nome_invocador');
        const jogadorSalvo = await AsyncStorage.getItem('@jogador_favorito');
        const timeSalvo = await AsyncStorage.getItem('@time_favorito');
        const fotoSalva = await AsyncStorage.getItem('@foto_perfil');
        const notifSalva = await AsyncStorage.getItem('@notificacoes');
        
        if (nomeSalvo) setNome(nomeSalvo);
        if (jogadorSalvo) setJogador(jogadorSalvo);
        if (timeSalvo) setTimeFavorito(timeSalvo);
        if (fotoSalva) setFotoPerfil(fotoSalva);
        if (notifSalva !== null) setNotificacoes(JSON.parse(notifSalva));
      } catch (e) {
        console.error('Erro ao carregar os dados', e);
      }
    };
    carregarDados();
  }, []);

  const salvarPerfil = async () => {
    try {
      await AsyncStorage.setItem('@nome_invocador', nome);
      await AsyncStorage.setItem('@jogador_favorito', jogador);
      await AsyncStorage.setItem('@time_favorito', timeFavorito);
      await AsyncStorage.setItem('@foto_perfil', fotoPerfil);
      await AsyncStorage.setItem('@notificacoes', JSON.stringify(notificacoes));
      alert('Perfil atualizado com sucesso!');
    } catch (e) {
      alert('Erro ao salvar os dados');
    }
  };

  // Buscamos o objeto completo do time escolhido para poder mostrar a logo na tela principal
  const timeEscolhidoObj = timesLoL.find(t => t.nome === timeFavorito);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* CABEÇALHO DO PERFIL */}
      <View style={styles.header}>
        {/* Agora a foto é um botão que abre o modal de fotos */}
        <TouchableOpacity style={styles.areaFoto} onPress={() => setModalFotoVisivel(true)}>
          <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
          <View style={styles.iconeEditarFoto}>
            <Text style={{ fontSize: 12 }}>✏️</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.nomeInvocador}>{nome || 'Invocador'}</Text>
          <Text style={styles.nivelTexto}>Nível 300 • LTA Sul</Text>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Alterar Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: caslu"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Jogador Favorito:</Text>
        <TouchableOpacity style={styles.botaoEscolha} onPress={() => setModalJogadorVisivel(true)}>
          <Text style={styles.textoBotaoEscolha}>{jogador ? jogador : 'Clique para escolher...'}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Time Favorito:</Text>
        <TouchableOpacity style={styles.botaoEscolha} onPress={() => setModalTimeVisivel(true)}>
          {timeEscolhidoObj ? (
            <View style={styles.cardTimeEscolhido}>
              <Image source={{ uri: timeEscolhidoObj.logo }} style={styles.logoMiniatura} resizeMode="contain" />
              <Text style={styles.textoBotaoEscolha}>{timeEscolhidoObj.nome}</Text>
            </View>
          ) : (
            <Text style={styles.textoBotaoEscolha}>Clique para escolher seu time...</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* CENTRAL DO TORCEDOR */}
      <View style={styles.cardInterativo}>
        <Text style={styles.tituloCard}>Central do Torcedor</Text>
        
        <View style={styles.linhaSwitch}>
          <Text style={styles.textoSwitch}>Notificações de partidas</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#C89B3C" }}
            thumbColor={notificacoes ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={setNotificacoes}
            value={notificacoes}
          />
        </View>

        {timeFavorito ? (
          <View style={styles.proximaPartida}>
            <Text style={styles.textoPartida}>Próximo Jogo:</Text>
            <Text style={styles.confronto}>{timeFavorito} vs Rival</Text>
            <Text style={styles.dataJogo}>Sábado, 13:00 - CBLOL Arena</Text>
          </View>
        ) : (
          <Text style={styles.textoAviso}>Escolha um time para ver a agenda.</Text>
        )}
      </View>

      {/* BOTÃO SALVAR */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
        <Text style={styles.textoBotaoSalvar}>SALVAR ALTERAÇÕES</Text>
      </TouchableOpacity>

      {/* ================= MODAIS ================= */}

      {/* MODAL 1: ESCOLHER FOTO */}
      <Modal animationType="fade" transparent={true} visible={modalFotoVisivel} onRequestClose={() => setModalFotoVisivel(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Escolha seu Ícone</Text>
            <FlatList
              data={avataresLoL}
              numColumns={3} // Mostra 3 fotos por linha!
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setFotoPerfil(item.uri); setModalFotoVisivel(false); }} style={styles.itemAvatar}>
                  <Image source={{ uri: item.uri }} style={styles.avatarOpcao} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.botaoFecharModal} onPress={() => setModalFotoVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: ESCOLHER JOGADOR */}
      <Modal animationType="slide" transparent={true} visible={modalJogadorVisivel} onRequestClose={() => setModalJogadorVisivel(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Lista de Jogadores</Text>
            <FlatList
              data={jogadoresLTA}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemModalVertical} onPress={() => { setJogador(item.nome); setModalJogadorVisivel(false); }}>
                  <Text style={styles.textoItemModal}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.botaoFecharModal} onPress={() => setModalJogadorVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: ESCOLHER TIME */}
      <Modal animationType="slide" transparent={true} visible={modalTimeVisivel} onRequestClose={() => setModalTimeVisivel(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Lista de Times</Text>
            <FlatList
              data={timesLoL}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemTimeModalVertical} onPress={() => { setTimeFavorito(item.nome); setModalTimeVisivel(false); }}>
                  <View style={styles.fundoLogoTimeModal}>
                    <Image source={{ uri: item.logo }} style={styles.logoTimeModal} resizeMode="contain" />
                  </View>
                  <Text style={styles.textoItemModal}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.botaoFecharModal} onPress={() => setModalTimeVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

// Estilos atualizados para suportar os novos Modais e a Foto Editável
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010A13' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#091428', borderBottomWidth: 2, borderBottomColor: '#C89B3C' },
  areaFoto: { position: 'relative' },
  fotoPerfil: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#C89B3C' },
  iconeEditarFoto: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1E2328', borderRadius: 15, padding: 4, borderWidth: 1, borderColor: '#C89B3C' },
  headerInfo: { marginLeft: 15 },
  nomeInvocador: { fontSize: 24, fontWeight: 'bold', color: '#F0E6D2' },
  nivelTexto: { fontSize: 14, color: '#A09B8C', marginTop: 5 },
  secao: { padding: 20, paddingBottom: 0 },
  label: { fontSize: 14, color: '#A09B8C', marginBottom: 8, textTransform: 'uppercase', fontWeight: 'bold' },
  input: { backgroundColor: '#1E2328', borderWidth: 1, borderColor: '#3C3C41', color: '#F0E6D2', padding: 12, borderRadius: 5, marginBottom: 20, fontSize: 16 },
  
  // Estilo padronizado para os botões que abrem os modais
  botaoEscolha: { backgroundColor: '#1E2328', borderWidth: 1, borderColor: '#3C3C41', padding: 15, borderRadius: 5, marginBottom: 20, alignItems: 'center', justifyContent: 'center', minHeight: 55 },
  textoBotaoEscolha: { color: '#C89B3C', fontSize: 16, fontWeight: 'bold' },
  cardTimeEscolhido: { flexDirection: 'row', alignItems: 'center' },
  logoMiniatura: { width: 30, height: 30, marginRight: 10 },

  cardInterativo: { backgroundColor: '#091428', margin: 20, padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#1E2328' },
  tituloCard: { color: '#F0E6D2', fontSize: 18, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1E2328', paddingBottom: 10 },
  linhaSwitch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  textoSwitch: { color: '#A09B8C', fontSize: 16 },
  proximaPartida: { backgroundColor: '#1E2328', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoPartida: { color: '#A09B8C', fontSize: 12, textTransform: 'uppercase' },
  confronto: { color: '#F0E6D2', fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  dataJogo: { color: '#C89B3C', fontSize: 14 },
  textoAviso: { color: '#888', textAlign: 'center', fontStyle: 'italic' },
  
  botaoSalvar: { backgroundColor: '#1E2328', borderColor: '#C89B3C', borderWidth: 2, padding: 15, marginHorizontal: 20, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  textoBotaoSalvar: { color: '#C89B3C', fontSize: 16, fontWeight: 'bold' },

  // Estilos Gerais dos Modais
  modalBackground: { flex: 1, backgroundColor: 'rgba(1, 10, 19, 0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', maxHeight: '70%', backgroundColor: '#091428', borderRadius: 10, borderWidth: 2, borderColor: '#C89B3C', padding: 20 },
  modalTitulo: { color: '#F0E6D2', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1E2328', paddingBottom: 10 },
  botaoFecharModal: { backgroundColor: '#1E2328', padding: 15, borderRadius: 5, marginTop: 15, alignItems: 'center', borderWidth: 1, borderColor: '#C89B3C' },
  textoBotaoFechar: { color: '#C89B3C', fontWeight: 'bold', fontSize: 16 },

  // Estilos da Lista do Modal Jogador
  itemModalVertical: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1E2328' },
  textoItemModal: { color: '#A09B8C', fontSize: 18, textAlign: 'center' },

  // Estilos da Lista do Modal Time
  itemTimeModalVertical: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1E2328' },
  fundoLogoTimeModal: { backgroundColor: '#fff', borderRadius: 20, padding: 2, marginRight: 15 },
  logoTimeModal: { width: 40, height: 40, borderRadius: 18 },

  // Estilos da Lista do Modal de Fotos (Grid)
  itemAvatar: { flex: 1, alignItems: 'center', margin: 10 },
  avatarOpcao: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#A09B8C' },
});