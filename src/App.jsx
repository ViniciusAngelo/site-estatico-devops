import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
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

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desenvolvimento de Software",
      description: "Criação de aplicações web e mobile personalizadas, desde o conceito até a implementação final."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Arquitetura de Sistemas",
      description: "Planejamento e implementação de arquiteturas robustas e escaláveis para seus projetos."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Computing",
      description: "Migração e otimização de sistemas para nuvem, garantindo performance e segurança."
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Consultoria Técnica",
      description: "Análise e otimização de processos tecnológicos para aumentar a eficiência do seu negócio."
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Desenvolvimento Web",
      description: "Sites e aplicações web responsivas com as mais modernas tecnologias do mercado."
    },
    {
      icon: <Computer className="w-8 h-8" />,
      title: "Hardware",
      description: "Instalação de equipamentos, suporte e manutenção de hardwares."
    }
  ]

  const technologies = [
    "JavaScript", "React", "Node.js", "Python", "Java", "Azure", 
    "Docker", "Windows", "MongoDB", "Git", "Linux", "Redes"
  ]

  return (
    <div className="min-h-screen text-slate-100 dark">
      {/* Navigation com Liquid Glass ao rolar a página */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'liquid-glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="VA Logo" className="w-10 h-10 rounded-xl shadow-md border border-white/20" />
              <span className="text-xl font-bold tracking-tight">Vinicius Angelo</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors">Início</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">Sobre</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">Serviços</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contato</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src={logo} 
              alt="Vinicius Angelo Logo" 
              className="w-28 h-28 mx-auto mb-8 rounded-3xl shadow-2xl liquid-glass p-2 border border-white/20"
            />
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Vinicius Angelo
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-400 font-medium mb-8">
              Engenheiro da Computação
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Especialista em consultoria e desenvolvimento de soluções tecnológicas inovadoras. 
              Transformo ideias em realidade digital com excelência técnica e visão estratégica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('services')}
                className="text-lg px-8 py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all"
              >
                Ver Serviços
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="text-lg px-8 py-6 rounded-2xl liquid-glass liquid-glass-hover text-white border-white/20"
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Sobre Mim</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Experiência e Expertise</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Como Engenheiro da Computação, possuo sólida experiência em desenvolvimento de software, 
                  arquitetura de sistemas e consultoria tecnológica. Minha paixão é criar soluções que 
                  realmente fazem a diferença no mundo digital.
                </p>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Trabalho com as mais modernas tecnologias do mercado, sempre focado em entregar 
                  resultados excepcionais que superem as expectativas dos meus clientes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} className="liquid-glass border-white/10 px-3 py-1.5 text-xs text-slate-200 rounded-lg">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="liquid-glass border-none text-slate-100 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Code className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Desenvolvimento</h4>
                        <p className="text-sm text-slate-400">Aplicações web e mobile de alta qualidade</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="liquid-glass border-none text-slate-100 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Arquitetura</h4>
                        <p className="text-sm text-slate-400">Sistemas robustos e escaláveis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="liquid-glass border-none text-slate-100 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Consultoria</h4>
                        <p className="text-sm text-slate-400">Estratégias tecnológicas personalizadas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Serviços</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="liquid-glass liquid-glass-hover border-none text-slate-100 rounded-2xl"
                >
                  <CardContent className="p-8">
                    <div className="text-blue-400 mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Contato</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Vamos Conversar</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Pronto para transformar suas ideias em realidade? Entre em contato comigo 
                  e vamos discutir como posso ajudar seu projeto a alcançar o próximo nível.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-400">Email</p>
                      <p className="text-slate-200">viniciusenterprise03@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-400">Telefone</p>
                      <p className="text-slate-200">+55 (15) 99799-3440</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-400">Localização</p>
                      <p className="text-slate-200">Porto Feliz, Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="liquid-glass border-none text-slate-100 rounded-2xl">
                  <CardContent className="p-8">
                    <h4 className="text-xl font-semibold mb-6">Redes Sociais</h4>
                    <div className="space-y-3">
                      <a 
                        href="https://www.instagram.com/vncs_ang.exe" 
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
                      >
                        <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">Instagram</p>
                          <p className="text-xs text-slate-400">@vncs_ang.exe</p>
                        </div>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/vinicius-gonçalves-angelo-949b49215/" 
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
                      >
                        <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">LinkedIn</p>
                          <p className="text-xs text-slate-400">Vinicius Gonçalves Angelo</p>
                        </div>
                      </a>
                      <a 
                         href="https://www.github.com/ViniciusAngelo" 
                         target="_blank"
                         rel="noreferrer"
                         className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
                       >
                         <Github className="w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform" />
                         <div>
                           <p className="font-medium text-sm">GitHub</p>
                           <p className="text-xs text-slate-400">ViniciusAngelo</p>
                         </div>
                       </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 liquid-glass border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="VA Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-slate-200">Vinicius Angelo</span>
          </div>
          <p className="text-sm text-slate-400">
            © 2025 Vinicius Angelo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

