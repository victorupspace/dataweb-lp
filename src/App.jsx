import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import AppShowcase from './components/AppShowcase'
import Integration from './components/Integration'
import Products from './components/Products'
import CRM from './components/CRM'
import Analytics from './components/Analytics'
import Franchise from './components/Franchise'
import Footer from './components/Footer'
import ContactBar from './components/ContactBar'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <div
        className="app-content"
        style={{
          opacity: splashDone ? 1 : 0,
          transition: splashDone ? 'opacity 0.4s ease 0.1s' : 'none',
        }}
      >
        <Header />
        <main>
          <Hero />
          <AppShowcase />
          <Integration />
          <Products />
          <CRM />
          <Analytics />
          <Franchise />
        </main>
        <Footer />
        <ContactBar />
      </div>
    </>
  )
}
