## STARTING
- npm install
- npm install -g sequelize-cli (если нет sequelize)
- sequelize db:created
- sequelize db:migrate
- sequelize db:seed:all
- nodemon app (чтобы запустить server)

## List of APIs
Регистрация пользователя
```http
  POST /user/register
```

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email`    | `string` | **обязательно**. email  |
| `password` | `string` | **обязательно**. password |
| `name` | `string` | **обязательно**. Name |

Авторизация пользователя
```http
  POST /user/login
```

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email` | `string` | **обязательно**. Login email |
| `password` | `string` | **обязательно**. Login password |

Редактирование пользователя 
```http
  PUT /profile/:id 
  ***Ex: profile/12***

  -обязательно пройти авторизацию
  -Редактировать строго только свой профил
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **обязательно**. ваш access_token |

| Params  | Type     | Description                  |
| :----- | :------- | :--------------------------- |
| `id` | `integer` | **Required**. id пользователя |

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email` | `string` | email |
| `name` | `string` | name |
| `lastName` | `string` | last name |
| `gender` | `string` | password |

| File       | Type     
| :--------- | :------- 
| `upload` | `png/jpg` 

Получение пользователя
```http
  GET /profile/:id 
  ***Ex: profile/12***

  -обязательно пройти авторизацию
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Params  | Type     | Description                  |
| :----- | :------- | :--------------------------- |
| `id` | `integer` | **Required**. id пользователя |


Получение всех пользователей с пагинацией
```http
  GET /profiles?page=page
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Query  | Type     | Description                  |
| :----- | :------- | :--------------------------- |
| `page` | `integer` | **Required**. page |


