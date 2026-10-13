import mentorAvatarSvg from '../assets/images/mentor_avatar.svg';

export interface ProjectInfo {
  company: string;
  duration: string;
  position: string;
  teamSize: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface MentorInfo {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  bio: string;
  summary?: string;
  summaryRu?: string;
  telegram: string;
  telegramUrl?: string;
  linkedin?: string;
  linkedinUrl?: string;
  experience: string;
  education?: string;
  qualification?: string;
  industries?: string[];
  specialties: string[];
  techCategories?: TechCategory[];
  projects?: ProjectInfo[];
}

export const AVAILABLE_MENTORS: MentorInfo[] = [
  {
    id: 'm1',
    name: 'Ahrorjon T.',
    role: 'Server Administrator & System Operations Reliability Engineer',
    email: 'ahrorjon91@gmail.com',
    phone: '+992170009000',
    avatarUrl: mentorAvatarSvg,
    telegram: '@itadminahror',
    telegramUrl: 'https://t.me/itadminahror',
    linkedin: 'linkedin.com/in/ahrorjon91',
    linkedinUrl: 'https://www.linkedin.com/in/ahrorjon91',
    experience: 'Почти 10 лет (07.2015 — по н.в.)',
    bio: 'System Operations Reliability Engineer с почти 10-летним опытом администрирования, автоматизации и оптимизации IT-инфраструктуры в высоконагруженных проектах.',
    summary: 'System Operations Reliability Engineer with nearly a decade of experience maintaining and optimizing IT infrastructure across a variety of projects. Experienced in a wide range of technologies, including extensive work with web servers such as Nginx and Apache, and networking technologies such as AD, DNS and Cisco ASA firewalls. Skilled in managing both Windows and Linux servers, ensuring their stability and performance. Dedicated to maintaining system security, implementing disaster recovery solutions, and managing databases. Combines technical skills with a high level of responsibility. Possesses exceptional critical thinking and troubleshooting skills and the ability to multi-task.',
    summaryRu: 'Инженер по надежности системных операций (System Operations Reliability Engineer) с почти десятилетним опытом поддержки и оптимизации IT-инфраструктуры в самых разнообразных проектах. Обладает глубоким практическим опытом работы с широким спектром технологий, включая веб-серверы Nginx и Apache, а также сетевые технологии Active Directory (AD), DNS и межсетевые экраны Cisco ASA. Специализируется на администрировании серверов под управлением Windows и Linux, гарантируя их стабильность и производительность. Уделяет особое внимание безопасности систем, внедрению решений аварийного восстановления (Disaster Recovery) и управлению базами данных. Сочетает высокий уровень технической экспертизы с личной ответственностью, развитым критическим мышлением, навыками оперативного поиска неисправностей (troubleshooting) и многозадачностью.',
    education: 'Khujand State University of Telecommunications and IT',
    qualification: 'Higher National Diploma in Telecommunications and IT',
    industries: ['Technology', 'Telecom', 'Travel & Hospitality'],
    specialties: ['Windows & Linux Admin', 'Nginx/Apache & Web Servers', 'AD, DNS & Networking', 'Automation (Ansible, Terraform)', 'VMWare, Docker & Kubernetes', 'Oracle, MSSQL & DB Management', 'AWS & Cloud Infrastructure'],
    techCategories: [
      {
        category: 'ОС и Серверное Ядро',
        items: ['Windows Server', 'Linux (Ubuntu/CentOS/RHEL)', 'macOS']
      },
      {
        category: 'Веб-серверы и Прокси',
        items: ['Nginx', 'Apache HTTP Server', 'Reverse Proxy', 'IIS']
      },
      {
        category: 'Сети, Безопасность и Инфраструктура',
        items: ['Active Directory (AD)', 'DNS', 'NTP', 'RDS', 'CA', 'File Server', 'Print Server', 'WSUS', 'Ethernet', 'NAT', 'IPSec', 'FTP', 'Iptables', 'Firewall', 'OpenVPN', 'Cisco ASA', 'Barracuda 340', 'ZSR1822E Router', 'HP FC SAN switch', 'H3C SecPath F1050', 'Wireshark', 'nmap']
      },
      {
        category: 'Виртуализация и Облака',
        items: ['VMWare', 'VirtualBox', 'Hyper-V', 'Docker', 'Kubernetes', 'AWS (EC2)']
      },
      {
        category: 'Автоматизация, Мониторинг и Бэкап',
        items: ['Ansible', 'Terraform', 'Zabbix', 'Veeam Backup', 'n8n', 'Bash', 'Python', 'PowerShell scripting']
      },
      {
        category: 'Базы данных и Инструменты',
        items: ['Oracle DB', 'MSSQL', 'MongoDB', 'Redis', 'Jira', 'Git', 'GitLab', 'Slack']
      }
    ],
    projects: [
      {
        company: 'HEXING Group',
        duration: '01.2020 — по настоящее время',
        position: 'System Operations Reliability Engineer',
        teamSize: '5 специалистов',
        description: 'Комплексный масштабный проект для электротехнической компании — развертывание полного решения ЦОД (Data Center Solution), настройка физической инфраструктуры и ПО. Проект включает веб-интерфейс биллинговой системы, считывание смарт-счетчиков в реальном времени и дистанционное управление оборудованием.',
        responsibilities: [
          'Разработка и внедрение крупномасштабных технических решений с упором на CRM-биллинг и управление главными данными (MDM)',
          'Обеспечение непрерывной поддержки и устранение неполадок для поддержания стабильности и высокой производительности систем',
          'Конфигурирование и администрирование серверов Windows и Linux',
          'Оптимизация распределения серверных ресурсов с использованием виртуализации (VMWare, Hyper-V)',
          'Использование Ansible и Terraform для автоматизации развертывания инфраструктуры и процессов деплоя',
          'Управление и эксплуатация облачных сред в AWS (EC2) с контролем затрат и производительности',
          'Администрирование СУБД Oracle (установка, конфигурирование, мониторинг и тюнинг производительности)',
          'Обеспечение безопасности, профилактическое обслуживание, создание планов бэкапа и катастрофоустойчивости (Disaster Recovery)'
        ],
        techStack: ['Windows', 'Linux', 'Nginx', 'Apache', 'VMWare', 'Hyper-V', 'Docker', 'Kubernetes', 'Zabbix', 'Ansible', 'Terraform', 'Veeam', 'AWS', 'Bash', 'MSSQL', 'Oracle', 'Jira', 'Slack']
      },
      {
        company: 'ZTE Corporation',
        duration: '07.2015 — 12.2019',
        position: 'System Operations Reliability Engineer',
        teamSize: '2 специалиста',
        description: 'Обслуживание глобальных операторов связи, государственных и корпоративных заказчиков более чем в 160 странах и регионах мира.',
        responsibilities: [
          'Установка, настройка и управление серверами Linux и Windows для различных приложений и сервисов',
          'Оптимизация конфигураций серверов для повышения надежности и управления ресурсами',
          'Установление и обеспечение соблюдения протоколов безопасности для защиты систем от несанкционированного доступа',
          'Управление учетными записями пользователей, правами доступа и мониторинг логов безопасности',
          'Диагностика и устранение программных, аппаратных и сетевых проблем с минимальным временем простоя',
          'Разработка и реализация стратегий резервного копирования и планов аварийного восстановления (Disaster Recovery)',
          'Создание скриптов автоматизации для оптимизации рутинных задач'
        ],
        techStack: ['Windows', 'Linux', 'Firewall', 'OpenVPN', 'Cisco ASA', 'Barracuda 340', 'ZSR1822E Router', 'HP FC SAN switch', 'H3C SecPath F1050']
      },
      {
        company: 'Rixos The Palm Dubai',
        duration: '10.2014 — 06.2015',
        position: 'System Administrator',
        teamSize: '3 специалиста',
        description: 'Предоставление комплексной технической поддержки и управление IT-инфраструктурой отеля премиум-класса Rixos The Palm Dubai.',
        responsibilities: [
          'Использование инструментов автоматизации для оптимизации рутинных задач и повышения производительности',
          'Внедрение и поддержание стандартов безопасности для защиты систем и данных от киберугроз',
          'Управление хранением данных, процессами резервного копирования и восстановления с помощью Veeam',
          'Конфигурирование Veeam для регулярного бэкапа критической информации',
          'Разработка планов непрерывности бизнеса (Business Continuity) и ликвидации последствий аварий'
        ],
        techStack: ['Windows', 'Veeam', 'Ansible', 'Wireshark', 'nmap', 'n8n', 'Oracle']
      }
    ]
  }
];
