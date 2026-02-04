<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-logo" aria-hidden="true">{LP}</span>
          <div class="footer-legal">
            <p class="footer-copyright">© 2026 Lakshman Patel. All rights reserved.</p>
            <p class="footer-built">
              Built with 
              <span class="heart-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </span>
              using 
              <a href="https://kilo.ai/" target="_blank" rel="noopener noreferrer" class="footer-link">Kilocode</a>
              &
              <a href="https://opencode.ai/" target="_blank" rel="noopener noreferrer" class="footer-link">Opencode</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 40px 0;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-logo {
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.05em;
}

.footer-legal {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-copyright {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.footer-built {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.heart-icon {
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.footer-link {
  color: var(--accent);
  text-decoration: none;
  transition: opacity 0.2s ease;
  font-weight: 500;
}

.footer-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.footer-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .footer {
    padding: 30px 0;
  }

  .footer-logo {
    font-size: 1.75rem;
  }

  .footer-copyright {
    font-size: 0.85rem;
  }

  .footer-built {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .heart-icon {
    animation: none;
  }
}
</style>
