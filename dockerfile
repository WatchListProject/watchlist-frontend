# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar el package.json y el archivo .env
COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar los archivos generados en la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs .

# Copiar el archivo .env a la imagen de producción
COPY .env ./

# Instalar express
RUN npm install express

# Exponer el puerto que usará el servidor
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.mjs"]
