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
development script (using docker):
```bash
docker compose up -d --build
```

## Assumptions

1. To track the user's data, it is necessary to identify them with just a username and a password.
To simplify things, the history will not have Users and authentication, and it will save all the
data in one table.

2. In the Pomodoro history there will be stored the date, the amount of minutes that the user
used the pomodoro timer, and the amount of pomodoro cycles.

## Improvements
1. To improve user experience, it should be better to use authentication.

2. It is possible to save the user's settings in local storage for data persistence

3. Due to lack of time, the History does not reload when user saves the current session. It is possible
to achive this using an app context and dispatching a re-render when this event is triggered.
