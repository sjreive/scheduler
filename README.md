# Interview Scheduler

This React Application allows a user to book, cancel and edit 1-hour interview appointments for the week. The user can select the day of the week on the navagation menu, create a new apppointment in an empty timeslot, enter the name of the client and select an interviewer from a list of interivers that are available on the selected day. The user is also able to see how many available spots are left on any given day.

![Creating a new Appointment](https://media.giphy.com/media/h3tf9iklDN21eVtDcH/giphy.gif)

Use of API & Websockets allow all clients to see schedule changes in real-time.

Tech Stack:

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library

In order to run this application locally, it is also necessary to clone & install the api server, for which the repo & instructions are located [HERE](https://github.com/sjreive/scheduler-api)

Express is the basis for the Scheduler API server application. Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## INSTRUCTIONS:

### Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

## DEMO of Application Features:

Toggling Days & editing and existing interview:

![Toggling Days & Editing an existing appointment](https://media.giphy.com/media/hPqdWtL5RePshTuNba/giphy.gif)

Responsive Design, data updates to Clients in Real-Time:

![Live updates to data](https://media.giphy.com/media/jSECWP0hte9JTH8vHf/giphy.gif)

Error Handling:

![Live updates to data](https://media.giphy.com/media/jVU7UaH3qaCv3ZA11S/giphy.gif)

## Dev Dependencies:

    @babel/core": "^7.4.3",
    @storybook/addon-actions": "^5.0.10",
    @storybook/addon-backgrounds": "^5.0.10",
    @storybook/addon-links": "^5.0.10",
    @storybook/addons": "^5.0.10",
    @storybook/react": "^5.0.10",
    @testing-library/jest-dom": "^4.0.0",
    @testing-library/react": "^8.0.7",
    @testing-library/react-hooks": "^1.1.0",
    babel-loader": "^8.0.5",
    node-sass": "^4.11.0",
    prop-types": "^15.7.2"

## BUGS/Additional Issues to Resolve :

- If two Clients open the "Create Appointment" view in the same timeslot, and one client submits their information first, the second client should get an error when they try to submit; right now, they are redirected to the "Saving" view, and then the first clients' information appears in the timeslot
