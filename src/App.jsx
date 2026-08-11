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
// ANIMATION INTRO SUBAQUÁTICA (EXECUTA SÓ NO 1º ACESSO DA SESSÃO)
// ============================================================
function UnderwaterIntro({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // 1. Verificar preferência do usuário por movimento reduzido (Acessibilidade)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // 2. Verificar se a intro já foi exibida nesta sessão
    const hasSeenIntro = sessionStorage.getItem('hasSeenUnderwaterIntro')

    if (prefersReducedMotion || hasSeenIntro) {
      setShouldRender(false)
      if (onComplete) onComplete()
      return
    }

    // 3. Salvar registro no sessionStorage para evitar re-execuções na navegação
    sessionStorage.setItem('hasSeenUnderwaterIntro', 'true')

    // 4. Timer para iniciar o fade-out ao atingir o topo da tela
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2200)

    // 5. Timer para remover completamente o componente do DOM após o término
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
      if (onComplete) onComplete()
    }, 2700)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <div className={`underwater-intro-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      {/* SVG Filter para a refração fluida da borda da água */}
      <svg className="intro-svg-filters" aria-hidden="true">
        <defs>
          <filter id="water-wave-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="4s"
                values="0.015 0.03; 0.025 0.05; 0.015 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Massa d'água subindo */}
      <div className="water-rise-container">
        <div className="water-mass">
          <div className="water-surface-line" />
          <div className="water-caustics-glow" />
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ATMOSFERA SUBAQUÁTICA ABISSAL (COM MARINE SNOW E CAUSTICS)
// ============================================================
function UnderwaterAtmosphere() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = window.innerWidth <= 768

    // Estado do mouse com física de suavização
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      speed: 0,
      lastX: width / 2,
      lastY: height / 2,
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      if (isMobile) return
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY

      const dx = e.clientX - mouse.lastX
      const dy = e.clientY - mouse.lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      mouse.speed = Math.min(dist * 0.15, 8)
      mouse.lastX = e.clientX
      mouse.lastY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Partículas Abissais (Marine Snow)
    const particleCount = isMobile ? 25 : 55
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
      speedY: Math.random() * 0.2 + 0.05,
      speedX: Math.random() * 0.1 - 0.05,
      drift: Math.random() * Math.PI * 2,
    }))

    // Luzes de Caustics Subaquáticos
    const causticBlobs = [
      { x: width * 0.2, y: height * 0.2, radius: 400, angle: 0, speed: 0.0007, color: 'rgba(14, 165, 233, 0.035)' },
      { x: width * 0.8, y: height * 0.3, radius: 480, angle: 2, speed: 0.0005, color: 'rgba(56, 189, 248, 0.025)' },
      { x: width * 0.5, y: height * 0.75, radius: 520, angle: 4, speed: 0.0004, color: 'rgba(3, 105, 161, 0.030)' },
    ]

    let time = 0

    const render = () => {
      time += 0.012

      // Suavização do movimento do mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05
      mouse.speed *= 0.95

      ctx.clearRect(0, 0, width, height)

      // 1. Fundo Oceânico Abissal com gradiente senoidal
      const bgGradient = ctx.createLinearGradient(
        width * 0.5 + Math.sin(time * 0.2) * 40,
        0,
        width * 0.5 - Math.sin(time * 0.2) * 40,
        height
      )
      bgGradient.addColorStop(0, '#010306')
      bgGradient.addColorStop(0.5, '#040812')
      bgGradient.addColorStop(1, '#010204')

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // 2. Caustics (Luzes de Água em Movimento)
      causticBlobs.forEach((blob) => {
        blob.angle += blob.speed
        const offsetX = Math.cos(blob.angle * 1.4) * 70 + Math.sin(time * 0.4) * 30
        const offsetY = Math.sin(blob.angle * 1.1) * 70 + Math.cos(time * 0.3) * 30

        const cx = blob.x + offsetX
        const cy = blob.y + offsetY

        const gradient = ctx.createRadialGradient(
          cx, cy, 0,
          cx, cy, blob.radius + Math.sin(time + blob.angle) * 50
        )
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(0.6, 'rgba(3, 15, 30, 0.01)')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cx, cy, blob.radius * 1.2, 0, Math.PI * 2)
        ctx.fill()
      })

      // 3. Marine Snow (Partículas Abissais em Suspensão)
      particles.forEach((p) => {
        p.drift += 0.01
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.drift) * 0.2

        if (p.y > height) {
          p.y = -10
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * (0.8 + Math.sin(p.drift) * 0.2)})`
        ctx.fill()
      })

      // 4. Efeito de perturbação do cursor do mouse
      if (!isMobile) {
        const mouseGlowRadius = 240 + mouse.speed * 20
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseGlowRadius
        )

        const baseAlpha = 0.035 + (mouse.speed * 0.006)
        mouseGradient.addColorStop(0, `rgba(186, 230, 253, ${baseAlpha * 1.6})`)
        mouseGradient.addColorStop(0.4, `rgba(56, 189, 248, ${baseAlpha})`)
        mouseGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseGlowRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="underwater-canvas" />
      <div className="ocean-vignette" />
    </>
  )
}

// ============================================================
// COMPONENTE DE CARD LIQUID GLASS COM REFRAÇÃO INTERATIVA
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
    <div className="ambient-light-container text-zinc-100 selection:bg-cyan-500/20">
      {/* Animacao de Entrada (Inundacao Subaquatica no 1o Acesso) */}
      <UnderwaterIntro />

      {/* Atmosfera Subaquática Escura de Fundo */}
      <UnderwaterAtmosphere />

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
            
            {/* Logo em Glass Box */}
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