export const contacts = {
  telegram: "https://t.me/neketli",
  email: "mailto:neketli.dev@gmail.com",
  github: "https://github.com/neketli",
  habr: "https://career.habr.com/neketli",
  linkedin: "https://linkedin.com/in/nikita-li-462437256",
  articles: "https://habr.com/ru/users/neketli/articles/",
  lichess: "https://lichess.org/@/neketli",
}

export interface Skill {
  name: string
  level?: number
  description?: string
  services?: string[]
}

export const skillsFrontend: Skill[] = [
  { name: "JavaScript", level: 10 },
  { name: "TypeScript", level: 7 },
  { name: "Vue", level: 9 },
  { name: "Nuxt.js", level: 9 },
  { name: "Store", level: 8, services: ["Vuex", "Pinia", "Vue Query"] },
  { name: "Testing", level: 8, services: ["Jest", "Vitest", "Vue Test Utils", "Playwright"] },
  { name: "CSS", level: 9, services: ["BEM", "Tailwind", "SCSS"] },
  { name: "Build Tools", level: 9, services: ["Vite", "Webpack", "Rollup", "Rspack"] },
  { name: "Performance", level: 7, services: ["Lighthouse", "Core Web Vitals"] },
  { name: "Design", level: 6, services: ["Figma", "UI/UX"] },
  { name: "I18n/A11y", level: 7 },
  { name: "Microfrontends", level: 7 },
]

export const skillsBackend: Skill[] = [
  { name: "Node.js", level: 8 },
  { name: "Golang", level: 7 },
  { name: "SQL", level: 8, services: ["PostgreSQL", "MySQL", "ClickHouse"] },
  { name: "NoSQL & Object Storage", level: 7, services: ["MongoDB", "Redis", "S3"] },
  { name: "Message brokers", level: 7, services: ["Apache Kafka", "RabbitMQ"] },
  { name: "API Design", level: 8, services: ["REST", "GraphQL", "OpenAPI"] },
  { name: "Security", level: 6, services: ["OWASP", "JWT", "OAuth 2.0"] },
  { name: "Architecture", level: 8, services: ["Microservices", "Monoliths", "Serverless"] },
]

export const skillsAI: Skill[] = [
  { name: "LLM Integration", level: 8 },
  { name: "AI Agents & Automation", level: 7 },
  { name: "Vector & Embeddings", level: 5 },
  { name: "AI Development Tools", level: 8 },
]

export const skillsDevops: Skill[] = [
  { name: "Git", level: 9 },
  { name: "CI/CD", level: 8, services: ["GitHub Actions", "GitLab CI"] },
  { name: "Docker", level: 8 },
  { name: "Orchestration", level: 5, services: ["Kubernetes", "Docker swarm", "Ansible"] },
  { name: "Linux", level: 6 },
  { name: "Automation", level: 7, services: ["Bash", "Node", "Python"] },
  { name: "Web and network", level: 7, services: ["Nginx", "Caddy"] },
  { name: "Monitoring", level: 6, services: ["Prometheus", "Grafana", "Loki", "ELK"] },
]

export interface Experience {
  id: string
  site?: string
  stack: string[]
  taskCount: number
}

export const experiences: Experience[] = [
  {
    id: "self",
    taskCount: 3,
    stack: ["HTML", "CSS", "JavaScript", "Vue 2"],
  },
  {
    id: "rvz",
    taskCount: 2,
    stack: ["Vue 2", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "ddos",
    site: "https://ddos-guard.net",
    taskCount: 5,
    stack: ["Vue 2/3", "Nuxt 2/3", "JavaScript", "Jest", "Storybook", "REST"],
  },
  {
    id: "cloud",
    site: "https://reg.cloud",
    taskCount: 6,
    stack: ["Vue 3", "TypeScript", "Jest", "Storybook", "GraphQL", "Microfrontends"],
  },
]
