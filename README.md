# Interclasse Digital - LTA Sul (LoL Edition) 🎮

Projeto desenvolvido para o Checkpoint de **Mobile App Development** na FIAP. O aplicativo é um hub completo para torcedores de League of Legends, focado na liga LTA Sul, com funcionalidades de personalização, acompanhamento de jogos e integração com APIs.

---

## 👥 Integrantes
* **Nome:** [SEU NOME AQUI] - **RM:** [SEU RM AQUI]

---

## 🚀 Tecnologias Utilizadas
* **React Native / Expo:** Framework base do projeto.
* **React Navigation:** Navegação por abas (Bottom Tabs).
* **Axios:** Integração com APIs REST (GET e POST).
* **Async Storage:** Persistência de dados locais do usuário.
* **Expo Vector Icons:** Iconografia do app.

---

## 🛠️ Funcionalidades e Requisitos Técnicos

### 1. Perfil do Usuário (Persistência)
* **Customização:** Alteração de Nome de Invocador, escolha de Jogador Favorito e Time Favorito via Modais.
* **Foto de Perfil:** Seleção de ícones clássicos do LoL.
* **AsyncStorage:** Todos os dados do perfil (incluindo a preferência de notificações) são salvos localmente e permanecem mesmo após fechar o app.

### 2. Calendário de Jogos
* Exibição das rodadas com horários e locais.
* Sistema de **Lembrete Ativo** que utiliza AsyncStorage para salvar as partidas que o usuário deseja acompanhar.

### 3. Tabela de Classificação
* Lista dinâmica com a pontuação da temporada regular.
* Destaque visual (Dourado) para os times na zona de classificação (Playoffs).

### 4. Gestão de Times (Integração API)
* **GET:** Consumo de API real (`reqres.in`) para listar a line-up/staff do time.
* **POST 1:** Formulário de recrutamento de novos torcedores/integrantes.
* **POST 2:** Sistema de sugestão de novos Coaches para a equipe.
* **Tratamento de Erros:** Implementação de `ActivityIndicator` para carregamento e dados de backup (Fallback) em caso de falha na conexão.

---

## 📦 Como rodar o projeto
1. Clone o repositório:
   ```bash
   git clone [https://github.com/LuSouza1206/interclasse-lol.git](https://github.com/LuSouza1206/interclasse-lol.git)
