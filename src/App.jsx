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
  Smartphone,
  Cloud,
  Settings
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
      icon: <Smartphone className="w-8 h-8" />,
      title: "Aplicações Mobile",
      description: "Desenvolvimento de apps nativos e híbridos para iOS e Android."
    }
  ]

  const technologies = [
    "JavaScript", "React", "Node.js", "Python", "Java", "AWS", 
    "Docker", "PostgreSQL", "MongoDB", "Git", "Linux", "TypeScript"
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="VA Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">Vinicius Angelo</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="hover:text-primary transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="hover:text-primary transition-colors"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-primary transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src={logo} 
              alt="Vinicius Angelo Logo" 
              className="w-24 h-24 mx-auto mb-8 rounded-2xl shadow-lg"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Vinicius Angelo
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Engenheiro da Computação
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Especialista em consultoria e desenvolvimento de soluções tecnológicas inovadoras. 
              Transformo ideias em realidade digital com excelência técnica e visão estratégica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('services')}
                className="text-lg px-8 py-4"
              >
                Ver Serviços
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="text-lg px-8 py-4"
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Sobre Mim</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Experiência e Expertise</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Como Engenheiro da Computação, possuo sólida experiência em desenvolvimento de software, 
                  arquitetura de sistemas e consultoria tecnológica. Minha paixão é criar soluções que 
                  realmente fazem a diferença no mundo digital.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Trabalho com as mais modernas tecnologias do mercado, sempre focado em entregar 
                  resultados excepcionais que superem as expectativas dos meus clientes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Code className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Desenvolvimento</h4>
                        <p className="text-sm text-muted-foreground">
                          Aplicações web e mobile de alta qualidade
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Database className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Arquitetura</h4>
                        <p className="text-sm text-muted-foreground">
                          Sistemas robustos e escaláveis
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Globe className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Consultoria</h4>
                        <p className="text-sm text-muted-foreground">
                          Estratégias tecnológicas personalizadas
                        </p>
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
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Serviços</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
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
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Contato</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-8">Vamos Conversar</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Pronto para transformar suas ideias em realidade? Entre em contato comigo 
                  e vamos discutir como posso ajudar seu projeto a alcançar o próximo nível.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contato@viniciusangelo.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Localização</p>
                      <p className="text-muted-foreground">São Paulo, Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardContent className="p-8">
                    <h4 className="text-xl font-semibold mb-6">Redes Sociais</h4>
                    <div className="space-y-4">
                      <a 
                        href="#" 
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <Instagram className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium">Instagram</p>
                          <p className="text-sm text-muted-foreground">@viniciusangelo</p>
                        </div>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-muted-foreground">linkedin.com/in/viniciusangelo</p>
                        </div>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-muted-foreground">github.com/viniciusangelo</p>
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
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="VA Logo" className="w-8 h-8 rounded" />
            <span className="font-semibold">Vinicius Angelo</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Vinicius Angelo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

