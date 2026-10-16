import { CourseBlock, LessonData, LabData, ResourceDownload } from '../types';

export const SYSADMIN_COURSE_BLOCKS: CourseBlock[] = [
  {
    id: 1,
    title: 'Linux Fundamentals & Shell Navigation',
    titleRu: 'Блок 1: Архитектура Linux, Shell & Навигация (Нед. 1–2)',
    weeks: 'Недели 1–2',
    lessonRange: '№1–4',
    description: 'Архитектура дистрибутивов (Ubuntu/Rocky), SSH-подключение, FHS файловая система, права доступа (chmod/chown), управление процессами (systemd, htop) и пакетный менеджмент (APT/DNF). Проект #1: «Hardened Linux Base Server».',
    color: 'from-emerald-600 to-teal-600',
    testId: 'TEST_1',
  },
  {
    id: 2,
    title: 'Bash Scripting & Automation Routine',
    titleRu: 'Блок 2: Bash-скриптинг и автоматизация рутины (Нед. 3–4)',
    weeks: 'Недели 3–4',
    lessonRange: '№5–8',
    description: 'Программирование на Bash: переменные, условия, циклы, потоки I/O. Фильтрация grep, sed, awk. Автоматизация бэкапов с rsync/tar, планировщик Cron/systemd timers, мониторинг логов и Telegram-оповещения. Проект #2: «Auto-Backup & Health-Check Bot».',
    color: 'from-cyan-600 to-blue-600',
    testId: 'TEST_2',
  },
  {
    id: 3,
    title: 'Networking, DNS & Traffic Security',
    titleRu: 'Блок 3: Компьютерные сети, DNS & Безопасность (Нед. 5–6)',
    weeks: 'Недели 5–6',
    lessonRange: '№9–12',
    description: 'Модели OSI/TCP-IP, адресация IPv4/CIDR, сетевые утилиты ip/ss/dig/tcpdump. Настройка DNS (systemd-resolved/BIND) и DHCP. Межсетевой экран UFW/iptables, SSH security и защита от перебора паролей через Fail2ban. Проект #3: «Secure Linux Gateway & Firewall».',
    color: 'from-amber-600 to-orange-600',
    testId: 'TEST_3',
  },
  {
    id: 4,
    title: 'Web Servers, SSL & Databases',
    titleRu: 'Блок 4: Сетевые сервисы, Nginx & Базы данных (Нед. 7–8)',
    weeks: 'Недели 7–8',
    lessonRange: '№13–16',
    description: 'Веб-сервер Nginx: виртуальные хосты, reverse-proxy, балансировка нагрузки. Бесплатные SSL-сертификаты Let’s Encrypt Certbot. Администрирование PostgreSQL и MySQL, резервное копирование и оптимизация. Сетевые хранилища NFS/Samba. Проект #4: «High-Performance Web & DB Stack».',
    color: 'from-purple-600 to-violet-600',
    testId: 'TEST_4',
  },
  {
    id: 5,
    title: 'Docker Containerization & Microservices',
    titleRu: 'Блок 5: Контейнеризация Docker & Микросервисы (Нед. 9–10)',
    weeks: 'Недели 9–10',
    lessonRange: '№17–20',
    description: 'Технология контейнеризации (namespaces, cgroups). Создание production Dockerfile, multi-stage сборки. Оркестрация с Docker Compose (Web + App + DB + Redis). Сети Docker, Volumes, безопасность контейнеров. Проект #5: «Multi-Container Microservices Deployment».',
    color: 'from-rose-600 to-red-600',
    testId: 'TEST_5',
  },
  {
    id: 6,
    title: 'DevOps CI/CD, Monitoring & Production',
    titleRu: 'Блок 6: DevOps CI/CD, Мониторинг & Production (Нед. 11–12)',
    weeks: 'Недели 11–12',
    lessonRange: '№21–24',
    description: 'Контроль версий Git для инфраструктуры. Настройка CI/CD пайплайнов (GitHub Actions). Сбор метрик с Prometheus и Node Exporter, визуализация в Grafana. Финальный Capstone-проект: запуск отказоустойчивого продакшн-кластера. Проект #6: «Production Infrastructure Capstone».',
    color: 'from-emerald-700 to-teal-800',
    testId: 'TEST_6',
  },
];

export const SYSADMIN_LESSONS: LessonData[] = [
  // ==================== BLOCK 1 ====================
  {
    id: 1,
    blockId: 1,
    week: 1,
    lessonNumber: 1,
    title: 'Lesson 1: Introduction to Linux OS, Distributions & Secure SSH Connection',
    titleRu: 'Урок 1: Введение в Linux, дистрибутивы и безопасное SSH-подключение',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Архитектура Linux: ядро (Kernel), Shell, системные библиотеки и утилиты GNU. Обзор семейств дистрибутивов: Debian/Ubuntu vs RHEL/Rocky/Alma. Подключение по SSH (порт 22, протокол v2), генерация ключевой пары Ed25519/RSA, отключение входа по паролю и настройка ~/.ssh/config.',
    learningObjectives: [
      'Понимать архитектуру ядра Linux и назначение системных уровней',
      'Ориентироваться в различиях между Ubuntu Server и Rocky Linux',
      'Генерировать криптографические ключи SSH ed25519 и подключаться к VPS',
      'Настраивать файл ~/.ssh/config для быстрого входа по алиасам',
      'Базово проверять статус системы: uname -a, uptime, whoami'
    ],
    tools: ['OpenSSH', 'Bash', 'Ubuntu 24.04 LTS', 'Rocky Linux 9', 'Termius/PuTTY'],
    commands: [
      { command: 'ssh-keygen -t ed25519 -C "admin@vps"', description: 'Генерация стойкого ключа SSH нового поколения', OS: 'Linux' },
      { command: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@vps_ip', description: 'Установка публичного ключа на удаленный сервер', OS: 'Linux' },
      { command: 'ssh -i ~/.ssh/id_ed25519 user@vps_ip', description: 'Безопасное подключение к серверу по SSH-ключу', OS: 'Linux' },
      { command: 'uname -a && uptime', description: 'Вывод версии ядра Linux и времени непрерывной работы сервера', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #1: Настройка защищенного SSH-сервера с аутентификацией по ключам',
    homeworkDesc: 'Сгенерировать ключ ed25519, скопировать на VPS, запретить в sshd_config вход по паролю (PasswordAuthentication no) и root-доступ, перезапустить sshd.',
    cheatSheetMd: `# Шпаргалка: Безопасный SSH в Linux

## 1. Генерация ключей
\`\`\`bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C "admin@sysadmin"
ssh-copy-id -i ~/.ssh/id_ed25519.pub sysadmin@<SERVER_IP>
\`\`\`

## 2. Конфигурация клиента (~/.ssh/config)
\`\`\`text
Host vps-prod
    HostName 194.87.12.34
    User sysadmin
    IdentityFile ~/.ssh/id_ed25519
    Port 22
\`\`\`

## 3. Защита демона SSH (/etc/ssh/sshd_config)
\`\`\`bash
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3
\`\`\`
Перезапуск сервиса: \`sudo systemctl restart ssh\` (или \`sshd\`).`,
  },
  {
    id: 2,
    blockId: 1,
    week: 1,
    lessonNumber: 2,
    title: 'Lesson 2: Linux Filesystem Hierarchy Standard (FHS) & Permissions (chmod/chown)',
    titleRu: 'Урок 2: Иерархия файловой системы FHS, права доступа и владение файлами',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Стандарт FHS: назначение каталогов /etc, /var/log, /opt, /usr, /home, /root, /tmp. Модель прав доступа Linux: чтение (r=4), запись (w=2), выполнение (x=1) для User, Group, Others. Команды chmod, chown, chgrp, umask, специальные биты SUID, SGID и Sticky Bit (/tmp).',
    learningObjectives: [
      'Понимать назначение ключевых системных каталогов Linux FHS',
      'Вычислять и назначать права в числовой (755, 644) и символьной форме',
      'Менять владельца и группу файлов через chown/chgrp',
      'Понимать работу Sticky Bit на директориях общего доступа (/tmp)',
      'Анализировать вывод команды ls -la'
    ],
    tools: ['Bash', 'chmod', 'chown', 'umask', 'stat'],
    commands: [
      { command: 'ls -la /var/log', description: 'Просмотр прав и владельцев системных журналов', OS: 'Linux' },
      { command: 'chmod 750 /opt/myapp', description: 'Назначение прав rwxr-x--- для приложения', OS: 'Linux' },
      { command: 'chown -R www-data:www-data /var/www/html', description: 'Рекурсивная смена владельца на веб-пользователя', OS: 'Linux' },
      { command: 'chmod +t /shared_folder', description: 'Установка Sticky Bit (удалять файл может только создатель)', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #2: Настройка каталогов корпоративного проекта с разделением прав',
    homeworkDesc: 'Создать группу developers, пользователя dev1, директорию /srv/project с правами 2775 (SGID) и проверить наследование группы новыми файлами.',
    cheatSheetMd: `# Шпаргалка: Права доступа Linux

## 1. Числовые значения прав:
* **r (Read)** = 4
* **w (Write)** = 2
* **x (Execute)** = 1
* Пример: \`chmod 755 script.sh\` -> rwxr-xr-x

## 2. Специальные биты:
* **SUID (4000)**: запуск с правами владельца файла
* **SGID (2000)**: запуск с правами группы / наследование группы каталога
* **Sticky Bit (1000)**: удаление только владельцем (пример /tmp)`,
  },
  {
    id: 3,
    blockId: 1,
    week: 2,
    lessonNumber: 3,
    title: 'Lesson 3: Process Management, Memory, Storage & Systemd Service Control',
    titleRu: 'Урок 3: Управление процессами, памятью, дисками и службы Systemd',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Жизненный цикл процессов: PID, PPID, статусы (R, S, D, Z). Мониторинг ресурсов: ps aux, top, htop, free -m, vmstat, iostat. Сигналы ядра: SIGTERM (15), SIGKILL (9), SIGHUP (1). Анализ дискового пространства: df -h, du -sh. Архитектура Systemd: units, targets, управление сервисами (systemctl start/stop/enable/status/restart).',
    learningObjectives: [
      'Диагностировать нагрузку на процессор и оперативную память через htop/top',
      'Находить и безопасно завершать зависшие процессы через kill/pkill',
      'Анализировать занятое дисковое пространство утилитами df и du',
      'Управлять демонами через systemctl и анализировать логи unit-файлов'
    ],
    tools: ['systemd', 'htop', 'ps', 'kill', 'df', 'du', 'journalctl'],
    commands: [
      { command: 'htop', description: 'Интерактивный монитор процессов и нагрузки CPU/RAM', OS: 'Linux' },
      { command: 'df -hT && free -h', description: 'Проверка свободного места на разделах и доступной RAM', OS: 'Linux' },
      { command: 'systemctl status nginx', description: 'Проверка рабочего статуса системной службы Nginx', OS: 'Linux' },
      { command: 'du -sh /var/* | sort -hr | head -n 5', description: 'Поиск 5 самых тяжелых каталогов в /var', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #3: Написание собственного Systemd Service Unit',
    homeworkDesc: 'Написать unit-файл /etc/systemd/system/app-monitor.service для фонового скрипта с автоперезапуском (Restart=always) и включить автозагрузку.',
    cheatSheetMd: `# Шпаргалка: Systemd & Процессы

\`\`\`bash
# Управление службой
sudo systemctl daemon-reload
sudo systemctl enable --now nginx
sudo systemctl restart nginx
sudo systemctl status nginx

# Диагностика дисков и памяти
df -h
du -sh /var/log/* | sort -rh | head -10
free -m
\`\`\``,
  },
  {
    id: 4,
    blockId: 1,
    week: 2,
    lessonNumber: 4,
    title: 'Lesson 4: Package Management (APT, DNF), Repositories, PPA & Linux Hardening',
    titleRu: 'Урок 4: Пакетный менеджмент (APT/DNF), репозитории и базовая безопасность',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Пакетные менеджеры: APT (Debian/Ubuntu) и DNF/YUM (RHEL/Rocky/Fedora). Структура /etc/apt/sources.list, GPG-ключи репозиториев, проверка контрольных сумм. Обновление безопасности: unattended-upgrades. Настройка sudoers, ограничение прав суперпользователя и аудит открытых портов (ss -tulpn).',
    learningObjectives: [
      'Устанавливать, обновлять и удалять пакеты через apt-get и dnf',
      'Подключать сторонние репозитории с валидацией GPG-ключей',
      'Настраивать файл /etc/sudoers через visudo с ограничением команд',
      'Проверять слушающие порты на сервере утилитами ss и netstat'
    ],
    tools: ['apt', 'dpkg', 'dnf', 'visudo', 'ss', 'unattended-upgrades'],
    commands: [
      { command: 'sudo apt update && sudo apt upgrade -y', description: 'Обновление списков пакетов и установка обновлений безопасности', OS: 'Linux' },
      { command: 'ss -tulpn', description: 'Вывод всех открытых сетевых портов и процессов, слушающих трафик', OS: 'Linux' },
      { command: 'sudo visudo', description: 'Безопасное редактирование прав sudo без риска поломки синтаксиса', OS: 'Linux' },
      { command: 'dpkg -l | grep -i nginx', description: 'Проверка установленной версии пакета в системе', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #4: Полный Hardening аудит сервера перед выпуском в сеть',
    homeworkDesc: 'Настроить автоматические security-патчи unattended-upgrades, отключить неиспользуемые службы, создать sudo-пользователя без пароля для определенных утилит.',
    cheatSheetMd: `# Шпаргалка: Управление пакетами и безопасность

\`\`\`bash
# APT
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git htop
sudo apt autoremove --purge

# Проверка портов
sudo ss -tulpn | grep LISTEN
\`\`\``,
  },

  // ==================== BLOCK 2 ====================
  {
    id: 5,
    blockId: 2,
    week: 3,
    lessonNumber: 5,
    title: 'Lesson 5: Bash Scripting Core: Variables, Conditions, Loops & Arguments',
    titleRu: 'Урок 5: Основы Bash: переменные, условия if/else, циклы и позиционные параметры',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Shebang #!/bin/bash, права выполнения. Системные и пользовательские переменные, кавычки (одинарные vs двойные), подстановка команд $(cmd). Позиционные параметры $1, $2, $#, $@. Условные операторы [[ -f file ]], [[ -z str ]], if-elif-else. Циклы for, while, until. Коды возврата $? и обработка ошибок (set -euo pipefail).',
    learningObjectives: [
      'Писать скрипты автоматизации с правильным Shebang и флагами безопасности set -e',
      'Использовать условия для проверки файлов, директорий и переменных',
      'Итерироваться по спискам, файлам и диапазонам с помощью циклов for и while',
      'Обрабатывать входящие аргументы командной строки в скрипте'
    ],
    tools: ['Bash', 'Nano/Vim', 'ShellCheck'],
    commands: [
      { command: 'bash -n script.sh', description: 'Синтаксическая проверка скрипта без его выполнения', OS: 'Linux' },
      { command: 'bash -x script.sh', description: 'Запуск скрипта в режиме отладки с печатью каждого шага', OS: 'Linux' },
      { command: 'echo "Exit code: $?"', description: 'Проверка кода завершения предыдущей команды (0 = успех)', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #5: Разработка интерактивного скрипта проверки здоровья сервера',
    homeworkDesc: 'Написать скрипт server-health.sh: проверяет CPU, RAM, диск (>80% = предупреждение) и статус сервисов nginx/ssh.',
    cheatSheetMd: `# Шпаргалка: Bash Core

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="/var/backups"

if [[ ! -d "$TARGET_DIR" ]]; then
    mkdir -p "$TARGET_DIR"
    echo "Директория создана: $TARGET_DIR"
fi

for host in 192.168.1.10 192.168.1.11; do
    ping -c 1 "$host" &>/dev/null && echo "$host доступен" || echo "$host OFFLINE"
done
\`\`\``,
  },
  {
    id: 6,
    blockId: 2,
    week: 3,
    lessonNumber: 6,
    title: 'Lesson 6: Text Processing Power: grep, sed, awk, cut, sort, uniq & RegEx',
    titleRu: 'Урок 6: Обработка текстовых потоков: grep, sed, awk, cut, sort, uniq и RegEx',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Стандартные потоки ввода-вывода (stdin, stdout, stderr, перенаправления >, >>, 2>&1, pipes |). Поиск по шаблонам с grep/egrep. Потоковый редактор sed: замена строк, удаление комментариев. Мощный инструмент awk: извлечение колонок, подсчет сумм и средних значений. Фильтрация access.log Nginx и поиск аномалий.',
    learningObjectives: [
      'Использовать конвейеры Linux для фильтрации гигабайтных логов за секунды',
      'Быстро заменять подстроки и конфиги на лету через sed -i',
      'Парсить структурированные логи и таблицы через awk ($1, $9, NF)',
      'Находить топ-10 атакующих IP-адресов в логах Nginx'
    ],
    tools: ['grep', 'sed', 'awk', 'cut', 'sort', 'uniq', 'less'],
    commands: [
      { command: "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10", description: 'Топ-10 IP-адресов по количеству запросов к веб-серверу', OS: 'Linux' },
      { command: "sed -i 's/PORT=3000/PORT=8080/g' .env", description: 'Мгновенная замена параметров в конфигурационном файле', OS: 'Linux' },
      { command: 'grep -E "404|500|502" /var/log/nginx/access.log | wc -l', description: 'Подсчет общего числа ошибок в веб-логе', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #6: Парсер логов безопасности с генерацией отчета',
    homeworkDesc: 'Написать скрипт log-analyzer.sh, выводящий количество 500-х ошибок, топ-5 запрашиваемых URL и подозрительные IP за последние сутки.',
    cheatSheetMd: `# Шпаргалка: grep, sed, awk

\`\`\`bash
# Поиск без учета регистра с номерами строк
grep -rni "error" /var/log/

# Удаление пустых строк и комментариев
sed -e '/^#/d' -e '/^$/d' /etc/nginx/nginx.conf

# Подсчет суммы 10-й колонки (трафик в байтах)
awk '{sum += $10} END {print "Total MB:", sum/1024/1024}' access.log
\`\`\``,
  },
  {
    id: 7,
    blockId: 2,
    week: 4,
    lessonNumber: 7,
    title: 'Lesson 7: Backup Automation: rsync, tar, gzip, Cron, Anacron & Systemd Timers',
    titleRu: 'Урок 7: Автоматизация резервного копирования: rsync, tar, cron и systemd timers',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Стратегия 3-2-1 для бэкапов. Создание архивов tar с gzip/zstd сжатием. Инкрементальная синхронизация с rsync через SSH. Планировщик задач Crontab (синтаксис 5 звездочек), переменные окружения в cron. Современная альтернатива: Systemd Timers (.timer + .service) с удобным логированием в journalctl.',
    learningObjectives: [
      'Создавать надежные архивы системных файлов и баз данных tar.gz',
      'Эффективно синхронизировать данные на удаленный сервер через rsync -avz',
      'Настраивать периодические задания в crontab для root и обычных пользователей',
      'Создавать systemd timer с отслеживанием времени следующего запуска'
    ],
    tools: ['rsync', 'tar', 'cron', 'systemd-timer', 'journalctl'],
    commands: [
      { command: 'tar -czf backup-$(date +%F).tar.gz /var/www /etc/nginx', description: 'Архивация веб-каталога и конфигов с текущей датой в имени', OS: 'Linux' },
      { command: 'rsync -avz -e "ssh -p 22" /backup/ user@remote:/remote_backups/', description: 'Быстрая инкрементальная передача файлов по SSH', OS: 'Linux' },
      { command: 'systemctl list-timers', description: 'Список активных системных таймеров и времени их запуска', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #7: Полный автоматический ночной бэкап с ротацией за 7 дней',
    homeworkDesc: 'Скрипт делает архив /etc и /var/www, сохраняет в /backups, удаляет архивы старше 7 дней (find -mtime +7 -delete) и запускается в 03:00 по cron.',
    cheatSheetMd: `# Шпаргалка: Cron & Rsync

\`\`\`bash
# Синтаксис crontab: мин(0-59) час(0-23) день(1-31) месяц(1-12) день_нед(0-6)
# Каждый день в 03:00
0 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# Инкрементальный rsync
rsync -avzP --delete /source/ user@backup-server:/dest/
\`\`\``,
  },
  {
    id: 8,
    blockId: 2,
    week: 4,
    lessonNumber: 8,
    title: 'Lesson 8: Log Monitoring, Rotation (logrotate) & Telegram Bot Alerting',
    titleRu: 'Урок 8: Мониторинг системных журналов, ротация logrotate и оповещения в Telegram',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Журналы systemd (journalctl -u, -f, --since), логи ядра dmesg. Конфигурация /etc/logrotate.d/ для сжатия и ротации тяжелых файлов. Создание Telegram-бота через BotFather, отправка алертов через curl HTTP API при падении сервисов или критических событиях.',
    learningObjectives: [
      'Управлять размером журналов через logrotate и предотвращать переполнение диска',
      'Фильтровать journalctl по сервисам, приоритетам (err, crit) и времени',
      'Создавать Telegram-ботов для уведомлений системного администратора',
      'Писать скрипты-сторожи (watchdog) с мгновенным оповещением в мессенджер'
    ],
    tools: ['journalctl', 'logrotate', 'curl', 'Telegram Bot API'],
    commands: [
      { command: 'journalctl -u nginx -n 50 --no-pager', description: 'Вывод последних 50 записей лога службы Nginx', OS: 'Linux' },
      { command: 'logrotate -d /etc/logrotate.d/nginx', description: 'Тестовый запуск ротации логов в режиме отладки', OS: 'Linux' },
      { command: 'curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" -d "chat_id=$ID&text=Server+Alert"', description: 'Отправка оповещения администратору в Telegram', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #8: Сторожевой таймер сервера с уведомлением в Telegram',
    homeworkDesc: 'Скрипт проверяет свободную память и доступность порта 80. Если порт упал — пытается перезапустить службу и шлет сообщение в Telegram.',
    cheatSheetMd: `# Шпаргалка: Telegram оповещения

\`\`\`bash
send_tg() {
    local MSG="$1"
    curl -s -X POST "https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage" \\
        -d "chat_id=\${CHAT_ID}" \\
        -d "text=\${MSG}" \\
        -d "parse_mode=Markdown" >/dev/null
}
send_tg "⚠️ *Внимание!* Высокая нагрузка CPU: 94%"
\`\`\``,
  },

  // ==================== BLOCK 3 ====================
  {
    id: 9,
    blockId: 3,
    week: 5,
    lessonNumber: 9,
    title: 'Lesson 9: Computer Networking Foundations: OSI, TCP/IP, IPv4, Subnetting & CIDR',
    titleRu: 'Урок 9: Основы сетей: модели OSI и TCP/IP, адресация IPv4, маски подсетей и CIDR',
    theoryDuration: 50,
    practiceDuration: 40,
    theorySummary: '7 уровней модели OSI и 4 уровня TCP/IP. Протоколы TCP (3-way handshake, надежность) vs UDP (скорость). Структура IPv4-пакета, приватные подсети (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). Расчет масок подсетей и доступных хостов через CIDR (/24, /28, /30). Шлюз по умолчанию (Default Gateway) и маршрутизация.',
    learningObjectives: [
      'Понимать прохождение пакета по уровням OSI от приложения до физического кабеля',
      'Вычислять сетевой адрес, broadcast и количество хостов в подсети по маске CIDR',
      'Отличать TCP от UDP и понимать назначение портов (80, 443, 22, 53, 5432)',
      'Анализировать сетевые маршруты таблицы routing'
    ],
    tools: ['ipcalc', 'traceroute', 'ip route', 'wireshark'],
    commands: [
      { command: 'ipcalc 192.168.1.50/28', description: 'Расчет параметров подсети, диапазона адресов и broadcast', OS: 'Linux' },
      { command: 'ip route show', description: 'Просмотр системной таблицы маршрутизации Linux', OS: 'Linux' },
      { command: 'traceroute 8.8.8.8', description: 'Трассировка пути сетевых пакетов до удаленного узла', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #9: Проектирование топологии локальной сети компании',
    homeworkDesc: 'Разбить сеть 10.10.0.0/22 на 4 независимые подсети: Серверы (60 хостов), Офис (200 хостов), Wi-Fi Гости (100 хостов) и DMZ.',
    cheatSheetMd: `# Шпаргалка: Подсети и CIDR

* /24 = 255.255.255.0 = 256 адресов (254 доступно хостам)
* /25 = 255.255.255.128 = 128 адресов (126 хостов)
* /26 = 255.255.255.192 = 64 адреса (62 хоста)
* /28 = 255.255.255.240 = 16 адресов (14 хостов)
* /30 = 255.255.255.252 = 4 адреса (2 хоста, Point-to-Point)`,
  },
  {
    id: 10,
    blockId: 3,
    week: 5,
    lessonNumber: 10,
    title: 'Lesson 10: Linux Network Stack: ip, ss, traceroute, dig, nslookup, ping & tcpdump',
    titleRu: 'Урок 10: Сетевой стек Linux: утилиты ip, ss, traceroute, dig, ping и tcpdump',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Пакет iproute2: назначение статических IP (ip addr add), включение интерфейсов (ip link set up). Диагностика соединений через сокетную утилиту ss. Проверка доступности ping и трассировка traceroute/mtr. DNS-запросы через dig +trace. Захват и анализ сырых пакетов через tcpdump с фильтрами портов и хостов.',
    learningObjectives: [
      'Диагностировать неполадки подключения к сети на сервере',
      'Назначать временные и постоянные IP-адреса через Netplan / nmcli',
      'Исследовать открытые сокеты и соединения клиентов утилитой ss',
      'Перехватывать HTTP/DNS трафик с помощью tcpdump для отладки'
    ],
    tools: ['iproute2', 'ss', 'tcpdump', 'dig', 'mtr'],
    commands: [
      { command: 'ip -c a', description: 'Цветной вывод сетевых интерфейсов и назначенных IP-адресов', OS: 'Linux' },
      { command: 'dig +short devopspro.tech', description: 'Быстрый запрос A-записи домена к DNS-серверу', OS: 'Linux' },
      { command: 'sudo tcpdump -i any port 80 -nn -c 10', description: 'Захват первых 10 сетевых пакетов на 80 порту', OS: 'Linux' },
      { command: 'ss -tan state established', description: 'Список всех активных установленных TCP-соединений', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #10: Диагностика сетевой аварии и перехват трафика',
    homeworkDesc: 'С помощью tcpdump записать pcap-дамп обращения к сайту, открыть в Wireshark и найти handshake TCP и HTTP-запрос GET.',
    cheatSheetMd: `# Шпаргалка: Сетевые утилиты Linux

\`\`\`bash
# Проверка сокетов и слушателей
ss -tulpn
ss -s # общая статистика

# Захват пакетов в файл
sudo tcpdump -i eth0 -w /tmp/capture.pcap port 53 or port 443

# Тест потерь пакетов и лагов
mtr -r -c 10 1.1.1.1
\`\`\``,
  },
  {
    id: 11,
    blockId: 3,
    week: 6,
    lessonNumber: 11,
    title: 'Lesson 11: Domain Name System (DNS), BIND9, Resolv.conf & DHCP Server Setup',
    titleRu: 'Урок 11: Система доменных имен DNS, resolv.conf, кэширующий DNS и DHCP',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Как устроен DNS: корневые серверы (Root), зоны TLD (.tech, .com), авторитетные серверы имен. Типы записей: A, AAAA, CNAME, MX, TXT (SPF/DKIM/DMARC), PTR, NS. Локальное разрешение /etc/hosts и /etc/resolv.conf. Настройка кэширующего DNS-сервера (dnsmasq или BIND9). Принцип работы DHCP (DORA: Discover, Offer, Request, Acknowledge).',
    learningObjectives: [
      'Понимать цепочку рекурсивных DNS-запросов от браузера до авторитетного сервера',
      'Корректно настраивать ресурсные записи домена (A, CNAME, MX, TXT)',
      'Разворачивать локальный кэширующий DNS-сервер на dnsmasq',
      'Настраивать статические и динамические DNS-серверы через Netplan'
    ],
    tools: ['dnsmasq', 'bind9', 'dig', 'Netplan'],
    commands: [
      { command: 'cat /etc/resolv.conf', description: 'Просмотр текущих системных upstream DNS-серверов', OS: 'Linux' },
      { command: 'dig @8.8.8.8 google.com MX', description: 'Запрос почтовых записей MX через Google DNS', OS: 'Linux' },
      { command: 'sudo systemctl restart systemd-resolved', description: 'Перезапуск локального DNS-резолвера Ubuntu', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #11: Развертывание локального DNS-сервера для офиса',
    homeworkDesc: 'Установить dnsmasq, настроить пересылку на 1.1.1.1 и добавить локальные домены *.corp.internal для трех серверов.',
    cheatSheetMd: `# Шпаргалка: Записи DNS

* **A**: Домен -> IPv4 адрес (\`app.devopspro.tech -> 194.87.12.34\`)
* **AAAA**: Домен -> IPv6 адрес
* **CNAME**: Псевдоним (каноническое имя)
* **MX**: Почтовый сервер с приоритетом
* **TXT**: Текстовые данные, верификация владения доменом, SPF-защита от спама`,
  },
  {
    id: 12,
    blockId: 3,
    week: 6,
    lessonNumber: 12,
    title: 'Lesson 12: Network Security: Netfilter, UFW, Iptables, Fail2ban & Port Hardening',
    titleRu: 'Урок 12: Сетевая безопасность: межсетевой экран UFW, iptables и защита Fail2ban',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Архитектура Netfilter в ядре Linux: цепочки INPUT, OUTPUT, FORWARD. Правила iptables: таблицы filter и nat. Упрощенный фаервол UFW: ufw default deny incoming, ufw allow ssh, rate limiting. Защита от брутфорса SSH и сканеров с помощью Fail2ban: фильтры, jails (/etc/fail2ban/jail.local), бан IP на время и разбан.',
    learningObjectives: [
      'Настраивать политику безопасности «запрещено всё, что явно не разрешено»',
      'Управлять правилами фаервола UFW на production-серверах',
      'Устанавливать и конфигурировать сервис Fail2ban для защиты SSH и Nginx',
      'Мониторить заблокированные IP-адреса и управлять белыми списками (ignoreip)'
    ],
    tools: ['ufw', 'iptables', 'fail2ban', 'ss'],
    commands: [
      { command: 'sudo ufw default deny incoming && sudo ufw default allow outgoing', description: 'Базовая политика фаервола: закрыть все входящие порты', OS: 'Linux' },
      { command: 'sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp', description: 'Открытие только критически важных портов SSH, HTTP и HTTPS', OS: 'Linux' },
      { command: 'sudo ufw enable && sudo ufw status verbose', description: 'Активация фаервола и просмотр списка активных правил', OS: 'Linux' },
      { command: 'sudo fail2ban-client status sshd', description: 'Просмотр заблокированных IP-адресов в jail sshd', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #12: Развертывание защищенного периметра с UFW и Fail2ban',
    homeworkDesc: 'Закрыть все порты, открыть 22, 80, 443. Настроить jail.local в Fail2ban: 3 неверных попытки пароля = бан на 1 час.',
    cheatSheetMd: `# Шпаргалка: UFW & Fail2ban

\`\`\`bash
# UFW
sudo ufw limit 22/tcp # защита от брутфорса
sudo ufw allow 80,443/tcp
sudo ufw status numbered
sudo ufw delete 3

# Fail2ban
sudo fail2ban-client set sshd unbanip 192.168.1.100
sudo fail2ban-client status
\`\`\``,
  },

  // ==================== BLOCK 4 ====================
  {
    id: 13,
    blockId: 4,
    week: 7,
    lessonNumber: 13,
    title: 'Lesson 13: High-Performance Nginx Web Server: Virtual Hosts, Reverse Proxy & Upstreams',
    titleRu: 'Урок 13: Веб-сервер Nginx: виртуальные хосты, Reverse Proxy и балансировка нагрузки',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Архитектура Nginx: мастер-процесс и воркеры (event-driven, epoll). Структура /etc/nginx/nginx.conf, sites-available и sites-enabled. Директивы server, listen, server_name, location. Настройка Reverse Proxy (proxy_pass http://localhost:3000) с передачей заголовков Host, X-Real-IP, X-Forwarded-For. Балансировка upstream (round-robin, least_conn, ip_hash).',
    learningObjectives: [
      'Устанавливать и тюнинговать веб-сервер Nginx для высоких нагрузок',
      'Создавать виртуальные хосты (Server Blocks) для нескольких доменов на одном IP',
      'Проксировать трафик на внутренние сервисы (Node.js, Python, Go)',
      'Настраивать сжатие gzip и кэширование статических файлов'
    ],
    tools: ['Nginx', 'curl', 'systemd'],
    commands: [
      { command: 'sudo nginx -t', description: 'Тестирование синтаксиса конфигурационных файлов Nginx', OS: 'Linux' },
      { command: 'sudo systemctl reload nginx', description: 'Бесшовное обновление конфигурации Nginx без разрыва соединений', OS: 'Linux' },
      { command: 'curl -I http://localhost', description: 'Проверка заголовков ответа веб-сервера', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #13: Настройка Nginx Reverse Proxy для Node.js приложения',
    homeworkDesc: 'Сконфигурировать server block для app.local, настроить проксирование на порт 3000, отдачу статики из /var/www/static и кастомные страницы 404/50x.',
    cheatSheetMd: `# Шпаргалка: Конфиг Nginx Reverse Proxy

\`\`\`nginx
server {
    listen 80;
    server_name app.devopspro.tech;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\``,
  },
  {
    id: 14,
    blockId: 4,
    week: 7,
    lessonNumber: 14,
    title: 'Lesson 14: SSL/TLS Encryption, Let’s Encrypt Certbot, HSTS & TLS Hardening',
    titleRu: 'Урок 14: SSL/TLS шифрование: Let’s Encrypt Certbot, HTTPS, HSTS и аудит безопасности',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Симметричное и асимметричное шифрование. Протоколы TLS 1.2 и TLS 1.3. Принцип работы удостоверяющих центров (CA). Получение бесплатных доверенных сертификатов через Certbot (HTTP-01 vs DNS-01 вызовы). Автопродление через systemd timer. Настройка безопасных шифров (Modern TLS), отключение устаревших протоколов и включение HSTS.',
    learningObjectives: [
      'Понимать устройство TLS handshake и сертификатов X.509',
      'Выпускать SSL-сертификаты Let’s Encrypt для доменов и поддоменов',
      'Настраивать автопродление сертификатов через certbot renew',
      'Достигать оценки A+ в тесте безопасности Qualys SSL Labs'
    ],
    tools: ['Certbot', 'Nginx', 'OpenSSL', 'SSL Labs'],
    commands: [
      { command: 'sudo certbot --nginx -d example.com -d www.example.com', description: 'Автоматический выпуск и интеграция SSL-сертификата в Nginx', OS: 'Linux' },
      { command: 'sudo certbot renew --dry-run', description: 'Проверка механизма автоматического продления сертификатов', OS: 'Linux' },
      { command: 'openssl s_client -connect example.com:443 -servername example.com', description: 'Тестирование SSL-рукопожатия и валидности сертификата через OpenSSL', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #14: Перевод веб-сервиса на защищенный HTTPS с редиректом',
    homeworkDesc: 'Выпустить сертификат для тестового домена, настроить 301 редирект с HTTP на HTTPS, включить HSTS и отключить TLS 1.0/1.1.',
    cheatSheetMd: `# Шпаргалка: Certbot & HTTPS

\`\`\`bash
# Получение сертификата для Nginx
sudo certbot --nginx --agree-tos -m admin@devopspro.tech -d mydomain.tech

# Проверка срока действия
sudo certbot certificates

# Ручной запуск продления
sudo certbot renew
\`\`\``,
  },
  {
    id: 15,
    blockId: 4,
    week: 8,
    lessonNumber: 15,
    title: 'Lesson 15: Relational Databases: PostgreSQL & MySQL/MariaDB Administration & Backups',
    titleRu: 'Урок 15: Базы данных: администрирование PostgreSQL и MySQL, тюнинг и бэкапы',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Установка и инициализация СУБД PostgreSQL и MariaDB в Linux. Конфигурация pg_hba.conf и postgresql.conf: адреса прослушивания (listen_addresses), аутентификация (md5, scram-sha-256). Создание пользователей, баз данных и выдача прав (GRANT). Резервное копирование логических дампов pg_dump / mysqldump и их быстрое восстановление.',
    learningObjectives: [
      'Устанавливать и базово администрировать PostgreSQL и MariaDB',
      'Настраивать безопасный удаленный доступ к БД с ограничением по IP',
      'Создавать пользователей, пароли и базы данных через консольный клиент psql',
      'Автоматизировать создание дампа базы данных через pg_dump в cron'
    ],
    tools: ['PostgreSQL', 'psql', 'MariaDB', 'pg_dump', 'mysqldump'],
    commands: [
      { command: 'sudo -u postgres psql', description: 'Вход в интерактивную консоль администратора PostgreSQL', OS: 'Linux' },
      { command: 'pg_dump -U myuser -d mydb -F c -b -v -f mydb.dump', description: 'Создание компактного бинарного бэкапа базы данных PostgreSQL', OS: 'Linux' },
      { command: 'pg_restore -U myuser -d mydb_test -v mydb.dump', description: 'Восстановление базы данных из резервной копии', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #15: Автоматизированный скрипт ночного резервного копирования PostgreSQL',
    homeworkDesc: 'Написать bash-скрипт pg-backup.sh: создает дамп БД с меткой времени, пакует в gz, хранит 7 последних копий и отправляет отчет.',
    cheatSheetMd: `# Шпаргалка: PostgreSQL CLI

\`\`\`sql
-- Создание БД и пользователя
CREATE USER devops WITH ENCRYPTED PASSWORD 'StrongPass123';
CREATE DATABASE prod_db OWNER devops;
GRANT ALL PRIVILEGES ON DATABASE prod_db TO devops;
\`\`\`

\`\`\`bash
# Дамп и восстановление
pg_dump -U devops -h localhost prod_db > prod_db_$(date +%F).sql
psql -U devops -h localhost prod_db < prod_db.sql
\`\`\``,
  },
  {
    id: 16,
    blockId: 4,
    week: 8,
    lessonNumber: 16,
    title: 'Lesson 16: Network Storage & File Sharing: NFS, Samba, SSHFS & Disk Quotas',
    titleRu: 'Урок 16: Сетевые хранилища и файлообмен: NFS, Samba, SSHFS и дисковые квоты',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Сетевая файловая система NFS (Network File System v4): сервер /etc/exports, клиентское монтирование через /etc/fstab. Файловый сервер Samba для интеграции с Windows-клиентами (smb.conf). Быстрое монтирование удаленных каталогов через SSHFS. Управление квотами пользователей (quota, edquota) для защиты разделов от переполнения.',
    learningObjectives: [
      'Разворачивать сетевые хранилища NFS для кластеров и резервных копий',
      'Настраивать авто-монтирование сетевых ресурсов при загрузке системы',
      'Монтировать удаленные директории по SSH через sshfs без установки демонов',
      'Контролировать лимиты дискового пространства пользователей'
    ],
    tools: ['nfs-kernel-server', 'samba', 'sshfs', 'fstab'],
    commands: [
      { command: 'sudo exportfs -rav', description: 'Применение экспортируемых сетевых папок NFS без перезапуска демона', OS: 'Linux' },
      { command: 'sudo mount -t nfs 192.168.1.10:/shared /mnt/nfs_storage', description: 'Монтирование удаленной папки NFS в локальную директорию', OS: 'Linux' },
      { command: 'sshfs user@remote:/var/www /mnt/remote_www', description: 'Монтирование удаленного веб-каталога через защищенный SSHFS', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #16: Настройка централизованного NFS-хранилища резервных копий',
    homeworkDesc: 'Развернуть NFS-сервер, ограничить доступ одной подсетью /24, настроить fstab на клиенте с параметрами nofail, auto.',
    cheatSheetMd: `# Шпаргалка: NFS & fstab

\`\`\`text
# /etc/exports на сервере
/srv/nfs_share  192.168.1.0/24(rw,sync,no_subtree_check)

# /etc/fstab на клиенте
192.168.1.10:/srv/nfs_share  /mnt/storage  nfs  defaults,nofail  0 0
\`\`\``,
  },

  // ==================== BLOCK 5 ====================
  {
    id: 17,
    blockId: 5,
    week: 9,
    lessonNumber: 17,
    title: 'Lesson 17: Containerization Revolution: Docker Architecture, Engine, Images & CLI',
    titleRu: 'Урок 17: Революция контейнеризации: архитектура Docker, образы и контейнеры',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Разница между виртуализацией (KVM, ESXi) и контейнеризацией (Docker). Механизмы ядра Linux: Namespaces (PID, NET, MNT, IPC, UTS) и cgroups (контроль памяти и CPU). Архитектура Docker Daemon, CLI, containerd и OCI. Работа с Docker Hub: поиск, загрузка (docker pull), запуск контейнеров (docker run), проброс портов (-p 80:80) и переменных (-e).',
    learningObjectives: [
      'Понимать, как изоляция на уровне namespaces обеспечивает безопасность контейнеров',
      'Запускать, останавливать и удалять контейнеры через Docker CLI',
      'Пробрасывать сетевые порты сервера в изолированные контейнеры',
      'Инспектировать запущенные контейнеры и читать их логи (docker logs)'
    ],
    tools: ['Docker Engine', 'containerd', 'Docker Hub'],
    commands: [
      { command: 'docker run -d --name my-nginx -p 8080:80 nginx:alpine', description: 'Запуск веб-сервера Nginx в фоновом контейнере с пробросом порта', OS: 'Linux' },
      { command: 'docker ps -a', description: 'Просмотр всех запущенных и остановленных контейнеров', OS: 'Linux' },
      { command: 'docker logs -f my-nginx', description: 'Просмотр логов контейнера в реальном времени', OS: 'Linux' },
      { command: 'docker exec -it my-nginx sh', description: 'Интерактивный вход внутрь работающего контейнера', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #17: Развертывание стека контейнеров Nginx + Redis через Docker CLI',
    homeworkDesc: 'Запустить контейнер Redis с ограничением по памяти 128MB и веб-сервер Nginx, проверить взаимодействие и доступность.',
    cheatSheetMd: `# Шпаргалка: Docker CLI базовый

\`\`\`bash
# Полезные команды
docker ps
docker stop <id> && docker rm <id>
docker run -d --restart unless-stopped -p 3000:3000 myapp:latest
docker system prune -af # полная очистка мусора
\`\`\``,
  },
  {
    id: 18,
    blockId: 5,
    week: 9,
    lessonNumber: 18,
    title: 'Lesson 18: Production Dockerfile Engineering: Multi-Stage Builds & Image Optimization',
    titleRu: 'Урок 18: Написание production Dockerfile, multi-stage сборки и минимизация размера',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Инструкции Dockerfile: FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, ENTRYPOINT, CMD. Слои образов и работа кэша Docker. Минимизация размера: выбор базового образа (alpine vs debian-slim). Multi-stage сборка: сборка приложения в тяжелом SDK-контейнере и копирование готового артефакта в чистый рантайм. Использование .dockerignore и непривилегированных пользователей (USER nonroot).',
    learningObjectives: [
      'Создавать легковесные и безопасные Docker-образы размером менее 50 MB',
      'Применять паттерн Multi-stage build для компилируемых и JS-приложений',
      'Эффективно упорядочивать слои для максимального использования кэша сборок',
      'Отказываться от root внутри контейнера ради безопасности хоста'
    ],
    tools: ['Docker', 'Dive', 'Hadolint'],
    commands: [
      { command: 'docker build -t myapp:1.0 .', description: 'Сборка Docker-образа из текущей директории', OS: 'Linux' },
      { command: 'docker images', description: 'Просмотр локально сохраненных образов и их размеров', OS: 'Linux' },
      { command: 'docker history myapp:1.0', description: 'Анализ веса и команд каждого слоя в собранном образе', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #18: Оптимизация Dockerfile: сокращение веса образа в 10 раз',
    homeworkDesc: 'Переписать Dockerfile на multi-stage сборку с alpine, снизить вес образа с 900MB до менее чем 80MB, добавить USER appuser.',
    cheatSheetMd: `# Шпаргалка: Multi-stage Dockerfile

\`\`\`dockerfile
# Стейдж 1: Сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Стейдж 2: Продакшн
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\``,
  },
  {
    id: 19,
    blockId: 5,
    week: 10,
    lessonNumber: 19,
    title: 'Lesson 19: Docker Compose: Multi-Service Architecture, Web, DB, Redis & Nginx',
    titleRu: 'Урок 19: Docker Compose: мультисервисная архитектура (Web + DB + Redis + Nginx)',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Назначение Docker Compose для локальной разработки и production на одиночных серверах. Структура docker-compose.yml: services, networks, volumes, environment, depends_on, healthcheck. Переменные окружения через .env файл. Управление жизненным циклом стека: docker compose up -d, down, restart, logs.',
    learningObjectives: [
      'Описывать сложные многокомпонентные стеки в едином декларативном файле',
      'Настраивать взаимодействие между контейнерами по внутренним DNS-именам сервисов',
      'Обеспечивать правильный порядок запуска с помощью depends_on и healthcheck',
      'Использовать .env файлы для безопасной передачи секретов и параметров'
    ],
    tools: ['Docker Compose', 'YAML', 'PostgreSQL', 'Redis'],
    commands: [
      { command: 'docker compose up -d', description: 'Запуск всех сервисов проекта в фоновом режиме', OS: 'Linux' },
      { command: 'docker compose ps', description: 'Проверка статуса здоровья всех контейнеров стека', OS: 'Linux' },
      { command: 'docker compose logs -f --tail=100 web', description: 'Чтение логов конкретного сервиса с хвостом 100 строк', OS: 'Linux' },
      { command: 'docker compose down', description: 'Остановка и удаление контейнеров и внутренних сетей стека', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #19: Развертывание полнофункционального стека через Docker Compose',
    homeworkDesc: 'Написать docker-compose.yml со службами: Frontend (Nginx), Backend (Node), Database (Postgres) с персистентным volume.',
    cheatSheetMd: `# Шпаргалка: docker-compose.yml

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d app"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
\`\`\``,
  },
  {
    id: 20,
    blockId: 5,
    week: 10,
    lessonNumber: 20,
    title: 'Lesson 20: Docker Networking, Persistent Volumes, Container Security & Registry',
    titleRu: 'Урок 20: Сети Docker, хранилища Volumes, безопасность контейнеров и Registry',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Драйверы сетей Docker: bridge, host, none, overlay. Персистентность данных: Docker Named Volumes vs Bind Mounts. Ограничение ресурсов контейнера: --cpus, --memory, --memory-swap. Безопасность: readonly root filesystem, drop capabilities (--cap-drop ALL), сканирование уязвимостей образов (Trivy). Публикация образов в Docker Hub и приватные реестры (GHCR, GitLab Registry).',
    learningObjectives: [
      'Изолировать сервисы в разные внутренние bridge-сети',
      'Надежно сохранять данные баз данных с помощью именованных Docker Volumes',
      'Защищать сервер от захвата ресурсов контейнером через CPU/RAM лимиты',
      'Сканировать образы на известные уязвимости (CVE) утилитой Trivy'
    ],
    tools: ['docker volume', 'docker network', 'Trivy', 'GHCR'],
    commands: [
      { command: 'docker volume create pg_data', description: 'Создание персистентного тома для хранения данных БД', OS: 'Linux' },
      { command: 'docker network create --driver bridge app-net', description: 'Создание изолированной виртуальной сети для контейнеров', OS: 'Linux' },
      { command: 'trivy image myapp:latest', description: 'Анализ Docker-образа на наличие известных уязвимостей', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #20: Резервное копирование и миграция данных Docker Volume',
    homeworkDesc: 'Написать скрипт для автоматического дампа данных из именованного volume в tar.gz без остановки связанных сервисов.',
    cheatSheetMd: `# Шпаргалка: Docker Volumes & Networks

\`\`\`bash
# Бэкап тома в tar
docker run --rm -v my_volume:/data -v $(pwd):/backup alpine \\
    tar czf /backup/volume_backup.tar.gz -C /data .

# Восстановление
docker run --rm -v my_volume:/data -v $(pwd):/backup alpine \\
    tar xzf /backup/volume_backup.tar.gz -C /data
\`\`\``,
  },

  // ==================== BLOCK 6 ====================
  {
    id: 21,
    blockId: 6,
    week: 11,
    lessonNumber: 21,
    title: 'Lesson 21: Git for DevOps: CLI, Branching, Rebasing, Tags & GitHub/GitLab Repositories',
    titleRu: 'Урок 21: Git для системного администратора: командная строка, ветвление и релизы',
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: 'Git как фундамент практики Infrastructure as Code (IaC). Внутреннее устройство Git: blob, tree, commit, ref. Работа в терминале: git init, add, commit, push, pull, fetch. Стратегии ветвления (GitFlow, Trunk-based). Разрешение конфликтов слияния, интерактивный rebase (git rebase -i), создание тегов версий (v1.0.0). Подключение через SSH-ключи.',
    learningObjectives: [
      'Уверенно работать с репозиториями Git из консоли сервера без графического интерфейса',
      'Понимать логику ветвления, коммитов и безопасного разрешения конфликтов',
      'Использовать семантическое версионирование SemVer через git tag',
      'Хранить серверные конфигурации и скрипты в защищенных Git-репозиториях'
    ],
    tools: ['Git CLI', 'GitHub', 'GitLab'],
    commands: [
      { command: 'git checkout -b feature/monitoring', description: 'Создание новой ветки и мгновенное переключение на нее', OS: 'Linux' },
      { command: 'git log --oneline --graph --all', description: 'Красивое графическое дерево коммитов в терминале', OS: 'Linux' },
      { command: 'git tag -a v1.0.0 -m "Production Release 1.0"', description: 'Создание аннотированного тега релиза', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #21: Организация репозитория инфраструктуры сервера',
    homeworkDesc: 'Инициализировать git-репозиторий со скриптами автоматизации, настроить .gitignore, создать ветку staging и сделать Pull Request в main.',
    cheatSheetMd: `# Шпаргалка: Git CLI

\`\`\`bash
git clone git@github.com:user/infra-repo.git
git status
git add .
git commit -m "feat(nginx): add ssl hardening headers"
git push origin main

# Откат изменений
git checkout -- <file>
git reset --soft HEAD~1
\`\`\``,
  },
  {
    id: 22,
    blockId: 6,
    week: 11,
    lessonNumber: 22,
    title: 'Lesson 22: CI/CD Pipelines: GitHub Actions, Automated Testing, Building & Deployment',
    titleRu: 'Урок 22: Непрерывная интеграция и доставка (CI/CD) с помощью GitHub Actions',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Философия Continuous Integration & Continuous Deployment (CI/CD). Компоненты GitHub Actions: workflows, jobs, steps, runners. Триггеры запуска (push, pull_request, schedule). Использование секретов (GitHub Secrets) для защиты паролей и SSH-ключей. Автоматическая сборка Docker-образа, запуск линтеров и деплой на VPS по SSH.',
    learningObjectives: [
      'Создавать YAML-пайплайны автоматической сборки в каталоге .github/workflows/',
      'Хранить SSH-ключи и переменные окружения в защищенных Secrets',
      'Автоматизировать тестирование и сборку Docker-образов при каждом git push',
      'Настраивать автоматический деплой на боевой сервер без ручного вмешательства'
    ],
    tools: ['GitHub Actions', 'YAML', 'SSH Action', 'Docker Buildx'],
    commands: [
      { command: 'cat .github/workflows/deploy.yml', description: 'Просмотр описания пайплайна непрерывной доставки', OS: 'Linux' },
      { command: 'git push origin main', description: 'Отправка коммита и автоматический запуск CI/CD пайплайна', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #22: Настройка полного пайплайна CI/CD с деплоем на VPS',
    homeworkDesc: 'Написать workflow: при пуше в main собирается Docker-образ, запускаются тесты и по SSH отдается команда docker compose pull && up -d на VPS.',
    cheatSheetMd: `# Шпаргалка: GitHub Actions Workflow

\`\`\`yaml
name: Deploy to Production
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/myapp
            git pull origin main
            docker compose pull
            docker compose up -d --remove-orphans
\`\`\``,
  },
  {
    id: 23,
    blockId: 6,
    week: 12,
    lessonNumber: 23,
    title: 'Lesson 23: Production Monitoring & Alerting: Prometheus, Node Exporter & Grafana',
    titleRu: 'Урок 23: Мониторинг и визуализация метрик: Prometheus, Node Exporter и Grafana',
    theoryDuration: 45,
    practiceDuration: 45,
    theorySummary: 'Модель мониторинга метрик: Pull (Prometheus) vs Push. Сбор метрик операционной системы через Node Exporter (CPU, RAM, диск, сеть). База данных временных рядов (TSDB) Prometheus: конфигурация prometheus.yml, scrape_configs. Язык запросов PromQL (rate, sum, irate). Развертывание Grafana, импорт готовых дашбордов и настройка пороговых алертов.',
    learningObjectives: [
      'Разворачивать стек мониторинга Prometheus + Node Exporter + Grafana в Docker Compose',
      'Понимать модель метрик (counters, gauges, histograms)',
      'Писать базовые запросы на PromQL для вычисления процента нагрузки CPU и памяти',
      'Импортировать популярный дашборд Node Exporter Full (ID: 1860) в Grafana'
    ],
    tools: ['Prometheus', 'Grafana', 'Node Exporter', 'PromQL'],
    commands: [
      { command: 'curl -s http://localhost:9100/metrics | head -n 20', description: 'Проверка сырых системных метрик от демона Node Exporter', OS: 'Linux' },
      { command: 'docker compose logs -f prometheus', description: 'Мониторинг журнала сбора метрик Prometheus', OS: 'Linux' },
    ],
    homeworkTitle: 'ДЗ #23: Развертывание полноценного мониторинга сервера с Grafana',
    homeworkDesc: 'Поднять стек Prometheus + Grafana в docker-compose, подключить Node Exporter и вывести дашборд нагрузки сервера.',
    cheatSheetMd: `# Шпаргалка: PromQL запросы

\`\`\`promql
# Загрузка CPU в процентах
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Использование памяти в %
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Свободное место на диске /
node_filesystem_avail_bytes{mountpoint="/"} / 1024 / 1024 / 1024
\`\`\``,
  },
  {
    id: 24,
    blockId: 6,
    week: 12,
    lessonNumber: 24,
    title: 'Lesson 24: Capstone Project: Deploying Resilient Production Infrastructure & Demo Day',
    titleRu: 'Урок 24: Финальный Capstone-проект: Отказоустойчивая инфраструктура и защита',
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: 'Интеграция всех изученных технологий в единую production-инфраструктуру: Hardened Linux Host, UFW/Fail2ban фаервол, Nginx Reverse Proxy с валидным SSL Let’s Encrypt, Docker Compose приложение (Web + DB + Redis), автоматические ночные бэкапы в cron, CI/CD через GitHub Actions и мониторинг в Grafana. Презентация проекта менторам и получение сертификата Linux & DevOps Engineer.',
    learningObjectives: [
      'Построить безопасную и масштабируемую серверную инфраструктуру с нуля',
      'Связать воедино сетевую безопасность, веб-сервисы, БД и контейнеры',
      'Автоматизировать деплой и проверку работоспособности через CI/CD',
      'Успешно защитить дипломный проект на Demo Day'
    ],
    tools: ['Linux', 'SSH', 'UFW', 'Nginx', 'Docker', 'PostgreSQL', 'GitHub Actions', 'Prometheus', 'Grafana'],
    commands: [
      { command: 'docker compose ps && sudo ufw status && free -h', description: 'Финальный экспресс-аудит всех системных компонентов сервера', OS: 'Linux' },
      { command: 'curl -I https://devopspro.tech', description: 'Проверка доступности production-домена по безопасному протоколу HTTPS', OS: 'Linux' },
    ],
    homeworkTitle: 'Финальный Capstone: Защита инфраструктурного проекта на Demo Day',
    homeworkDesc: 'Предоставить URL работающего проекта, ссылку на репозиторий с Docker Compose и CI/CD, продемонстрировать дашборд Grafana и успешно ответить на вопросы комиссии.',
    cheatSheetMd: `# Чеклист выпускного проекта Linux & DevOps

1. [x] VPS настроен: SSH по ключам, root отключен
2. [x] UFW активен: открыты только порты 22, 80, 443
3. [x] Fail2ban защищает SSH
4. [x] Nginx проксирует запросы с SSL A+ рейтингом
5. [x] Docker Compose управляет сервисами
6. [x] База данных PostgreSQL бэкапится ежедневно
7. [x] CI/CD в GitHub Actions обновляет прод по git push
8. [x] Prometheus и Grafana показывают метрики`,
  },
];

export const SYSADMIN_LABS: LabData[] = SYSADMIN_LESSONS.map((lesson) => {
  return {
    id: lesson.id,
    lessonId: lesson.id,
    title: `Лабораторная работа #${lesson.id}: ${lesson.titleRu.replace(/Урок \d+:\s*/, '')}`,
    objective: `Практическое освоение темы «${lesson.titleRu}» на выделенном сервере или локальной виртуальной машине Linux.`,
    prerequisites: ['Доступ к терминалу Linux (Ubuntu 22.04/24.04 или Rocky Linux 9)', 'Базовые права sudo'],
    duration: '45–60 минут',
    totalScore: 100,
    submissionStatus: 'Not Submitted',
    isCompleted: false,
    tasks: [
      {
        id: `task-${lesson.id}-1`,
        text: `Шаг 1: Подготовка окружения и выполнение базовой команды (${lesson.commands[0]?.command || 'uname -a'})`,
        descriptionRu: `Выполнить в терминале команду проверки и зафиксировать вывод: \`${lesson.commands[0]?.command || 'uname -a'}\``,
        expectedCommand: lesson.commands[0]?.command || 'uname -a',
        hint: 'Убедитесь, что команда завершилась с кодом 0 без ошибок.',
        completed: false,
      },
      {
        id: `task-${lesson.id}-2`,
        text: `Шаг 2: Конфигурация и практическая отладка (${lesson.commands[1]?.command || 'ls -la'})`,
        descriptionRu: `Применить команду конфигурации: \`${lesson.commands[1]?.command || 'ls -la'}\``,
        expectedCommand: lesson.commands[1]?.command || 'ls -la',
        hint: 'Проверьте вывод журнала ошибок, если сервис не запустился.',
        completed: false,
      },
      {
        id: `task-${lesson.id}-3`,
        text: 'Шаг 3: Верификация результата и подготовка отчета для ментора',
        descriptionRu: 'Сделайте скриншот работающего сервиса или вывода команды проверки статуса и прикрепите к отчету.',
        hint: 'В отчете укажите возникшие сложности и способы их решения.',
        completed: false,
      },
    ],
    starterCode: `# Практическая лабораторная работа #${lesson.id}
# Запустите команды в терминале сервера:
${lesson.commands.map((c) => `# ${c.description}\n${c.command}`).join('\n\n')}
`,
    hints: [
      'Всегда проверяйте код возврата команды через echo $?',
      'Если прав недостаточно, используйте sudo перед командой',
      'Журналы отладки доступны через sudo journalctl -xe'
    ],
  };
});

export const SYSADMIN_DOWNLOADS: ResourceDownload[] = [
  {
    id: 'sys-d1',
    title: 'Ubuntu Server 24.04 LTS (Noble Numbat) ISO',
    category: 'Software',
    fileSize: 'ISO Образ • 2.6 GB',
    description: 'Официальный дистрибутив Ubuntu Server 24.04 LTS с долгосрочной поддержкой до 2029 года. Стандарт для облачных VPS и контейнеров Docker.',
    downloadUrl: 'https://ubuntu.com/download/server',
    isExternal: true,
  },
  {
    id: 'sys-d2',
    title: 'Rocky Linux 9.4 Minimal ISO (RHEL Alternative)',
    category: 'Software',
    fileSize: 'ISO Образ • 2.1 GB',
    description: 'Корпоративный 100% бинарно совместимый дистрибутив Red Hat Enterprise Linux. Идеален для изучения пакетов DNF/YUM, systemd и корпоративных стандартов.',
    downloadUrl: 'https://rockylinux.org/download',
    isExternal: true,
  },
  {
    id: 'sys-d3',
    title: 'Termius — Кроссплатформенный SSH & SFTP Клиент',
    category: 'Software',
    fileSize: 'Инсталлятор • 85 MB',
    description: 'Современный и удобный терминальный клиент со встроенным хранилищем SSH-ключей, сниппетами команд, SFTP-менеджером и автодополнением.',
    downloadUrl: 'https://termius.com/',
    isExternal: true,
  },
  {
    id: 'sys-d4',
    title: 'PuTTY & KiTTY — Классический SSH-клиент для Windows',
    category: 'Software',
    fileSize: 'Утилита • 3.5 MB',
    description: 'Легендарный легковесный SSH-клиент и генератор ключей PuTTYgen для Windows. Не требует установки, работает с любых носителей.',
    downloadUrl: 'https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html',
    isExternal: true,
  },
  {
    id: 'sys-d5',
    title: 'Awesome Linux SysAdmin Cheatsheet Pack (PDF & MD)',
    category: 'Guide',
    fileSize: 'PDF Документ • 4.8 MB',
    description: 'Комплект подробных шпаргалок по командам Linux: навигация, права chmod/chown, grep/sed/awk, сети ip/ss, Nginx и команды Docker CLI.',
    downloadUrl: 'https://github.com/trimstray/the-book-of-secret-knowledge',
    isExternal: true,
  },
  {
    id: 'sys-d6',
    title: 'Готовые шаблоны Nginx Reverse Proxy & SSL Hardening',
    category: 'Scripts',
    fileSize: 'ZIP Архив • 120 KB',
    description: 'Проверенные конфигурации server blocks для Nginx: реверс-прокси на Node/Python, защита от DDoS, сжатие gzip, кэширование статики и Modern SSL.',
    downloadUrl: 'https://github.com/h5bp/server-configs-nginx',
    isExternal: true,
  },
  {
    id: 'sys-d7',
    title: 'Docker & Docker Compose Production Starters',
    category: 'Scripts',
    fileSize: 'ZIP Репозиторий • 450 KB',
    description: 'Коллекция multi-stage Dockerfile для Node.js, Go, Python и готовых docker-compose.yml со связками Web + Postgres + Redis + Nginx + Certbot.',
    downloadUrl: 'https://github.com/veggiemonk/awesome-docker',
    isExternal: true,
  },
  {
    id: 'sys-d8',
    title: 'Prometheus + Grafana Monitoring Stack Blueprint',
    category: 'Scripts',
    fileSize: 'GitHub Blueprint • 280 KB',
    description: 'Готовый docker-compose стек мониторинга с предустановленным Prometheus, Node Exporter, Alertmanager и красивым импортированным дашбордом Grafana.',
    downloadUrl: 'https://github.com/stefanprodan/dockprom',
    isExternal: true,
  },
];
