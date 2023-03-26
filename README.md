## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

- The system have two types of users: regular users and admins.
- Admin can be created in the server.ts file with name, email and password.
- Regular users can register in register form and then login to system.
- When a user clicks on a card, there is opening a popup, which shows information about the card - title, owner name, attached files.
- Users can drag and drop cards between columns, delete card, upload and delete files only in the cards created by himself.
- Admin can do all actions on all cards.
- All users can download files from all cards.

- There are written unit tests with Jest in Node JS for auth.router, column.router and card.router endpoints.

## Technologies

- TypeScript
- React JS
- Redux Toolkit
- Node JS
- MySQL
- SASS
- Jest

## Setup

To run this project install it locally using npm:

```
$ cd ../client
$ npm install
$ npm start

```

```
$ cd ../server
$ npm install
$ npm run dev

DB configs are in .env_example file

```
