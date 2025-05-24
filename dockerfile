# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar el package.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs .
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Exponer el puerto que usará el servidor
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.mjs"]
