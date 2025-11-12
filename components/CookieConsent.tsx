'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Settings, Cookie } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
      } catch (e) {
        setShowBanner(true)
      }
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setPreferences(necessaryOnly)
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly))
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Necessary cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="container mx-auto max-w-5xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border shadow-lg">
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Cookie Preferences</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                      You can manage your preferences or accept all cookies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={acceptAll} size="sm">
                        Accept All
                      </Button>
                      <Button onClick={acceptNecessary} variant="outline" size="sm">
                        Necessary Only
                      </Button>
                      <Button 
                        onClick={() => setShowSettings(true)} 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Customize
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBanner(false)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Necessary Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm font-medium text-muted-foreground">Always Active</div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites for advertising purposes.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences and settings for a personalized experience.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={() => togglePreference('preferences')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={acceptNecessary} className="w-full sm:w-auto">
              Necessary Only
            </Button>
            <Button onClick={savePreferences} className="w-full sm:w-auto">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
