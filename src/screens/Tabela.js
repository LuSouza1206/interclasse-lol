import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// CLASSIFICAÇÃO ATUALIZADA: paiN Gaming no topo (Onde deve estar!)
const classificacao = [
  { id: '1', posicao: 1, nome: 'paiN Gaming', vitorias: 5, derrotas: 0, logo: 'https://lol.fandom.com/wiki/Special:FilePath/PaiN_Gaminglogo_square.png' },
  { id: '2', posicao: 2, nome: 'LOUD', vitorias: 4, derrotas: 1, logo: 'https://lol.fandom.com/wiki/Special:FilePath/LOUDlogo_square.png' },
  { id: '3', posicao: 3, nome: 'Vivo Keyd', vitorias: 3, derrotas: 2, logo: 'https://lol.fandom.com/wiki/Special:FilePath/Vivo_Keyd_Starslogo_square.png' },
  { id: '4', posicao: 4, nome: 'RED Canids', vitorias: 3, derrotas: 2, logo: 'https://lol.fandom.com/wiki/Special:FilePath/RED_Canidslogo_square.png' },
  { id: '5', posicao: 5, nome: 'Fluxo', vitorias: 2, derrotas: 3, logo: 'https://lol.fandom.com/wiki/Special:FilePath/Fluxologo_square.png' },
  { id: '6', posicao: 6, nome: 'FURIA', vitorias: 2, derrotas: 3, logo: 'https://lol.fandom.com/wiki/Special:FilePath/FURIA_Esportslogo_square.png' },
  { id: '7', posicao: 7, nome: 'LEVIATÁN', vitorias: 1, derrotas: 4, logo: 'https://lol.fandom.com/wiki/Special:FilePath/Leviatanlogo_square.png' },
  { id: '8', posicao: 8, nome: 'LOS', vitorias: 0, derrotas: 5, logo: 'https://lol.fandom.com/wiki/Special:FilePath/LOSlogo_square.png' },
];

export default function Tabela() {
  const renderItem = ({ item }) => (
    <View style={styles.linhaTabela}>
      <View style={styles.posicaoContainer}>
        <Text style={[styles.textoPosicao, item.posicao <= 4 && styles.textoPlayoffs]}>
          {item.posicao}º
        </Text>
      </View>
      
      <View style={styles.fundoLogo}>
        <Image source={{ uri: item.logo }} style={styles.logoTime} resizeMode="contain" />
      </View>
      
      <View style={styles.infoTime}>
        <Text style={styles.nomeTime}>{item.nome}</Text>
      </View>
      
      <View style={styles.pontuacaoContainer}>
        <Text style={styles.textoVitoria}>{item.vitorias}V</Text>
        <Text style={styles.textoDerrota}>{item.derrotas}D</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerPagina}>
        <Text style={styles.titulo}>Classificação</Text>
        <Text style={styles.subtitulo}>LTA Sul 2026 • Temporada Regular</Text>
      </View>

      <View style={styles.cabecalhoTabela}>
        <Text style={[styles.labelCabecalho, { width: 40 }]}>#</Text>
        <Text style={[styles.labelCabecalho, { flex: 1, marginLeft: 55 }]}>TIME</Text>
        <Text style={[styles.labelCabecalho, { width: 80, textAlign: 'right' }]}>PLACARES</Text>
      </View>

      <FlatList
        data={classificacao}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010A13' },
  headerPagina: { padding: 20, backgroundColor: '#091428', borderBottomWidth: 2, borderBottomColor: '#C89B3C', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#F0E6D2' },
  subtitulo: { fontSize: 14, color: '#A09B8C', marginTop: 5 },
  cabecalhoTabela: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#1E2328', borderBottomWidth: 1, borderBottomColor: '#3C3C41' },
  labelCabecalho: { color: '#A09B8C', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  linhaTabela: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1E2328' },
  posicaoContainer: { width: 30, alignItems: 'center' },
  textoPosicao: { color: '#F0E6D2', fontSize: 16, fontWeight: 'bold' },
  textoPlayoffs: { color: '#C89B3C' },
  fundoLogo: { backgroundColor: '#fff', borderRadius: 20, padding: 2, marginLeft: 15 },
  logoTime: { width: 35, height: 35, borderRadius: 17.5 },
  infoTime: { flex: 1, marginLeft: 15 },
  nomeTime: { color: '#F0E6D2', fontSize: 16, fontWeight: 'bold' },
  pontuacaoContainer: { flexDirection: 'row', width: 80, justifyContent: 'flex-end' },
  textoVitoria: { color: '#0AC8B9', fontWeight: 'bold', marginRight: 10 },
  textoDerrota: { color: '#EF3E33', fontWeight: 'bold' },
});