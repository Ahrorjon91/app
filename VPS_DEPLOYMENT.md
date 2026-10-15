# Инструкция по экспорту и развертыванию на VPS (Frontend + Backend + SQLite)

Данное руководство описывает развертывание приложения **DevOps Academy Student Portal** на вашем VPS (Ubuntu 22.04 / 24.04 или Debian) через **Dokploy**, **Docker Compose**, **Node.js PM2**, **Nginx** или **Apache**.

---

## 🚀 Решение ошибки «405 Method Not Allowed» в Dokploy (Hostinger VPS)

Если при авторизации на домене `https://ai.devopspro.tech/` вы получаете:
```text
Request URL: https://ai.devopspro.tech/ai/api/auth/login
Request method: POST
Status code: 405 Method Not Allowed
```

### Причины ошибки:
1. **Главная причина (Dokploy "Static" mode)**: В Dokploy проект был добавлен с типом **Static** (статический сайт Nginx). Статический сервер Nginx отдает HTML/JS, но серверная часть Node.js/Express (`server.ts`) **вообще не запускается**. Когда браузер отправляет `POST /api/auth/login`, Nginx на статических файлах не поддерживает метод POST и возвращает `405 Method Not Allowed`.
2. **Неверный порт в Dokploy**: Сервер слушает порт `3000`. Если в Dokploy указан порт `80` или `3002`, трафик не доходит до Express.
3. **Путь API (`/ai/api` vs `/api`)**: Префикс `/ai/api` использовался для подпапок. Теперь приложение автоматически определяет домен: на `ai.devopspro.tech` запросы идут на `/api/auth/login`, а в случае ответа 405/404 автоматически переключается между `/api` и `/ai/api`.

---

### Пошаговое исправление в панели Dokploy:

1. **Откройте Dokploy**: перейдите в ваш проект и выберите приложение (Application).
2. **Вкладка General**:
   - **Build Type**: выберите **`Dockerfile`** (в коде уже создан готовый `Dockerfile`) или **`Nixpacks`**. *Ни в коем случае не выбирайте `Static`!*
   - Если выбран **Dockerfile**: Dokploy автоматически соберет проект через `Dockerfile`, выполнит `npm run build` и запустит сервер `server.ts`.
3. **Вкладка Environment Variables**:
   Добавьте переменные:
   ```env
   NODE_ENV=production
   PORT=3000
   VITE_API_BASE_PATH=/api
   ```
4. **Вкладка Domains (Traefik)**:
   - **Host**: `ai.devopspro.tech`
   - **Port**: `3000` *(обязательно укажите 3000, не 80!)*
   - **Path**: оставьте пустым или укажите `/`
   - **HTTPS / SSL**: включите Let's Encrypt сертификат.
5. **Вкладка Volumes (Сохранение базы SQLite)**:
   Добавьте том для сохранения базы данных при перезапусках:
   - **Host Path**: `devops_academy_data` (или `/var/lib/dokploy/volumes/devops_academy_data`)
   - **Container Path**: `/app/data`
6. Нажмите **Deploy** (или **Redeploy**).

---

## Вариант 1: Развертывание через Docker Compose (Рекомендуемый)

Убедитесь, что на сервере установлены Docker и Docker Compose.

1. **Скопируйте проект на VPS** (через Git или rsync/scp):
   ```bash
   git clone <URL_РЕПОЗИТОРИЯ> /opt/devops-portal
   cd /opt/devops-portal
   ```

2. **Запустите контейнер в фоновом режиме**:
   ```bash
   docker compose up -d --build
   ```

3. **Проверьте статус работы**:
   ```bash
   docker compose ps
   curl http://localhost:3002/health
   ```

> База данных SQLite сохраняется на диске хоста в папку `./data/devops_portal.sqlite` и не стирается при перезапусках контейнера.

---

## Вариант 2: Прямой запуск через Node.js 22 + PM2

1. **Установите Node.js 22 LTS**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Установите зависимости и соберите Frontend**:
   ```bash
   npm install
   npm run build
   ```

3. **Запустите через PM2 (демон процессов)**:
   ```bash
   sudo npm install -g pm2
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

4. **Проверка работоспособности**:
   ```bash
   pm2 status
   curl http://localhost:3002/health
   ```

---

## Настройка Nginx (Reverse Proxy & SSL Let's Encrypt)

Создайте конфигурацию в `/etc/nginx/sites-available/devops-portal`:

```nginx
server {
    listen 80;
    server_name portal.yourdomain.com; # Укажите ваш домен или IP

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируйте сайт и выпустите SSL сертификат:
```bash
sudo ln -s /etc/nginx/sites-available/devops-portal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Установка бесплатного SSL
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d portal.yourdomain.com
```

---

## Настройка Apache (Reverse Proxy для Порта 3002 и пути /ai/api)

Так как порты 3000 и 3001 заняты другими PM2 сервисами, данный портал настроен на порт **3002** и использует путь API **`/ai/api`**.

1. **Включите необходимые модули Apache**:
```bash
sudo a2enmod proxy proxy_http proxy_wstunnel rewrite headers ssl
sudo systemctl restart apache2
```

2. **Создайте конфигурацию VirtualHost в `/etc/apache2/sites-available/devops-portal.conf`**:

```apache
<VirtualHost *:80>
    ServerName portal.yourdomain.com
    # Или используйте IP: ServerName 123.45.67.89

    ProxyPreserveHost On
    ProxyRequests Off

    # Проксирование API запросов (/ai/api -> http://127.0.0.1:3002/ai/api/)
    ProxyPass /ai/api http://127.0.0.1:3002/ai/api
    ProxyPassReverse /ai/api http://127.0.0.1:3002/ai/api

    # Проксирование статических файлов и интерфейса
    ProxyPass / http://127.0.0.1:3002/
    ProxyPassReverse / http://127.0.0.1:3002/

    # Поддержка WebSocket (если используется)
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:3002/$1" [P,L]

    ErrorLog ${APACHE_LOG_DIR}/portal_error.log
    CustomLog ${APACHE_LOG_DIR}/portal_access.log combined
</VirtualHost>
```

> **Если вы используете общий хост Apache с подпутем `/ai`**:
```apache
<Location /ai/api>
    ProxyPass http://127.0.0.1:3002/ai/api
    ProxyPassReverse http://127.0.0.1:3002/ai/api
</Location>
<Location /ai>
    ProxyPass http://127.0.0.1:3002/
    ProxyPassReverse http://127.0.0.1:3002/
</Location>
```

3. **Активируйте сайт и перезапустите Apache**:
```bash
sudo a2ensite devops-portal.conf
sudo apache2ctl configtest
sudo systemctl reload apache2
```

---

## Учетные записи по умолчанию

- **Администратор**:
  - Email: `admin@devopspro.tech`
  - Пароль: `123456789`
- **Студент**:
  - Email: `student@devopspro.tech`
  - Пароль: `123456789`

База данных SQLite автоматически инициализируется при первом запуске в файле `data/devops_portal.sqlite` в режиме WAL (Write-Ahead Logging).
