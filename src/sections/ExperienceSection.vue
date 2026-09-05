<template>
  <section id="experience" class="section experience" aria-labelledby="experience-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal
        ><span class="num">03</span> Experience</span
      >
      <h2 id="experience-heading" class="section-title fade-in-up" data-reveal>
        <LucideBriefcase class="title-icon" aria-hidden="true" />
        Where I've Worked
      </h2>
      <div class="timeline">
        <article
          v-for="(job, index) in jobs"
          :key="job.role + job.company"
          class="timeline-item fade-in-up"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          data-reveal
        >
          <div class="timeline-marker" aria-hidden="true" :style="{ '--job-color': job.color }" />
          <div class="timeline-card">
            <div class="job-head">
              <h3 class="job-role">
                {{ job.role }} <span class="job-at">@</span>
                <a
                  v-if="job.url"
                  :href="job.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="job-company"
                  :style="{ color: job.color }"
                  >{{ job.company }}</a
                >
                <span v-else class="job-company" :style="{ color: job.color }">{{
                  job.company
                }}</span>
              </h3>
              <span class="job-dates">{{ job.dates }}</span>
            </div>
            <ul class="job-points">
              <li v-for="point in job.points" :key="point">{{ point }}</li>
            </ul>
            <div class="job-tech">
              <span v-for="tech in job.tech" :key="tech" class="tech-chip">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Briefcase as LucideBriefcase } from 'lucide-vue-next'

const jobs = [
  {
    role: 'AI/ML Infrastructure & Agent Systems Engineer',
    company: 'OmniNode',
    url: 'https://omninode.ai/',
    dates: 'Sep 2026 – Present',
    color: '#6366f1',
    tech: ['Python', 'Kafka', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Keycloak/OIDC'],
    points: [
      'Joined mid-push to beta; traced failures across multiple repositories and validated runtime behaviour within days.',
      'Fixed authentication paths (Keycloak/OIDC) that beta-critical systems depended on.',
      'Build and operate contract-driven agent infrastructure — reliable, observable workflows, not wrappers around LLM APIs.'
    ]
  },
  {
    role: 'Backend Engineer',
    company: 'Monarch Tractor / EnLime Inc',
    url: 'https://www.monarchone.ai/',
    dates: 'Aug 2022 – Nov 2025',
    color: '#db2777',
    tech: [
      'Python',
      'Flask',
      'FastAPI',
      'AWS',
      'MySQL',
      'Redis',
      'InfluxDB',
      'Docker',
      'MQTT',
      'ROS'
    ],
    points: [
      'Built and owned 10+ production REST APIs supporting autonomous tractor operations, fleet tracking, migration workflows, field surveys, and configuration.',
      'Designed AWS-based backend infrastructure (EC2, S3, Lambda, SQS, SNS, ECS, API Gateway, MQTT, CloudFormation) for scalable tractor-to-cloud communication.',
      'Supported 100+ autonomous tractors across commercial farms in the US with 99.5%+ uptime through monitoring, debugging, and incident response.',
      'Built real-time observability pipelines (Telegraf, InfluxDB, Grafana, CloudWatch), cutting production incident response time by 40%.',
      'Optimized MySQL and Redis data layers for telemetry ingestion and reliability at production scale; implemented retry queues, failure handling, and alerting.',
      'Shipped 15+ backend features by collaborating with PMs, farmers, firmware, QA, and robotics engineers; authored runbooks and mentored juniors.'
    ]
  }
]
</script>

<style scoped>
.experience {
  background-color: var(--bg-secondary);
}

.title-icon {
  color: #f59e0b;
  width: 28px;
  height: 28px;
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 28px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, var(--accent), transparent);
  opacity: 0.25;
}

.timeline-item {
  position: relative;
}

.timeline-marker {
  position: absolute;
  left: -28px;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--job-color);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--job-color) 25%, transparent);
}

.timeline-card {
  padding: 20px 22px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.25s var(--ease-spring);
}

.timeline-card:hover {
  border-color: color-mix(in srgb, var(--job-color) 50%, transparent);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
}

.job-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.job-role {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
}

.job-at {
  color: var(--text-muted);
  font-weight: 400;
}

.job-company {
  text-decoration: none;
  font-weight: 700;
  border-bottom: 1px solid transparent;
  transition:
    border-color 0.2s ease,
    filter 0.2s ease;
}

.job-company:hover {
  border-bottom-color: currentColor;
  filter: brightness(1.15);
}

.job-dates {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.job-points {
  list-style: none;
  margin: 0 0 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.job-points li {
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.job-points li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--job-color);
}

.job-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-chip {
  padding: 4px 10px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.72rem;
  color: var(--text-secondary);
}

@media (max-width: 479px) {
  .job-role {
    font-size: 0.98rem;
  }
  .job-dates {
    font-size: 0.72rem;
  }
}
.section-label {
  color: #f59e0b;
}
</style>
