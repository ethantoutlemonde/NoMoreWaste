# Utiliser une image Node.js pour construire l'application
FROM node:18 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du back-office dans le conteneur
COPY . .

# Installer les dépendances et construire l'application
RUN npm install
RUN npm run build

# Utiliser une image nginx pour servir l'application construite
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 3000
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]