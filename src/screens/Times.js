import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';

export default function Times() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para os formulários POST
  const [nomeTorcedor, setNomeTorcedor] = useState('');
  const [sugestaoCoach, setSugestaoCoach] = useState('');

  // 1. Integração GET: Busca dados da API ReqRes
  useEffect(() => {
    const buscarJogadores = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://reqres.in/api/users?page=1', { 
          timeout: 10000,
          headers: { 'Accept': 'application/json' }
        });

        if (response.data && response.data.data) {
          setJogadores(response.data.data);
        }
      } catch (error) {
        console.error("Erro na API:", error);
        // DADOS DE BACKUP: Se a API falhar, o app mostra a line da paiN para não ficar vazio
        setJogadores([
          { id: 10, first_name: "Robo", avatar: "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png", email: "top@pain.gg" },
          { id: 11, first_name: "Cariok", avatar: "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png", email: "jungle@pain.gg" },
          { id: 12, first_name: "Tinowns", avatar: "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png", email: "mid@pain.gg" },
          { id: 13, first_name: "Trigger", avatar: "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png", email: "adc@pain.gg" },
          { id: 14, first_name: "Kuri", avatar: "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/588.png", email: "sup@pain.gg" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    buscarJogadores();
  }, []);

  // 2. Integração POST 1: Recrutamento
  const realizarPostTorcedor = async () => {
    if (!nomeTorcedor) return alert('Digite o nome!');
    try {
      const res = await axios.post('https://reqres.in/api/users', { name: nomeTorcedor, team: "paiN" });
      alert(`Sucesso! Torcedor ${nomeTorcedor} registrado com ID: ${res.data.id}`);
      setNomeTorcedor('');
    } catch (e) { alert('Erro no POST 1'); }
  };

  // 3. Integração POST 2: Sugestão de Coach
  const realizarPostCoach = async () => {
    if (!sugestaoCoach) return alert('Digite a sugestão!');
    try {
      const res = await axios.post('https://reqres.in/api/users', { coach: sugestaoCoach });
      alert(`Sugestão enviada! Protocolo: ${res.data.id}`);
      setSugestaoCoach('');
    } catch (e) { alert('Erro no POST 2'); }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Staff & Line-up</Text>
        <Text style={styles.subtitulo}>Conexão Axios API</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Jogadores (API GET):</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#C89B3C" />
        ) : (
          <FlatList
            horizontal
            data={jogadores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardJogador}>
                <Image source={{ uri: item.avatar }} style={styles.fotoJogador} />
                <Text style={styles.nomeJogador}>{item.first_name}</Text>
                <Text style={styles.emailJogador}>{item.email}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Recrutar para a paiN (POST 1):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do integrante" 
          placeholderTextColor="#888"
          value={nomeTorcedor}
          onChangeText={setNomeTorcedor}
        />
        <TouchableOpacity style={styles.botao} onPress={realizarPostTorcedor}>
          <Text style={styles.textoBotao}>RECRUTAR</Text>
        </TouchableOpacity>

        <Text style={[styles.label, {marginTop: 25}]}>Sugerir Novo Coach (POST 2):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Xico, Maestro..." 
          placeholderTextColor="#888"
          value={sugestaoCoach}
          onChangeText={setSugestaoCoach}
        />
        <TouchableOpacity style={[styles.botao, {borderColor: '#0AC8B9'}]} onPress={realizarPostCoach}>
          <Text style={[styles.textoBotao, {color: '#0AC8B9'}]}>ENVIAR SUGESTÃO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010A13' },
  header: { padding: 30, backgroundColor: '#091428', borderBottomWidth: 2, borderBottomColor: '#C89B3C', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#F0E6D2' },
  subtitulo: { fontSize: 14, color: '#A09B8C', marginTop: 5 },
  secao: { padding: 20 },
  label: { color: '#C89B3C', fontSize: 14, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase' },
  cardJogador: { alignItems: 'center', marginRight: 15, backgroundColor: '#1E2328', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#3C3C41', width: 140 },
  fotoJogador: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, borderWidth: 2, borderColor: '#C89B3C', backgroundColor: '#fff' },
  nomeJogador: { color: '#F0E6D2', fontSize: 16, fontWeight: 'bold' },
  emailJogador: { color: '#A09B8C', fontSize: 10, marginTop: 4 },
  input: { backgroundColor: '#1E2328', borderWidth: 1, borderColor: '#3C3C41', color: '#F0E6D2', padding: 15, borderRadius: 5, marginBottom: 10 },
  botao: { borderWidth: 2, borderColor: '#C89B3C', padding: 15, borderRadius: 5, alignItems: 'center' },
  textoBotao: { color: '#C89B3C', fontWeight: 'bold' }
});