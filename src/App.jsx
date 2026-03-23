import Header from './components/Header'
import Hero from './components/Hero'
import AppShowcase from './components/AppShowcase'
import Integration from './components/Integration'
import Franchise from './components/Franchise'
import Footer from './components/Footer'
import ContactBar from './components/ContactBar'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppShowcase />
        <Integration />
        <Franchise />
      </main>
      <Footer />
      <ContactBar />
    </>
  )
}
