# Инструкция по экспорту и развертыванию на VPS (Frontend + Backend + SQLite)

Данное руководство описывает развертывание приложения **DevOps Academy Student Portal** на вашем VPS (Ubuntu 22.04 / 24.04 или Debian).

> **Сетевая конфигурация (Port 3002)**:  
> База данных SQLite, REST API и веб-интерфейс запущены на порту **3002**.  
> Проксирование Nginx и правила фаервола настраиваются для порта **3002**.

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
