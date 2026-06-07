<template>
  <div class="blog">
    <section class="blog-hero">
      <div class="container">
        <router-link to="/" class="back-link"> ← Back </router-link>
        <h1 class="blog-title">Journey</h1>
        <p class="blog-subtitle">
          From Monarch Tractor to a layoff, and everything I've built since. More coming soon.
        </p>
      </div>
    </section>

    <section class="blog-content section">
      <div class="container">
        <div class="posts-list">
          <article v-for="post in [...posts].reverse()" :key="post.id" class="post-card">
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
    tag: 'First Job',
    date: 'June 2022',
    color: '#db2777',
    title: 'Monarch Tractor — My First Real Engineering Job',
    body: `
      <p>Fresh out of college, I joined <strong>Monarch Tractor</strong> — a Silicon Valley company building electric autonomous tractors. My first task was to not break production. My actual job was building APIs and cloud infrastructure for systems that talked to real machines on real farms in California.</p>
      <p>The stack hit me all at once: Python, Flask, FastAPI, AWS, InfluxDB for time-series sensor data, MQTT for IoT, ROS for the robot operating layer. Every service I touched was connected to hardware in the field. A bad deploy could affect a tractor mid-row.</p>
      <p>That weight was a good teacher. I learned what uptime actually means when it's not just a metric but a physical thing in a field. I learned to write code that survives hardware failures, flaky networks, and 3am on-call pages. I learned to review code without ego and receive feedback without defensiveness.</p>
      <p>Three years of that discipline became my foundation. Everything I've built since carries its DNA.</p>
    `
  },
  {
    id: 2,
    tag: 'Side Projects',
    date: '2022–2024',
    color: '#7c3aed',
    title: 'The Done Universe — Building in the Margins',
    body: `
      <p>While working full-time, I was building on the side. Not tutorials. Not clones. Real products with real deployments.</p>
      <p>The "Done" series started from a simple frustration: I had too many unfinished side projects. So I made a rule — everything ships. If it doesn't run in production, it doesn't count.</p>
      <p><strong>GraphDone</strong> was the most ambitious: a graph-native project management platform where tasks and dependencies live as first-class graph nodes in Neo4j. Built with React, GraphQL, TypeScript. It got users. It got real feedback. But running Neo4j at scale alone, without funding, eventually became untenable. It's paused — the idea isn't.</p>
      <p><strong>TaskDone</strong> followed — modern task management with multiple views, graph-based relationships, and analytics. Still live at <a href="https://taskdone.gateandtech.in" target="_blank" rel="noopener noreferrer">taskdone.gateandtech.in</a>.</p>
      <p>Then came SyncDone, DrawDone, ContactDone, DocDone, EnergyDone, MeshDone, FileDone... each one a real attempt at a real problem. Over 30 apps across three years. Some live. Some paused. All mine.</p>
    `
  },
  {
    id: 3,
    tag: 'Layoff',
    date: '12 November 2025',
    color: '#f97316',
    title: 'The Day Everything Changed — And I Chose to Build',
    body: `
      <p>On November 12, 2025, I was laid off.</p>
      <p>No drama. The company had its reasons. These things happen. But it was still a jolt — three years of identity, routine, and purpose, suddenly gone in a morning.</p>
      <p>I spent exactly one day feeling sorry for myself. Then I opened my laptop.</p>
      <p>I'd been watching AI eat software for two years while working inside a company moving at company speed. Now I had no speed limit. No sprint planning. No stakeholder sign-off. Just time, curiosity, and a clear question: <em>what can I build if I go all-in on AI as the actual primitive, not the feature?</em></p>
      <p>That question became the next chapter. And I've been running on it ever since.</p>
    `
  },
  {
    id: 4,
    tag: 'GrayCodeAI',
    date: 'November 2025',
    color: '#e11d48',
    title: 'GrayCodeAI — A Place for Humans and AI Agents to Build Together',
    body: `
      <p>The first thing I built after the layoff was <strong>GrayCodeAI</strong>.</p>
      <p>Not because I had a roadmap. Because I had a conviction: the future of software development isn't AI replacing engineers — it's AI agents and humans working in shared context, sharing a codebase, coordinating on tasks the way a great team does.</p>
      <p>GrayCodeAI is that bet made concrete. A platform where humans and AI agents build together — not autocomplete, not chat, but agents that understand your project, maintain state across sessions, and actually contribute. Built on TypeScript and Next.js with agent orchestration as a first-class primitive.</p>
      <p>The name comes from Gray code — a binary numeral system where adjacent values differ by exactly one bit. Minimal change, maximum precision. That's the kind of AI collaboration worth building: not chaos, not takeover — just intelligent, precise steps forward.</p>
      <p>It's live at <a href="https://graycodeai.gateandtech.in" target="_blank" rel="noopener noreferrer">graycodeai.gateandtech.in</a>. Still evolving every day.</p>
    `
  },
  {
    id: 5,
    tag: 'Open Source',
    date: 'December 2025',
    color: '#0891b2',
    title: 'Herm & LangDAG — Going Deeper Into the Ecosystem',
    body: `
      <p>With more time and more focus, I started contributing more seriously to open source.</p>
      <p><strong>Herm</strong> is a terminal-based Heroku CLI wrapper. I contributed improvements to the CLI UX — better error messages, cleaner command flow, things that matter when you live in the terminal. Small surface area, real impact. Someone opened an issue thanking me within a week.</p>
      <p><strong>LangDAG</strong> was the more interesting contribution. It's a DAG-based workflow engine for language model pipelines — exactly the kind of infrastructure GrayCodeAI sits on top of. I contributed graph optimization logic that eliminated redundant LLM calls in multi-step pipelines. The intersection of my graph obsession and my AI work, in one PR.</p>
      <p>Open source is accountability in public. Your code is read by strangers, debated by maintainers, and merged (or not) on its merits alone. There's no politics, no hierarchy — just the code. I find that clarifying.</p>
    `
  },
  {
    id: 6,
    tag: 'Building Now',
    date: '2026 — Present',
    color: '#10b981',
    title: "What I'm Building Right Now",
    body: `
      <p>Seven months after the layoff, I'm still building — and the output has been the highest of my career.</p>
      <p>GrayCodeAI continues to evolve. The agent coordination layer is getting more capable. The gap between "AI writes code" and "AI collaborates on a codebase" is real, and closing it is the work.</p>
      <p>The Done universe keeps growing. New apps in progress: <strong>Iterate</strong> — a self-evolving coding agent that reads, improves, tests, and commits autonomously (built in Go, open source). <strong>Growth</strong> — a personal tracker for habits, journaling, and progress analytics. <strong>MindShift</strong> — book summaries with audio and key takeaways.</p>
      <p>I'm also pursuing my <strong>M.Tech in Information Security at ABV-IIITM Gwalior</strong>, which has given me a new lens on AI: not just what it can build, but what it can break — and how to design systems that are resilient to both.</p>
      <p>Based in <strong>Gurgaon</strong>. Available for roles where the work is hard, the team is serious, and AI is a genuine primitive — not a marketing slide. If that's you, let's talk.</p>
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
