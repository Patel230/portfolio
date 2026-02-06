/**
 * Analytics composable for tracking page views and events
 * Supports Google Analytics 4 and Plausible out of the box
 *
 * @example
 * const { trackPageView, trackEvent, trackExternalLink } = useAnalytics()
 * trackPageView('/about', 'About Page')
 * trackEvent('button_click', { button: 'contact' })
 * trackExternalLink('https://github.com', 'GitHub Profile')
 */

/** @type {boolean} */
const isDevelopment = import.meta.env.DEV

export function useAnalytics() {
  /**
   * Track a page view
   * @param {string} path - The page path
   * @param {string} title - The page title
   */
  const trackPageView = (path, title) => {
    if (isDevelopment) {
      console.log(`[Analytics] Page view: ${path} - ${title}`)
      return
    }

    try {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: path,
          page_title: title,
          page_location: window.location.href
        })
      }

      // Plausible
      if (window.plausible) {
        window.plausible('pageview', { u: window.location.href })
      }
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  /**
   * Track a custom event
   * @param {string} eventName - The event name
   * @param {Object} [params={}] - Event parameters
   */
  const trackEvent = (eventName, params = {}) => {
    if (isDevelopment) {
      console.log(`[Analytics] Event: ${eventName}`, params)
      return
    }

    try {
      if (window.gtag) {
        window.gtag('event', eventName, params)
      }

      if (window.plausible) {
        window.plausible(eventName, { props: params })
      }
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  /**
   * Track external link clicks
   * @param {string} url - The external URL
   * @param {string} [label=''] - Link label
   */
  const trackExternalLink = (url, label = '') => {
    try {
      const urlObj = new URL(url)
      trackEvent('external_link_click', {
        url,
        label,
        domain: urlObj.hostname,
        transport_type: 'beacon' // Ensures the event is sent even if page unloads
      })
    } catch (error) {
      console.error('Invalid URL for tracking:', url)
    }
  }

  /**
   * Track an exception/error
   * @param {Error} error - The error object
   * @param {boolean} [fatal=false] - Whether the error is fatal
   */
  const trackException = (error, fatal = false) => {
    if (isDevelopment) {
      console.log(`[Analytics] Exception: ${error.message}`, { fatal })
      return
    }

    try {
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.message,
          fatal
        })
      }
    } catch (e) {
      console.error('Analytics exception tracking error:', e)
    }
  }

  return {
    trackPageView,
    trackEvent,
    trackExternalLink,
    trackException
  }
}
