<template>
  <section id="contact" class="section contact" aria-labelledby="contact-heading">
    <div class="container">
      <span class="section-label">Contact</span>
      <h2 id="contact-heading" class="section-title">Get in Touch</h2>
      <div 
        class="contact-grid" 
        role="list"
        :aria-label="`${contactItems.length} contact methods`"
      >
        <a 
          v-for="(item, index) in contactItems" 
          :key="item.label"
          :href="item.href"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="contact-item"
          role="listitem"
          @click="handleContactClick(item)"
        >
          <span class="contact-icon" :class="`icon-${index}`" aria-hidden="true">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              :fill="item.fill || 'none'"
              :stroke="item.stroke || 'currentColor'"
              stroke-width="2"
            >
              <path v-for="(path, i) in item.paths" :key="i" :d="path" />
            </svg>
          </span>
          <span class="contact-info">
            <span class="contact-label">{{ item.label }}</span>
            <span class="contact-value">{{ item.value }}</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAnalytics } from '@/composables/useAnalytics.js'

const { trackEvent, trackExternalLink } = useAnalytics()

const contactItems = [
  {
    label: 'Email',
    value: 'lakshmanp230@gmail.com',
    href: 'mailto:lakshmanp230@gmail.com',
    external: false,
    paths: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
    stroke: 'currentColor'
  },
  {
    label: 'GitHub',
    value: '@Patel230',
    href: 'https://github.com/Patel230',
    external: true,
    fill: 'currentColor',
    stroke: 'none',
    paths: ['M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z']
  },
  {
    label: 'LinkedIn',
    value: 'lakshman-patel',
    href: 'https://linkedin.com/in/lakshman-patel',
    external: true,
    fill: 'currentColor',
    stroke: 'none',
    paths: ['M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z']
  },
  {
    label: 'Location',
    value: 'Gurgaon, India',
    href: 'https://maps.google.com/?q=Gurgaon,India',
    external: true,
    paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 10a3 3 0 110-6 3 3 0 010 6z'],
    stroke: 'currentColor'
  },
  {
    label: 'X',
    value: '@Lakshman2302',
    href: 'https://x.com/Lakshman2302',
    external: true,
    fill: 'currentColor',
    stroke: 'none',
    paths: ['M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z']
  },
  {
    label: 'YouTube',
    value: '@gateandtechofficial',
    href: 'https://www.youtube.com/@gateandtechofficial',
    external: true,
    fill: 'currentColor',
    stroke: 'none',
    paths: ['M23.5 6.2a3.02 3.02 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3.02 3.02 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.02 3.02 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z']
  }
]

const handleContactClick = (item) => {
  if (item.external) {
    trackExternalLink(item.href, item.label)
  } else {
    trackEvent('contact_click', {
      type: item.label.toLowerCase(),
      value: item.value
    })
  }
}
</script>

<style scoped>
.contact {
  background-color: var(--bg-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.contact-item:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.contact-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}

.contact-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.contact-icon.icon-0 { background-color: rgba(234, 67, 53, 0.15); color: #ea4335; }
.contact-icon.icon-1 { background-color: rgba(255, 255, 255, 0.1); color: #ffffff; }
.contact-icon.icon-2 { background-color: rgba(10, 102, 194, 0.15); color: #0a66c2; }
.contact-icon.icon-3 { background-color: rgba(34, 197, 94, 0.15); color: #22c55e; }
.contact-icon.icon-4 { background-color: rgba(0, 0, 0, 0.3); color: #ffffff; }
.contact-icon.icon-5 { background-color: rgba(255, 0, 0, 0.15); color: #ff0000; }

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.contact-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.contact-value {
  font-size: 0.9rem;
  color: var(--text-primary);
  word-break: break-all;
}

@media (prefers-reduced-motion: reduce) {
  .contact-item {
    transition: none;
  }

  .contact-item:hover {
    transform: none;
  }
}
</style>
