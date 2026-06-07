<template>
  <div class="blog">
    <section class="blog-hero">
      <div class="container">
        <router-link to="/" class="back-link"> ← Back </router-link>
        <h1 class="blog-title">My Journey</h1>
        <p class="blog-subtitle">
          From curious student to full-stack AI engineer — the unfiltered story.
        </p>
      </div>
    </section>

    <section class="blog-content section">
      <div class="container">
        <div class="posts-list">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-meta">
              <span class="post-tag" :style="{ '--tag-color': post.color }">{{ post.tag }}</span>
              <span class="post-date">{{ post.date }}</span>
            </div>
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-body" v-html="post.body" />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    tag: 'Origins',
    date: '2019',
    color: '#3b82f6',
    title: 'The Beginning — A Kid Who Just Wanted to Build Things',
    body: `
      <p>I grew up curious. Not the kind that sticks to textbooks, but the kind that takes apart things to see how they work. When I first touched a computer in school, something clicked. Not the browser, not the games — the terminal. That blinking cursor felt like a door.</p>
      <p>My first program was a mess. A Python script that printed my name in a loop. But it <em>ran</em>. That feeling — watching a machine execute your intent — became an obsession.</p>
      <p>I started building small things: calculators, text adventures, scrapers for cricket scores. Each one taught me something new. Each bug taught me patience. I didn't know yet what "full stack" or "AI" meant, but I knew I wanted to build things that mattered.</p>
    `
  },
  {
    id: 2,
    tag: 'Education',
    date: '2020–2022',
    color: '#8b5cf6',
    title: 'Engineering & the Rabbit Hole of Systems',
    body: `
      <p>College opened new doors — and exposed how much I didn't know. Data structures, algorithms, operating systems, computer networks. I dove deep into each, not to pass exams, but because I genuinely wanted to understand how computers think.</p>
      <p>I started contributing to open source during this period. Small things at first — fixing typos in docs, then fixing actual bugs, then writing features. The open source community showed me what collaborative engineering looked like at scale.</p>
      <p>I built my first real web app: a task tracker. It was ugly, had zero tests, and crashed if you clicked the wrong button. But users (my classmates) used it. That was enough.</p>
      <p>I also started getting serious about security — how systems break, how data leaks, how trust can be exploited. This led me to pursue <strong>M.Tech in Information Security at ABV-IIITM Gwalior</strong>, one of India's top institutions for it.</p>
    `
  },
  {
    id: 3,
    tag: 'First Real Job',
    date: '2022–2023',
    color: '#db2777',
    title: 'Monarch Tractor — Where Scale Became Real',
    body: `
      <p>Getting into <strong>Monarch Tractor</strong> felt surreal. A Silicon Valley autonomous farming company. I was building APIs and cloud infrastructure for actual robots working on real farms in California.</p>
      <p>The stack was serious: Python, Flask, FastAPI, AWS, InfluxDB, ROS (Robot Operating System), MQTT for IoT sensors. Data from tractors flowed through systems I helped build. If my code had a bug, a tractor might behave wrong in a field.</p>
      <p>That responsibility sharpened me fast. I learned what production engineering means — 99.9% uptime isn't a metric, it's a discipline. I learned to write code that survives traffic spikes, hardware failures, and network partitions.</p>
      <p>Beyond the technical, I learned how great teams work: code reviews that don't feel like attacks, postmortems without blame, documentation as a first-class concern.</p>
      <p>This was my foundation. Everything I build now carries DNA from what I learned here.</p>
    `
  },
  {
    id: 4,
    tag: 'Building',
    date: '2022–2024',
    color: '#059669',
    title: 'The Done Universe — Building 30+ Products',
    body: `
      <p>Parallel to my career, I was building. Constantly. What started as weekend experiments became a philosophy: <em>ship something real, learn from it, improve it</em>.</p>
      <p>The "Done" series was born out of frustration with incomplete side projects. Everything needed to be functional, deployed, and real — not just a GitHub repo with 3 commits.</p>
      <p><strong>TaskDone</strong> was first: modern task management with graph-based relationships, multiple views, and analytics. Built with TypeScript, Next.js, Neo4j, and deployed on Cloudflare. Real users, real feedback.</p>
      <p><strong>GraphDone</strong> came next — my most ambitious project. Graph-native project management where tasks and dependencies are first-class graph nodes. Built on Neo4j, React, and GraphQL. It was featured and got real users, but the infrastructure cost became unsustainable for a solo project without funding. It's paused, not dead.</p>
      <p>Then came the cascade: TaskDone, SyncDone, DrawDone, ContactDone, DocDone, SecureDone... Each one solving a real problem, each one teaching me something new about systems design, UX, or scalability.</p>
      <p>Over 30 apps. Some live. Some paused. All real. All mine.</p>
    `
  },
  {
    id: 5,
    tag: 'AI Era',
    date: '2023–2024',
    color: '#e11d48',
    title: 'GrayCodeAI — Where Humans and AI Build Together',
    body: `
      <p>When LLMs went mainstream, I didn't chase the hype. I asked: <em>what does AI actually change about how software gets built?</em></p>
      <p>The answer: everything. Not because AI writes perfect code, but because the collaboration between human intent and AI capability unlocks a new category of velocity. You can prototype ideas that would have taken weeks in hours. You can iterate on systems that would have taken months in days.</p>
      <p><strong>GrayCodeAI</strong> is my answer to that question made concrete. A platform where humans and AI agents build together — not just AI-assisted autocomplete, but genuine AI agents that understand context, maintain state, and contribute meaningfully to a codebase.</p>
      <p>It's built on TypeScript, Next.js, with AI agent orchestration as a first-class primitive. The name "GrayCode" comes from Gray code — a binary numeral system where adjacent values differ by exactly one bit. It represents the idea of intelligent, minimal, precise transitions. That's what good AI-human collaboration should feel like.</p>
      <p>This is where most of my energy goes now. It's not just a product. It's a thesis about the future of engineering.</p>
    `
  },
  {
    id: 6,
    tag: 'Open Source',
    date: '2023–Present',
    color: '#0891b2',
    title: 'Herm & LangDAG — Contributing Back',
    body: `
      <p>Building in private is easy. Contributing publicly is accountability.</p>
      <p><strong>Herm</strong> is a terminal-based Heroku CLI wrapper. I contributed improvements to the CLI UX, making it more intuitive for developers who live in the terminal. Small contribution, real impact — people thanked me in the issues.</p>
      <p><strong>LangDAG</strong> is more interesting: a DAG-based workflow engine for language model pipelines. I contributed graph optimization logic that reduced redundant LLM calls in complex workflows. This is the intersection of my graph obsession and AI work.</p>
      <p>Open source taught me something school can't: how to write code for strangers. Code that other developers will read, maintain, debate, and extend. It's humbling and precise work.</p>
      <p>I continue contributing. Whenever I use a tool that has a rough edge, I try to file a PR, not just an issue.</p>
    `
  },
  {
    id: 7,
    tag: 'Growth',
    date: '2024',
    title: 'The Tools — What I Actually Use to Build',
    color: '#f59e0b',
    body: `
      <p>People ask what my stack is. Here's the honest answer: it depends on the problem, but there are patterns.</p>
      <p><strong>Languages:</strong> TypeScript is my default for anything web. Python for AI/ML pipelines and data work. Go when I need performance and concurrency without the complexity of Rust. Rust when I need maximum performance (MeshDone, FileDone). Shell script for glue.</p>
      <p><strong>Frontend:</strong> Vue.js for my own projects (this portfolio is Vue 3 + Vite). React for client work and Next.js for full-stack. I care about performance, accessibility, and actual usability — not just visual polish.</p>
      <p><strong>Backend:</strong> FastAPI and Flask for Python services. NestJS or Fastify for TypeScript. Go's standard library for lean services.</p>
      <p><strong>Data:</strong> PostgreSQL as the default. Neo4j for graph problems (GraphDone, SyncDone). InfluxDB for time-series (Monarch Tractor, Smart Power Grid). Redis for caching and queues.</p>
      <p><strong>Infrastructure:</strong> AWS for serious production workloads. Cloudflare Pages + Workers for edge-deployed apps (this portfolio, TaskDone). Docker everywhere. Linux as my daily driver.</p>
      <p>The most important tool I use: a clear head and a blank file. Starting from understanding beats starting from templates.</p>
    `
  },
  {
    id: 8,
    tag: 'Now',
    date: '2025–Present',
    color: '#10b981',
    title: 'M.Tech at ABV-IIITM Gwalior — Security Meets AI',
    body: `
      <p>I'm currently pursuing <strong>M.Tech in Information Security at ABV-IIITM Gwalior</strong>. The coursework is rigorous: cryptography, network security, secure systems design, vulnerability analysis.</p>
      <p>But what excites me most is the intersection with AI. Security systems powered by AI. AI systems that need to be secured. The attack surface of LLM-based applications is a new frontier, and I'm studying it both theoretically and practically.</p>
      <p>I'm also based in <strong>Gurgaon</strong> and actively available for roles where I can build things that matter — senior engineering, AI product development, or founding engineer positions at companies serious about using AI to reshape how software gets built.</p>
      <p>I'm not looking for a job that pays. I'm looking for a problem worth solving with people worth solving it with.</p>
    `
  },
  {
    id: 9,
    tag: 'Philosophy',
    date: 'Always',
    color: '#6366f1',
    title: 'What I Believe About Building Software',
    body: `
      <p><strong>Ship real things.</strong> A GitHub repo with no deployment is a draft. Real feedback only comes from real usage. I'd rather have a live, imperfect product than a perfect private one.</p>
      <p><strong>Understand your tools.</strong> Every abstraction leaks eventually. When it does, the engineers who understand what's underneath debug in minutes. The others debug for days.</p>
      <p><strong>Build with empathy.</strong> Every line of code is a message to the person who maintains it next — often future you. Make it legible.</p>
      <p><strong>Stay curious, not trendy.</strong> LLMs are genuinely revolutionary. But so was TCP/IP, and so was the relational database. New doesn't mean universally applicable. Think first.</p>
      <p><strong>The best code is no code.</strong> Before writing a system, ask if the problem can be eliminated. Before adding a feature, ask if users actually need it. Constraints force creativity.</p>
      <p>I build because I can't not build. The problems are too interesting and the tools are too good. If you've read this far, maybe you feel the same. Let's build something together.</p>
    `
  }
]
</script>

<style scoped>
.blog {
  min-height: 100vh;
  padding-top: 70px;
}

.blog-hero {
  padding: 50px 0 60px;
  background-color: var(--bg-secondary);
}

.back-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  display: inline-block;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-link:hover {
  color: var(--accent);
  transform: translateX(-4px);
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.blog-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.blog-content {
  background-color: var(--bg-primary);
  padding: 80px 0;
}

.posts-list {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.post-card {
  border-left: 3px solid var(--border);
  padding-left: 28px;
  position: relative;
}

.post-card::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--tag-color) 15%, transparent);
  color: var(--tag-color);
  border: 1px solid color-mix(in srgb, var(--tag-color) 40%, transparent);
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.3;
}

.post-body :deep(p) {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 16px;
}

.post-body :deep(p:last-child) {
  margin-bottom: 0;
}

.post-body :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.post-body :deep(em) {
  color: var(--accent);
  font-style: italic;
}

/* Mobile */
@media (max-width: 767px) {
  .blog-hero {
    padding: 40px 0 50px;
  }

  .blog-title {
    font-size: 1.5rem;
  }

  .blog-content {
    padding: 50px 0;
  }

  .posts-list {
    gap: 40px;
  }

  .post-card {
    padding-left: 20px;
  }

  .post-title {
    font-size: 1.15rem;
  }

  .post-body :deep(p) {
    font-size: 0.9rem;
  }
}

@media (max-width: 479px) {
  .blog-title {
    font-size: 1.25rem;
  }

  .blog-content {
    padding: 40px 0;
  }

  .posts-list {
    gap: 32px;
  }

  .post-title {
    font-size: 1.05rem;
  }

  .post-body :deep(p) {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-link {
    transition: none;
  }

  .back-link:hover {
    transform: none;
  }
}
</style>
