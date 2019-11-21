## Project setup

```
yarn install
```

### Set API URL at file `/src/config.ts`:

```
API_ROOT: 'http://localhost:8000/api/v1',
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).




## Docker

```
docker build -t client-vuejs:latest .
docker run -p 80:80 client-vuejs:latest
```
