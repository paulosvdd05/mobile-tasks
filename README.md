# TesteTecnico

Aplicativo React Native com Expo para o teste técnico mobile.

## Stack

- Expo SDK 54
- React Native
- React Navigation
- Redux Toolkit
- AsyncStorage
- Axios

## Escopo atual

- Tela de onboarding
- Tela única de login e cadastro
- Persistência local da sessão
- Tela pós-login simples
- Tela de perfil placeholder com deep link em `/perfil`
- Tema automático conforme o tema do dispositivo

## Como rodar

1. Instale as dependências:

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

## API

- Base URL: `https://api-teste-mobile.fly.dev`
- Documentação: `https://api-teste-mobile.fly.dev/openapi`

## Deep link

O app já está configurado com esquema `testetecnico` e rota `/perfil`.

Exemplos:

- `testetecnico://perfil`
- `exp://SEU-IP:8081/--/perfil`

## Observações

- O projeto está em Expo SDK 54 para compatibilidade com a versão atual do Expo Go.
- A identidade visual atual usa a paleta neutra + roxo fornecida no material do design.
- A parte de tarefas e o fluxo offline-first ainda serão evoluídos nas próximas etapas.
