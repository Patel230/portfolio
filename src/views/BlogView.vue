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
    date: 'November 2025 — Present',
    color: '#e11d48',
    title: 'GrayCodeAI — My Own Open Source AI Project',
    body: `
      <p>The day after the layoff, I started building <strong>GrayCodeAI</strong>. My project. Open source. No roadmap handed to me — just a clear conviction about where software development is heading.</p>
      <p>The idea: a place where humans and AI agents build together. Not a chat interface bolted onto a repo. Real agents that understand your codebase, maintain context across sessions, and contribute the way a teammate does — with intention and precision.</p>
      <p>The name comes from Gray code — a binary numeral system where adjacent values differ by exactly one bit. That's the philosophy baked into it: minimal change, maximum signal. AI that moves with precision, not noise.</p>
      <p>It's open source and live at <a href="https://graycodeai.gateandtech.in" target="_blank" rel="noopener noreferrer">graycodeai.gateandtech.in</a>. Actively being built every day.</p>
    `
  },
  {
    id: 5,
    tag: 'Open Source',
    date: 'November 2025 — Present',
    color: '#0891b2',
    title: 'Contributing to Herm & LangDAG',
    body: `
      <p>Alongside building GrayCodeAI, I've been contributing to other open source projects I use and believe in.</p>
      <p><strong>Herm</strong> is an open source developer tooling project — separate from GrayCodeAI, not mine. I contribute to it: CLI UX improvements, cleaner command flows, better error handling. The kind of work that makes every developer who uses the tool move faster. You use something enough, you start fixing what's rough.</p>
      <p><strong>LangDAG</strong> is an open source DAG-based workflow engine for language model pipelines. I contributed graph optimization logic that eliminates redundant LLM calls in multi-step pipelines — less waste, faster execution, lower cost. Right at the intersection of my graph background and AI work.</p>
      <p>Contributing to projects you don't own is a different discipline. The code gets read by maintainers who don't know you, merged on its merits alone. That keeps you sharp.</p>
    `
  },
  {
    id: 6,
    tag: 'Now',
    date: '2026 — Present',
    color: '#10b981',
    title: 'Still Building — Every Day',
    body: `
      <p>Seven months post-layoff. Still going. Output higher than any point in my career.</p>
      <p><strong>GrayCodeAI</strong> is the main thing — open source, actively developed, getting more capable every week.</p>
      <p>The rest of the portfolio keeps growing too: <strong>Iterate</strong> — a self-evolving coding agent in Go, open source. <strong>Growth</strong> — habit tracking and journaling with analytics. <strong>MindShift</strong> — book summaries with audio. <strong>TaskDone</strong> — still live, still used. 30+ projects total, all real, all deployed.</p>
      <p>Pursuing <strong>M.Tech in Information Security at ABV-IIITM Gwalior</strong> in parallel — studying how AI systems can be broken, and how to design ones that hold.</p>
      <p>Based in <strong>Gurgaon</strong>. Available for serious work with serious people. If you're building something real with AI, let's talk.</p>
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
