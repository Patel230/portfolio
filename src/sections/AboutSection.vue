<template>
  <section
    id="about"
    class="section about"
    aria-labelledby="about-heading"
  >
    <div class="container">
      <span class="section-label">About</span>
      <h2
        id="about-heading"
        class="section-title"
      >
        <LucideUser class="title-icon" />
        About Me
      </h2>
      <div class="about-content">
        <div class="about-text">
          <p>
            Full Stack Developer building <strong>intelligent applications with AI</strong>. 
            Creating production-ready systems using Python, TypeScript, and modern frameworks.
          </p>
          <p>
            Co-founder of <a
              href="https://graphdone.com/"
              target="_blank"
              rel="noopener noreferrer"
            ><strong>GraphDone</strong></a> - an open-source graph-native project management 
            platform with AI-powered features.
          </p>
          <p>
            Built <a
              href="https://taskdone.gateandtech.in/"
              target="_blank"
              rel="noopener noreferrer"
            ><strong>TaskDone</strong></a> and 
            <strong>30+ Full stack applications powered with Intelligent System</strong>.
          </p>
        </div>
        <aside
          class="about-info"
          aria-label="Personal Information"
        >
          <div class="info-item">
            <span class="info-label">Education</span>
            <span class="info-value">M.Tech Information Security</span>
            <span class="info-sub">ABV-IIITM Gwalior</span>
          </div>
          <div class="info-item">
            <span class="info-label">Location</span>
            <span class="info-value">Gurgaon, India</span>
          </div>
          <div class="info-item">
            <span class="info-label">Status</span>
            <span class="info-value">
              <span
                class="status-indicator"
                aria-hidden="true"
              />
              Available for work
            </span>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { User as LucideUser } from 'lucide-vue-next'
</script>

<style scoped>
.about {
  background-color: var(--bg-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
}

.about-text p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.8;
}

.about-text strong {
  color: var(--text-primary);
  font-weight: 600;
}

.about-text a {
  color: var(--accent);
  border-bottom: 1px solid var(--accent);
  transition: border-bottom-color 0.2s ease, color 0.2s ease;
}

.about-text a strong {
  color: var(--accent);
}

.about-text a:hover {
  border-bottom-color: transparent;
}

.about-text a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.info-item:hover {
  border-color: var(--border);
}

.info-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.title-icon {
  color: #3b82f6;
  width: 28px;
  height: 28px;
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .about-text p {
    font-size: 0.9rem;
  }
  
  .about-info {
    gap: 16px;
  }
  
  .info-item {
    padding: 14px;
  }
  
  .info-value {
    font-size: 0.95rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .about-text p {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
  
  .about-info {
    gap: 12px;
  }
  
  .info-item {
    padding: 12px;
  }
  
  .info-label {
    font-size: 0.65rem;
  }
  
  .info-value {
    font-size: 0.9rem;
  }
  
  .info-sub {
    font-size: 0.8rem;
  }
  
  .status-indicator {
    width: 6px;
    height: 6px;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .about-text p {
    font-size: 0.8rem;
  }
  
  .info-value {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-indicator {
    animation: none;
  }

  .info-item {
    transition: none;
  }
}
</style>
