# todo

### por Caio Perroni, para bolttech

#### em node, com Express e React

<hr>
## 1. Run locally

### 1.1 Pre reqs:

- Node.js (https://nodejs.org/en/) and npm.

### 1.2 Run api (with Swagger):

```console
  cd api
  npm i
  npm start
```

- expected:

```console
[todo-api] listening on port::3001

Swagger available on http://localhost:3001

---------------------------------------------------
LOGS:
```

### 1.3 Run ui:

```console
  cd ../ui
  npm i
  npm start
```

- expected:

```console
You can now view ui in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.24.64.1:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

### 1.3 Data:

- no db used, but json. Available on 'api/data' if there's some.

### 1.3 Build and run:

- you can also build and run your image. For api:

```console
  cd api
  npm run build # creates /dist
  npm run dev # run src, but with node, no watch mode.
  npm run prod # build and run /dist image
```

- For ui, default react scripts to build and run besides npm start. Just a layer of bash to control .env

## 2. Run Stack on Docker, with docker-compose

- There are Dockerfiles with Alpine setups and a docker-compose.yml file. Run on root:

```console
 # requires docker and docker-compose.

 # Build with docker flag (!):
 cd api && npm run build -- docker
 cd ui && npm run build -- docker

 # Run compose on root:
  docker-compose up -d
```

- expected:

```console

# you can see ui.localhost, api.localhost and monitor.localhost for more.

[+] Running 5/5
 - Container ui         Started                                                                                           1.3s
 - Container portainer  Started                                                                                           1.7s
 - Container whoami     Started                                                                                           1.8s
 - Container traefik    Started                                                                                           1.4s
 - Container api        Started                                                                                           0.9s
```
