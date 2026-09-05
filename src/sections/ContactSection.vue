<template>
  <section id="contact" class="section contact" aria-labelledby="contact-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Contact</span>
      <h2 id="contact-heading" class="section-title fade-in-up" data-reveal>
        <LucideMail class="title-icon" aria-hidden="true" />
        Get in Touch
      </h2>
      <div class="contact-grid" role="list" :aria-label="`${contactItems.length} contact methods`">
        <a
          v-for="(item, index) in contactItems"
          :key="item.label"
          :href="item.href"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="contact-item fade-in-scale"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          role="listitem"
          data-reveal
          :style="{ '--item-color': item.color }"
        >
          <span
            class="contact-icon"
            aria-hidden="true"
            :style="{
              backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
              color: item.color
            }"
          >
            <Icon :name="item.icon" :size="20" />
          </span>
          <span class="contact-info">
            <span class="contact-label">{{ item.label }}</span>
            <span class="contact-value">{{ item.value }}</span>
          </span>
        </a>
      </div>

      <form class="contact-form fade-in-up" data-reveal novalidate @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-field">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
              required
            />
          </div>
          <div class="form-field">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <div class="form-field">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="5"
            placeholder="Tell me about your project or opportunity…"
            required
          ></textarea>
        </div>
        <button type="submit" class="form-submit" :disabled="sending">
          {{ sending ? 'Sending…' : 'Send Message' }}
        </button>
        <p v-if="status" class="form-status" :class="statusType" role="status" aria-live="polite">
          {{ status }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Icon } from '@/components'
import { contactItems } from '@/data/contact.js'
import { Mail as LucideMail } from 'lucide-vue-next'

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const status = ref('')
const statusType = ref('')

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const submitForm = async () => {
  status.value = ''
  if (!form.name.trim() || !form.message.trim()) {
    statusType.value = 'error'
    status.value = 'Please fill in your name and message.'
    return
  }
  if (!EMAIL_RE.test(form.email.trim())) {
    statusType.value = 'error'
    status.value = 'Please enter a valid email address.'
    return
  }

  sending.value = true
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message
      })
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) {
      statusType.value = 'success'
      status.value = 'Thanks! Your message has been sent.'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      statusType.value = 'error'
      status.value = data.error || 'Something went wrong. Please try again.'
    }
  } catch {
    statusType.value = 'error'
    status.value = 'Network error. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact {
  background-color: var(--bg-secondary);
}

.title-icon {
  color: #ec4899;
  width: 28px;
  height: 28px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.25s var(--ease-spring);
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.contact-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--item-color, var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-spring);
}

.contact-item:hover {
  border-color: color-mix(in srgb, var(--item-color, var(--accent)) 40%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}

.contact-item:hover::after {
  transform: scaleX(1);
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

/* ── Contact form ── */
.contact-form {
  margin-top: 40px;
  padding: 28px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.form-field input,
.form-field textarea {
  padding: 12px 14px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--text-muted);
}

.form-field input:focus-visible,
.form-field textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
  border-color: var(--accent);
}

.form-submit {
  align-self: flex-start;
  padding: 12px 28px;
  background: rgba(236, 72, 153, 0.1);
  border: 1px solid rgba(236, 72, 153, 0.35);
  border-radius: var(--radius-sm);
  color: #ec4899;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s var(--ease-spring);
}

.form-submit:hover:not(:disabled) {
  background: rgba(236, 72, 153, 0.2);
  border-color: rgba(236, 72, 153, 0.6);
  transform: translateY(-2px);
}

.form-submit:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-status {
  font-size: 0.9rem;
  margin: 0;
}

.form-status.success {
  color: #22c55e;
}

.form-status.error {
  color: #f87171;
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-item {
    padding: 14px 16px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .contact-item {
    padding: 12px 14px;
  }

  .contact-icon {
    width: 36px;
    height: 36px;
  }

  .contact-value {
    font-size: 0.85rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .contact-item {
    padding: 10px 12px;
  }

  .contact-icon {
    width: 32px;
    height: 32px;
  }

  .contact-icon svg {
    width: 16px;
    height: 16px;
  }

  .contact-label {
    font-size: 0.65rem;
  }

  .contact-value {
    font-size: 0.8rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .contact-item {
    padding: 8px 10px;
  }

  .contact-value {
    font-size: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-item {
    transition: none;
  }

  .contact-item:hover {
    transform: none;
  }
}
.section-label {
  color: #ec4899;
}
</style>
