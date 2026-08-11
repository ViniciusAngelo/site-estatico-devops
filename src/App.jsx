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
// EFEITO DE REFRAÇÃO LÍQUIDA SOMENTE NO BACKGROUND
// ============================================================
function LiquidBackground() {
  const displacementMapRef = useRef(null)
  const feTurbulenceRef = useRef(null)
  const blobRef = useRef(null)

  // Controle de posição e física do mouse (Lerp para movimento suave)
  const pos = useRef({ x: -1000, y: -1000 })
  const targetPos = useRef({ x: -1000, y: -1000 })
  const velocity = useRef({ x: 0, y: 0 })
  const opacity = useRef(0)
  const targetOpacity = useRef(0)
  const requestRef = useRef(null)

  useEffect(() => {
    // Desativa a interatividade em telas touch/mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      targetOpacity.current = 1
    }

    const handleMouseLeave = () => {
      targetOpacity.current = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    let time = 0

    const animate = () => {
      // Interpolação suave (Lerp) para inércia
      const ease = 0.06
      const dx = targetPos.current.x - pos.current.x
      const dy = targetPos.current.y - pos.current.y

      velocity.current.x = dx * ease
      velocity.current.y = dy * ease

      pos.current.x += velocity.current.x
      pos.current.y += velocity.current.y

      // Transição suave de opacidade
      opacity.current += (targetOpacity.current - opacity.current) * 0.05

      // Atualiza o blob luminoso de fundo
      if (blobRef.current) {
        blobRef.current.style.left = `${pos.current.x}px`
        blobRef.current.style.top = `${pos.current.y}px`
        blobRef.current.style.opacity = opacity.current.toFixed(2)
      }

      // Calcula velocidade para escalar a distorção óptica do fundo
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const scale = Math.min(Math.max(speed * 1.2, 10), 35) * opacity.current

      if (displacementMapRef.current) {
        displacementMapRef.current.setAttribute('scale', scale.toFixed(2))
      }

      // Ondulação orgânica e contínua da luz do líquido no fundo
      if (feTurbulenceRef.current) {
        time += 0.003
        const freqX = (Math.sin(time) * 0.003 + 0.012).toFixed(4)
        const freqY = (Math.cos(time * 0.8) * 0.003 + 0.012).toFixed(4)
        feTurbulenceRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`)
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <>
      {/* Definições do filtro SVG exclusivo para o Fundo */}
      <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="liquid-bg-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={feTurbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.012"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Camada do Fundo com Distorções e Luz Fluida */}
      <div className="liquid-bg-layer">
        <div className="bg-mesh" />
        <div ref={blobRef} className="liquid-cursor-blob" />
      </div>
    </>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
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
    <div className="liquid-bg-container text-zinc-100 selection:bg-white/20">
      {/* Camada de Fundo Líquido (onde ocorre o efeito) */}
      <LiquidBackground />

      {/* Camada de Conteúdo Nítida (zero distorção nos textos) */}
      <div className="crisp-content-layer min-h-screen">
        
        {/* Navbar com Vidro Flutuante */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'liquid-glass py-3' : 'bg-transparent py-6'
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

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* Container do Logo em Vidro Líquido */}
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
                  <div key={i} className="liquid-glass liquid-glass-hover p-5 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 rounded-xl icon-glass shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
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
                <div key={index} className="liquid-glass liquid-glass-hover p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="mb-5 p-3 rounded-xl icon-glass w-fit">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
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

              <div className="liquid-glass p-6 rounded-2xl">
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
              </div>
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