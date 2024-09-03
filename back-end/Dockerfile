# Utiliser une image PHP avec les extensions nécessaires pour Laravel
FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libsqlite3-dev \
    zip \
    unzip

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www

# Copier les fichiers du backend dans le conteneur
COPY . .

# Installer les dépendances PHP
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Changer les permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exposer le port 8000 et démarrer PHP-FPM
EXPOSE 8000
CMD ["php-fpm"]