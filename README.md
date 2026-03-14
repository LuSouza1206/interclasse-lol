Interclasse Digital - LoL Edition 

Projeto desenvolvido para o Checkpoint de Mobile App Development. O aplicativo é um hub completo para torcedores de League of Legends, focado na liga LTA Sul, com funcionalidades de personalização, acompanhamento de jogos e gestão de dados locais.

---

Integrantes
- Kaio Vinicius Meireles Alves - RM553282
- Lucas Alves de Souza - RM553956

---

Demonstração do Projeto
Assista ao vídeo de apresentação do aplicativo e explicação do código:
[Clique aqui para assistir ao vídeo no YouTube/Drive](COLE_O_LINK_DO_SEU_VIDEO_AQUI)

---

Telas do Aplicativo
Abaixo estão as capturas de tela das principais funcionalidades do aplicativo:

![Tela de Perfil]

![Calendário]

![Tabela]

![Detalhes do Time]


---

Testes de API (Postman / Insomnia)
Evidências dos testes de requisições realizados durante a construção inicial do projeto:

*(Arraste as imagens dos prints de teste para cá)*
![Teste GET](COLE_O_LINK_DA_IMAGEM_AQUI)
![Teste POST](COLE_O_LINK_DA_IMAGEM_AQUI)

---

Tecnologias Utilizadas
* React Native / Expo: Framework base do projeto.
* React Navigation: Navegação por abas (Bottom Tabs) e em pilha (Stack Navigator).
* Async Storage: Persistência de dados locais do dispositivo.
* Expo Vector Icons: Iconografia dinâmica do app.

---

Funcionalidades e Requisitos Técnicos

1. Perfil do Usuário (Persistência)
* Customização: Alteração de Nome de Invocador, escolha de Jogador Favorito e Time Favorito via Modais interativos.
* Foto de Perfil: Seleção de ícones clássicos do LoL (Poros, Pinguins, etc.).
* AsyncStorage: Todos os dados do perfil (incluindo a preferência de notificações via Switch) são salvos localmente e permanecem mesmo após o app ser fechado.

2. Calendário de Jogos
* Exibição das rodadas com horários, times e locais.
* Sistema de Lembrete Ativo que utiliza AsyncStorage para salvar e destacar as partidas que o usuário favoritou para acompanhar.

3. Tabela de Classificação
* Lista dinâmica com a pontuação da temporada regular e simulação de resultados.
* Destaque visual (Dourado) para os times na zona de classificação (Top 4 - Playoffs).

4. Gestão de Times (Navegação em Pilha)
* Stack Navigation: Transição fluida entre a lista geral de times da LTA Sul e a tela de detalhes específicos da organização.
* Detalhamento Local: Renderização do elenco oficial atualizado e história da equipe utilizando dados locais, garantindo carregamento instantâneo e offline.
* Tratamento Visual: Implementação de `ActivityIndicator` (Loading) para simular busca de dados e melhorar a experiência do usuário (UX).

---

Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/LuSouza1206/interclasse-lol.git](https://github.com/LuSouza1206/interclasse-lol.git)
