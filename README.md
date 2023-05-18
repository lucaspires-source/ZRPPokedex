# Full Stack Pokedex
Full Stack application that consumes the [pokeApi](https://pokeapi.co/)
## Stack

**Front-end:** Next.js, Sass

**Back-end:** Node, Express, Axios

## How to Get Started
First clone this repository and then run the following commands inside the respective directory: 
## To Run the server:
First run on **/server**
```bash
npm install
```
then
```bash
npm start
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.


## To Run the client side:
First run on **/client**

```bash
npm install
```
Then
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser


## Docker Image
If you want, you can run the server in a Docker container using the following Docker Images [server](https://hub.docker.com/r/lucasrpires94/pokeapi)
[client](https://hub.docker.com/r/lucasrpires94/pokedex-client)

or using the following commands

```bash
 docker pull lucasrpires94/pokeapi:1.2
```

```bash
docker pull lucasrpires94/pokedex-client:1.2
```

## Roadmap
A few ideias on how to improve this current implementation

### Front End
- Upgrade to Version 13 of Next.js,some of the new features will be very useful.
- Create tests for the client side too, using [Cypress](https://www.cypress.io/) for Component testing.
- Refactor the css files to make it lighter.
- Add animations, my sugestions would be using [Framer Motion].(https://www.framer.com/motion/)


### Back End
- Create a new service to act as middleware for the function that calls all the pokemon from the api.
- Improve the **sortAbilitiesByAlphabeticalOrder** util , to accept a other values or different types of sorting.
- Deploy into a server so it can be acessed globaly.


### Docker
-  Integrate both docker containers using Docker Compose.

### CI/CD
- Install and config [Eslint](https://eslint.org/) into this project
- Integrate some git hooks into the project using [husky](https://github.com/typicode/husky), use it to enforce the Eslint pattern into future commits.
- Config Github actions to run the applications test and use it as a
requirement for the upcoming Pull Request to be approved.
- When both Docker Images are okay and running we should integrate them into the project, by providing Automatic Deployment using Docker and GitHub Actions, just like described in the following [article].(https://dev.to/fabiancdng/automatic-deployment-using-docker-and-github-actions-16fb)

### React Native
- A Mobile version of this application should be constructed, i beliebe using React Native would be the preferred route for the moment.