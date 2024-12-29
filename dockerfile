# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs .

# Instalar express
RUN npm install express

# Exponer el puerto que usará el servidor
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.mjs"]
