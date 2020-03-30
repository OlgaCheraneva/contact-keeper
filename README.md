# Contact Keeper

Приложение для управления контактами.

Построено на стеке технологий MERN.  

Использует React hooks и context для управления состоянием и JSON Web Token'ы для аутентификации.

## Использование

Установка зависимостей

```bash
npm install
cd client
npm install
```

### Установка соединения с Mongo

Измените файл /config/default.json, добавив корректный MongoDB URI

### Запуск сервера

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```
