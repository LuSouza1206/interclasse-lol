Interclasse Digital - LoL Edition 

Projeto desenvolvido para o Checkpoint de Mobile App Development. O aplicativo é um hub completo para torcedores de League of Legends, focado na liga LTA Sul, com funcionalidades de personalização, acompanhamento de jogos e gestão de dados locais.

---

Integrantes
- Kaio Vinicius Meireles Alves - RM553282
- Lucas Alves de Souza - RM553956

---

Demonstração do Projeto
Assista ao vídeo de apresentação do aplicativo e explicação do código:
https://youtu.be/hmuywE8cz9I

---

Telas do Aplicativo
Abaixo estão as capturas de tela das principais funcionalidades do aplicativo:

![Image](https://github.com/user-attachments/assets/6a0a2ce2-99a6-40a4-a203-3e6f9a080d59)

![Image](https://github.com/user-attachments/assets/0530f2f8-c371-40da-b767-e5b9c05891df)

![Image](https://github.com/user-attachments/assets/ff86f47a-74f1-4771-a69d-96788fad5ded)

![Image](https://github.com/user-attachments/assets/2d916ece-5f4e-4862-998b-e1f80630eed6)


---

Testes de API (Postman / Insomnia)
Evidências dos testes de requisições realizados durante a construção inicial do projeto:

![Image](https://github.com/user-attachments/assets/a562f8a4-ae29-4d88-90d9-c4ec489bb10b)
![Image](https://github.com/user-attachments/assets/7c82125a-6f69-46e7-be75-5ab7c4a37406)

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

4. Bilheteria e Ingressos (Integração API com Axios)
 *Consumo de API (GET): Listagem dinâmica de setores (Cadeira Inferior, Superior e VIP) e preços, consumindo dados de API externa com Axios.
*Reserva de Ingressos (POST 1): Envio de formulário com nome do torcedor e setor selecionado, simulando a reserva de assentos na Arena.
*Validação de Meia-Entrada (POST 2): Sistema de validação focado em estudantes FIAP, enviando o RM e o ID do pedido para aplicação de desconto.
*Tratamento de Dados: Implementação de try/catch para gestão de erros de rede, ActivityIndicator para feedback de carregamento e Alerts nativos para confirmação das operações.

---

Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/LuSouza1206/interclasse-lol.git](https://github.com/LuSouza1206/interclasse-lol.git)
