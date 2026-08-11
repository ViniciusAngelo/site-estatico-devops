import { useState, useEffect, useRef } from 'react'
import {
  Code,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ChevronDown,
  Monitor,
  Cloud,
  Settings,
  Computer
} from 'lucide-react'
import logo from './assets/logo.jpeg'
import './App.css'

// ============================================================
// COMPONENTE DE ILUMINAÇÃO SUAVE DO CURSOR (SPOTLIGHT DO AMBIENTE)
// ============================================================
function AmbientSpotlight() {
  const spotlightRef = useRef(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let animationFrameId

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <div ref={spotlightRef} className="mouse-spotlight" />
}

// ============================================================
// COMPONENTE DE CARD DE VIDRO COM EFEITO INTERATIVO NO MOUSE
// ============================================================
function GlassCard({ children, className = "", onClick }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`liquid-glass liquid-glass-hover ${className}`}
    >
      {children}
    </div>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "Desenvolvimento de Software",
      description: "Criação de aplicações web e mobile personalizadas, desde o conceito até a implementação final."
    },
    {
      icon: <Database className="w-6 h-6 text-white" />,
      title: "Arquitetura de Sistemas",
      description: "Planejamento e implementação de arquiteturas robustas e escaláveis para seus projetos."
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      title: "Cloud Computing",
      description: "Migração e otimização de sistemas para nuvem, garantindo performance e segurança."
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      title: "Consultoria Técnica",
      description: "Análise e otimização de processos tecnológicos para aumentar a eficiência do seu negócio."
    },
    {
      icon: <Monitor className="w-6 h-6 text-white" />,
      title: "Desenvolvimento Web",
      description: "Sites e aplicações web responsivas com as mais modernas tecnologias do mercado."
    },
    {
      icon: <Computer className="w-6 h-6 text-white" />,
      title: "Hardware",
      description: "Instalação de equipamentos, suporte e manutenção de hardwares."
    }
  ]

  const technologies = [
    "JavaScript", "React", "Node.js", "Python", "Java", "Azure",
    "Docker", "Windows", "MongoDB", "Git", "Linux", "Redes"
  ]

  return (
    <div className="ambient-light-container text-zinc-100 selection:bg-white/20">
      {/* Luz Suave de Fundo */}
      <AmbientSpotlight />

      {/* Navbar Fixa no Topo */}
      <nav className={`navbar-fixed transition-all duration-300 ${
        isScrolled ? 'navbar-glass py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="VA Logo" className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md" />
            <span className="font-bold text-lg tracking-tight text-white">Vinicius Angelo</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-300">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">Início</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">Sobre</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">Serviços</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contato</button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="content-layer min-h-screen">

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* Logo */}
            <div className="p-3 liquid-glass rounded-3xl mb-8">
              <img
                src={logo}
                alt="Vinicius Angelo Logo"
                className="w-28 h-28 rounded-2xl object-cover shadow-2xl"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white tracking-tight">
              Vinicius Angelo
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-zinc-300">
              Engenheiro da Computação
            </h2>

            <p className="text-base md:text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed">
              Especialista em consultoria e desenvolvimento de soluções tecnológicas inovadoras.
              Transformo ideias em realidade digital com excelência técnica e visão estratégica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <button
                onClick={() => scrollToSection('services')}
                className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-xl"
              >
                Ver Serviços
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3.5 rounded-xl liquid-glass liquid-glass-hover text-white font-semibold cursor-pointer"
              >
                Entre em Contato
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
            <ChevronDown className="w-6 h-6 text-zinc-400" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Sobre Mim</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Experiência e Expertise</h3>
                <p className="text-zinc-300 mb-4 leading-relaxed text-sm md:text-base">
                  Como Engenheiro da Computação, possuo sólida experiência em desenvolvimento de software,
                  arquitetura de sistemas e consultoria tecnológica. Minha paixão é criar soluções que
                  realmente fazem a diferença no mundo digital.
                </p>
                <p className="text-zinc-300 mb-8 leading-relaxed text-sm md:text-base">
                  Trabalho com as mais modernas tecnologias do mercado, sempre focado em entregar
                  resultados excepcionais que superem as expectativas dos meus clientes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span key={index} className="liquid-glass text-zinc-200 px-3.5 py-1.5 rounded-xl text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Code className="w-5 h-5 text-white" />, title: "Desenvolvimento", desc: "Aplicações web e mobile de alta qualidade" },
                  { icon: <Database className="w-5 h-5 text-white" />, title: "Arquitetura", desc: "Sistemas robustos e escaláveis" },
                  { icon: <Globe className="w-5 h-5 text-white" />, title: "Consultoria", desc: "Estratégias tecnológicas personalizadas" },
                ].map((item, i) => (
                  <GlassCard key={i} className="p-5 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 rounded-xl icon-glass shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Serviços</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <GlassCard key={index} className="p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="mb-5 p-3 rounded-xl icon-glass w-fit">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Contato</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Vamos Conversar</h3>
                <p className="text-zinc-300 mb-8 leading-relaxed text-sm md:text-base">
                  Pronto para transformar suas ideias em realidade? Entre em contato comigo
                  e vamos discutir como posso ajudar seu projeto a alcançar o próximo nível.
                </p>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl icon-glass shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Email</p>
                      <p className="text-white font-medium text-sm md:text-base">viniciusenterprise03@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl icon-glass shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Telefone</p>
                      <p className="text-white font-medium text-sm md:text-base">+55 (15) 99799-3440</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl icon-glass shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Localização</p>
                      <p className="text-white font-medium text-sm md:text-base">Porto Feliz, Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              <GlassCard className="p-6 rounded-2xl">
                <h4 className="text-lg font-semibold mb-6 text-white">Redes Sociais</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/vncs_ang.exe"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 p-3.5 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-sm text-white">Instagram</p>
                      <p className="text-xs text-zinc-400">@vncs_ang.exe</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/vinicius-gon%C3%A7alves-angelo-949b49215/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 p-3.5 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-sm text-white">LinkedIn</p>
                      <p className="text-xs text-zinc-400">Vinicius Gonçalves Angelo</p>
                    </div>
                  </a>

                  <a
                    href="https://www.github.com/ViniciusAngelo"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 p-3.5 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-sm text-white">GitHub</p>
                      <p className="text-xs text-zinc-400">ViniciusAngelo</p>
                    </div>
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 liquid-glass border-t border-white/10 mt-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <img src={logo} alt="VA Logo" className="w-7 h-7 rounded-lg object-cover" />
              <span className="font-semibold text-white text-sm">Vinicius Angelo</span>
            </div>
            <p className="text-xs text-zinc-400">
              © 2025 Vinicius Angelo. Todos os direitos reservados.
            </p>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App