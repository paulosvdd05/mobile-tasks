# TesteTecnico

Aplicativo React Native com Expo para o teste tecnico mobile.

## Stack

- Expo SDK 54
- React Native
- React Navigation
- Redux Toolkit
- AsyncStorage
- Axios
- Expo Network
- React Native Gesture Handler

## Funcionalidades implementadas

- Tela de onboarding
- Fluxo de cadastro em etapas: nome, e-mail e senha
- Fluxo de login em etapas: e-mail e senha
- Dashboard de tasks
- Tela de perfil com deep link em `/perfil`
- Tema automatico conforme o tema do dispositivo
- Persistencia local da sessao
- Persistencia local das tasks
- Fluxo offline-first para tasks, com fila de sincronizacao

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm start
```

3. Rode em um dispositivo:

- Android emulator:

```bash
npm run android
```

- iPhone com Expo Go:
  Escaneie o QR code exibido no terminal.

Se quiser limpar o cache do Metro:

```bash
npx expo start -c
```

## API

- Base URL: `https://api-teste-mobile.fly.dev`
- Documentacao: `https://api-teste-mobile.fly.dev/openapi`

## Deep link

O app esta configurado com esquema `testetecnico` e rota `/perfil`.

Exemplos:

- `testetecnico://perfil`
- `exp://SEU-IP:8081/--/perfil`

## Decisoes de implementacao

- Tomei a liberdade de adicionar alguns ajustes alem do prototipo para melhorar a experiencia no fluxo de tasks e deixar a visualizacao mais clara no uso real do app.
- Quando nao existe nenhuma tarefa, o dashboard mostra uma mensagem de estado vazio. Quando apenas uma das secoes esta vazia, a interface mostra `Sem tarefas.` somente naquela secao.
- Para o sincronismo offline, alem da tentativa automatica quando a conexao volta, adicionei um fluxo de `refresh` manual para deixar a recuperacao mais intuitiva em casos de erro ou alteracoes pendentes.
- Interpretei no Figma que o botao de excluir deveria aparecer ao arrastar a task para a esquerda, entao implementei esse comportamento dessa forma.

## Observacoes

- O projeto esta em Expo SDK 54 para compatibilidade com a versao atual do Expo Go.
- O app reage ao tema claro e escuro do dispositivo.
- As tasks podem ser criadas, marcadas e excluidas offline; quando a internet volta, a sincronizacao e tentada automaticamente.
