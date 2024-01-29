# Usa una imagen base de Node.js 20.10
FROM node:20.10

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Expón el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
