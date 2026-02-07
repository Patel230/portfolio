import pkg from '../package.json?raw'

const parsed = JSON.parse(pkg)

export const APP_VERSION = parsed.version || '2.0.1'
export const BUILD_DATE = parsed.buildDate || 'February 7, 2026'
