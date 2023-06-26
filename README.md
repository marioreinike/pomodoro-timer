# Pomodoro Timer
Author: Mario Reinike

-------------------------

Pomodoro Timer is a web app that allows you to have an interactive pomodoro timer, in which
you can set up work, short break and long break timers. Also, if you log in, you can save and
see your pomodoro history.

## How to launch app

### Frontend
The frontend is a ReactJS app built in typescript using create-react-app. To try the app, first you
need to frontend directory, install dependencies, and then run the development script:

```bash
yarn install
yarn start
```

### Backend
The backend is built in typescript, using KoaJS for routing middlewares and Sequelize as ORM.
To try the app, you have to go to backend directory, install dependencies, and then run the
development script:
```bash
yarn install
yarn dev
```

## Assumptions

1. To track the user's data, it is necessary to identify them with just a username and a password.
To simplify things it will be saved just in database, and users cannot recover password.

2. In the Pomodoro history there will be stored the date and the amount of minutes that the user
used the pomodoro timer.
