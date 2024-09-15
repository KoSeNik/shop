# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Области хранения данных:

-   база данных на json-server
-   BFF
-   редакс стор

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль рользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
-   продукт: БД (список продуктов), стор (отображение в браузере)
-   корзина: БД (список продуктов пользователя), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registered_at / role_id
-   роли пользователей - roles: id / name
-   продукты - products: id / title / image_url / description / price / category
-   корзина - cart: id / userId / products

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для редакс сторе (на клиенте):

-   user: id / login / roleId
-   products: массив product: id / title / image / price
-   product: id / title / image / description / price / category
-   cart: id / userId / products
