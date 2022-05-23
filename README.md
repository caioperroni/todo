# 📝 TODO List

<div style="display: flex">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
<img src="https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white" />
</div>
por Caio Perroni, para Bolttech

<hr>

## 💻 Run locally

### 1 Pre reqs:

- Node.js (https://nodejs.org/en/)
- npm (https://www.npmjs.com/)

<hr>

### 2 Run api (with Swagger):

```bash
  cd api # root/api
  npm i
  npm start
```

- expected:

```bash
# [todo-api] listening on port::3001
#
# Swagger available on http://localhost:3001
#
# ---------------------------------------------------
# LOGS:
```

<hr>

### 3 Run ui:

```bash
  cd ui # root/ui
  npm i
  npm start
```

- expected:

```bash
# You can now view ui in the browser.
#
#  Local:            http://localhost:3000
#  On Your Network:  http://172.24.64.1:3000
#
# Note that the development build is not optimized.
# To create a production build, use npm run build.
#
# webpack compiled successfully
```

<hr>

### 4 Data:

- no db used, but json. Available on 'api/data' if there's some.

<hr>

### 5 Build and run:

- you can also build and run your image. For api:

```bash
  cd api # root/api
  npm run build # creates /dist
  npm run dev # run src, but with node, no watch mode.
  npm run prod # build and run /dist image
```

- For ui, default react scripts to build and run besides npm start. Just a layer of bash to control .env

```bash
  cd ui # root/ui
  npm run <command>
  #  "start": "bash build.bash start",
  #  "build": "bash build.bash build",
  #  "test": "react-scripts test",
  #  "eject": "react-scripts eject"
```

<hr>

## 🚀 Run Stack on Docker, with docker-compose

- There are Dockerfiles with Alpine setups and a docker-compose.yml file. Run on root:

### 1 Pre reqs:

- Docker (https://docker.com/)
- Docker Compose (https://docs.docker.com/compose/)

<hr>

### 2. Build with docker flag:

```bash
 # on root
 ./docker.sh

 # or
 cd api && npm run build -- docker
 cd ui && npm run build -- docker
```

<hr>

### 3. Run Docker Compose:

```bash
 # on root
 docker-compose up -d
```

- expected:

```bash

# you can see ui.localhost, api.localhost and monitor.localhost for more.


# [+] Running 5/5
# - Container ui         Started                                                                                           1.3s
# - Container portainer  Started                                                                                           1.7s
# - Container whoami     Started                                                                                           1.8s
# - Container traefik    Started                                                                                           1.4s
# - Container api        Started                                                                                           0.9s
```
