# Etapa de construcción
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:16

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js .

# Instalar express
RUN npm install express

# Exponer el puerto que usará el servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
