<template>
  <div class="blog">
    <section class="blog-hero">
      <div class="container">
        <router-link to="/" class="back-link"> ← Back </router-link>
        <h1 class="blog-title">Journey</h1>
        <p class="blog-subtitle">
          From a village farm to Bengaluru, India's Silicon Valley — and everything in between.
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
    tag: 'Roots',
    date: '2010 – 2011',
    color: '#84cc16',
    title: 'The Village, the Farm, and a Dream of Singing',
    body: `
      <p>I grew up in a village. In high school, mornings meant farming and evenings meant studying. My family grew vegetables and sold them at the local market — that was life, and I didn't think much about changing it.</p>
      <p>Back then, if you'd asked me what I wanted to be, I'd have told you: a folk singer. I loved music. I dreamed of performing at local programs at night and farming by day. Engineering wasn't even on the horizon.</p>
      <p>Then the grades came back. They were good — good enough that people around me started saying: go to the city, study further. So I did. I packed up and left the village. That decision changed everything.</p>
    `
  },
  {
    id: 2,
    tag: 'Class 11 & 12',
    date: '2011 – 2013',
    color: '#f59e0b',
    title: 'Moving to the City — Mathematics and a New Direction',
    body: `
      <p>In the city, I chose Mathematics as my core subject for Class 11 and 12. It was a serious shift from the life I'd known — no more early mornings in the field, just textbooks, problems, and figuring out how to keep up with classmates who'd been in cities their whole lives.</p>
      <p>I studied properly and completed my K-12. The discipline from those farming years helped more than I expected — I knew how to work hard without needing someone to watch over me.</p>
    `
  },
  {
    id: 3,
    tag: 'Kota',
    date: '2013 – 2014',
    color: '#f97316',
    title: 'Kota — Chasing IIT, Landing Somewhere Real',
    body: `
      <p>After Class 12, I went to Kota — the place every Indian student goes when they want to crack IIT-JEE. The coaching culture there is intense. Everyone around you is grinding for the same seats at the same institutions.</p>
      <p>I gave it my best shot. I didn't make IIT. But I qualified well enough to get into a government engineering college under the Border Security Force (BSF). Not what I'd dreamed of, but a real engineering seat — and I decided to make the most of it.</p>
    `
  },
  {
    id: 4,
    tag: 'BE Computer Science',
    date: '2014 – 2018',
    color: '#3b82f6',
    title: 'First Code, First Projects — Learning to Build',
    body: `
      <p>I started my Bachelor of Engineering in Computer Science almost knowing nothing about programming. The first few months were humbling — syntax errors, logic errors, errors I didn't even know were possible.</p>
      <p>But something clicked early. Writing code felt like solving puzzles, and I was hooked. I built my first real projects during these years: a library management system, an attendance tracker, small tools that actually worked and that people around me used.</p>
      <p>By the final year I knew this was what I wanted to do — not just as a job, but as a craft. I wanted to keep getting better at it.</p>
    `
  },
  {
    id: 5,
    tag: 'GATE & GATEOverflow',
    date: '2018 – 2020',
    color: '#8b5cf6',
    title: 'GATE Prep, Part-Time Work, and Becoming Independent',
    body: `
      <p>In my final semester, while preparing for the GATE exam, I started a part-time job at <strong>GATEOverflow</strong> — an online community for GATE aspirants. I contributed to GO Books, wrote aptitude answers, created TikZ images, worked with LaTeX, and helped build content that thousands of students used to prepare.</p>
      <p>It wasn't glamorous work, but it paid enough to keep me independent. And learning LaTeX and TikZ — technical typesetting tools most people never touch — quietly sharpened my attention to detail in ways I still feel today.</p>
      <p>My first GATE attempt: qualified, but not strongly enough. I took a second shot the following year, scored 43 marks, and earned a seat at <strong>Atal Bihari Vajpayee IIITM Gwalior</strong> for my Master's in Information Security. That felt like a real win.</p>
    `
  },
  {
    id: 6,
    tag: 'M.Tech',
    date: '2020 – 2022',
    color: '#06b6d4',
    title: "Master's at IIITM Gwalior — Security, Systems, and Staying Curious",
    body: `
      <p>IIITM Gwalior was a proper academic environment — cryptography, network security, secure systems design. I dug into it seriously. But I also kept working part-time at GATEOverflow, now contributing to their test series. Later I moved to <strong>GOClasses</strong> and helped build and manage their test series from the ground up.</p>
      <p>It was a strange combination: studying information security by day, writing test questions and grading papers by night, and building side projects whenever I had a spare hour. But it worked. It kept me sharp and self-sufficient through the whole degree.</p>
      <p>By 2022, I had my M.Tech, a solid foundation in security and systems, years of real content work behind me — and I was ready for something bigger.</p>
    `
  },
  {
    id: 7,
    tag: 'Monarch Tractor',
    date: '2022 – 2025',
    color: '#db2777',
    title: 'First Full-Time Job — Python Developer at Monarch Tractor',
    body: `
      <p>My first full-time role was at <strong>Monarch Tractor</strong>, an electric autonomous tractor company. I joined as a Python backend developer — and nothing I'd done before had quite prepared me for the scale and responsibility of production engineering.</p>
      <p>I worked two full years on the US night shift from India. That meant being online and available when California was working — late nights, early mornings, a complete inversion of the normal schedule. It was demanding, but it put me directly in the room (virtually) where real engineering decisions were being made.</p>
      <p>The stack was deep: Python, Flask, FastAPI, AWS, MySQL, Git. I worked on features from scratch and picked up existing ones mid-flight. I got the chance to work alongside the <strong>Foxconn team</strong> on a major integration — that was a different level of coordination and engineering rigour entirely.</p>
      <p>I also led the support team for a period — which taught me that good engineering isn't just writing code, it's communicating clearly under pressure, triaging fast, and keeping people calm when things break in production.</p>
      <p>Three years. Real-world scale. A foundation I'll carry for the rest of my career.</p>
    `
  },
  {
    id: 8,
    tag: 'Layoff',
    date: '12 November 2025',
    color: '#f97316',
    title: 'The Shutdown — And the Decision to Build',
    body: `
      <p>On November 12, 2025, the company made a hard call: funding had dried up over two consecutive quarters, and the entire tech team was let go as operations shut down.</p>
      <p>It wasn't personal. The economics just didn't work. But knowing that doesn't make the morning you get the news any easier — three years of work, late nights, and real care for what you were building, suddenly over.</p>
      <p>I gave myself a short time to sit with it. Then my friend and colleague <strong>Matthew Valancy</strong> and I started talking. We'd both just lost our jobs on the same day. We both had ideas. We decided: let's build our own things.</p>
      <p>That conversation was the start of everything that came next.</p>
    `
  },
  {
    id: 9,
    tag: 'GraphDone',
    date: 'Late 2025',
    color: '#7c3aed',
    title: 'GraphDone — A Decentralised Jira We Built Together',
    body: `
      <p>The first thing Matthew and I built together was <strong>GraphDone</strong> — a decentralised Jira-style ticket system. The idea was to take project management and remove the central server, moving everything onto a graph-based, peer-to-peer architecture.</p>
      <p>We built it, shipped it, and put it in front of people. The feedback was real but the traction wasn't there yet. Rather than force it, we made a conscious choice: step back, build something else for now, and return to GraphDone when the timing is right.</p>
      <p>That decision taught me something important — knowing when to pause a project is as valuable as knowing how to build one. GraphDone isn't dead. It's waiting.</p>
    `
  },
  {
    id: 10,
    tag: 'Open Source',
    date: 'Late 2025 – Present',
    color: '#0891b2',
    title: 'Finding the Open Source Community — Sim AI, Kilocode, Herm',
    body: `
      <p>During this period I started going deeper into open source — not just using projects, but contributing to them.</p>
      <p>I contributed to <strong>Sim AI</strong> and <strong>Kilocode AI</strong>, which sharpened my understanding of how AI tooling gets built at the community level. Different maintainers, different codebases, different cultures — all of it broadening my perspective on what good software collaboration looks like.</p>
      <p>More recently I've been contributing to <strong>Herm</strong> — an open source coding agents project. That one has pulled me in deeply. The problems being solved there — how agents reason, act, and collaborate in a codebase — are exactly the problems I care most about right now.</p>
      <p>Contributing to projects you didn't start is a different kind of discipline. You have to understand before you change anything. You have to be legible to strangers. That pressure makes you a better engineer.</p>
    `
  },
  {
    id: 11,
    tag: "Now — What I'm Building",
    date: '2025 – Present',
    color: '#e11d48',
    title: "Three Things I'm Working on Right Now",
    body: `
      <p>This is where I am today. Three things running in parallel, each one demanding, each one meaningful.</p>

      <p><strong>1. GrayCodeAI</strong> — my main project and the one I care about most. Open source. A platform where humans and AI agents build together. Not AI as a feature — AI as a genuine teammate in the development process. Inside GrayCodeAI I'm building three tools: <strong>Hawk</strong> — a coding agent CLI, <strong>Gitant</strong> — a decentralised GitHub alternative, and <strong>Lark</strong> — a messaging app for developers and agents, like Slack but designed from the start for human-agent collaboration. The name comes from Gray code — a binary system where adjacent values differ by exactly one bit. Precise, intentional, minimal change. That's the ethos. Live at <a href="https://graycodeai.gateandtech.in" target="_blank" rel="noopener noreferrer">graycodeai.gateandtech.in</a>.</p>

      <p><strong>2. Contributing to Herm</strong> — an open source coding agents platform at <a href="https://hermagent.com" target="_blank" rel="noopener noreferrer">hermagent.com</a>. I contribute to the codebase: improving the agent tooling, fixing rough edges, helping push the project forward. It's work I believe in — the overlap with what I'm building in GrayCodeAI is real, and contributing to Herm keeps me sharp and connected to how others are solving similar problems.</p>

      <p><strong>3. Contributing to Graphlings</strong> — Matthew's Digital Life game at <a href="https://graphlings.net" target="_blank" rel="noopener noreferrer">graphlings.net</a>. Matthew and I started this whole chapter together on the same day we were laid off. Now we're building separate things and contributing to each other's work. There's something meaningful about that — two people who hit the same wall on the same morning, now building side by side.</p>

      <p>Based in <strong>Bengaluru</strong> — India's Silicon Valley — pushing every single day. That's not a slogan. It's just how I operate. If you've read this far, you know where I came from. Let's build something together.</p>
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
