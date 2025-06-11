"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Mail,
  MessageCircle,
  Smartphone,
  Users,
  Zap,
  ChevronDown,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FuturisticPortfolio() {
  const [activeTab, setActiveTab] = useState("cristian")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Neural Web Apps",
      description: "Aplicaciones web con IA integrada y interfaces adaptativas que aprenden del usuario",
      code: "React + AI",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Quantum Mobile",
      description: "Apps móviles de próxima generación con realidad aumentada y procesamiento cuántico",
      code: "Native + AR",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Blockchain Backend",
      description: "Arquitecturas descentralizadas con smart contracts y bases de datos distribuidas",
      code: "Web3 + Cloud",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Automation",
      description: "Sistemas autónomos que optimizan procesos usando machine learning avanzado",
      code: "ML + Automation",
    },
  ]

  const projects = [
    {
      title: "NeuroCommerce",
      description: "Plataforma de e-commerce con IA predictiva y realidad virtual para shopping inmersivo",
      tech: ["Next.js", "TensorFlow", "WebXR", "Blockchain"],
      status: "LIVE",
      metrics: "2.3M users",
    },
    {
      title: "QuantumCRM",
      description: "Sistema de gestión empresarial con análisis predictivo y automatización inteligente",
      tech: ["React", "Python", "GraphQL", "Redis"],
      status: "BETA",
      metrics: "500K ops/sec",
    },
    {
      title: "MetaFinance",
      description: "App fintech con DeFi, NFTs y pagos instantáneos en el metaverso",
      tech: ["React Native", "Solidity", "Web3", "IPFS"],
      status: "COMING SOON",
      metrics: "∞ possibilities",
    },
  ]

  const developers = {
    cristian: {
      name: "Cristian Escobar",
      role: "Frontend Architect",
      title: "Neural Interface Designer",
      specialties: ["Quantum UI/UX", "AI Integration", "WebXR"],
      experience: "5+ años",
      level: "EXPERT",
      description:
        "Especialista en crear interfaces que trascienden la realidad, fusionando IA con experiencias inmersivas.",
      stats: { projects: 47, clients: 23, satisfaction: 99.8 },
    },
    angel: {
      name: "Angel Villa",
      role: "Backend Architect",
      title: "System Core Engineer",
      specialties: ["Distributed Systems", "Blockchain", "ML Ops"],
      experience: "4+ años",
      level: "EXPERT",
      description: "Arquitecto de sistemas que construye la infraestructura del futuro con tecnologías emergentes.",
      stats: { projects: 52, clients: 31, satisfaction: 99.9 },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-400 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-mono text-cyan-300">SYSTEM_STATUS: ONLINE</span>
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-cyan-400 animate-pulse" />
                <div className="w-1 h-4 bg-cyan-400 animate-pulse delay-100" />
                <div className="w-1 h-4 bg-cyan-400 animate-pulse delay-200" />
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  FUTURE
                </span>
                <span className="block text-white font-mono">{"<DEVELOPERS/>"}</span>
              </h1>

              <div className="font-mono text-cyan-300 text-lg md:text-xl">
                <span className="text-gray-500">{">"}</span> Cristian.Escobar && Angel.Villa
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Arquitectos digitales que construyen el{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
                software del mañana
              </span>{" "}
              con tecnologías que aún no existen en el presente
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold px-8 py-4 rounded-none border-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  INICIAR_PROYECTO()
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 px-8 py-4 rounded-none font-mono"
              >
                <Play className="mr-2 h-5 w-5" />
                DEMO_MODE
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Developer Profiles */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-gray-500 font-mono">{"<"}</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CORE_TEAM
              </span>
              <span className="text-gray-500 font-mono">{"/>"}</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">{">"} Dos mentes. Infinitas posibilidades.</p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-16">
            <div className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 p-2 rounded-none">
              {Object.entries(developers).map(([key, dev]) => (
                <Button
                  key={key}
                  variant={activeTab === key ? "default" : "ghost"}
                  onClick={() => setActiveTab(key)}
                  className={`font-mono px-8 py-3 rounded-none ${
                    activeTab === key
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold"
                      : "text-cyan-300 hover:text-white hover:bg-cyan-500/10"
                  }`}
                >
                  {dev.name.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Developer Card */}
          <div className="max-w-6xl mx-auto">
            <Card className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-none overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left Side - Avatar & Stats */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-12 border-r border-cyan-500/30">
                    <div className="text-center space-y-8">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-500 to-purple-500 rounded-none relative overflow-hidden">
                          <div className="absolute inset-2 bg-black flex items-center justify-center">
                            <Code2 className="h-24 w-24 text-cyan-400" />
                          </div>
                          <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                        </div>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold px-4 py-1 rounded-none">
                          {developers[activeTab as keyof typeof developers].level}
                        </Badge>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(developers[activeTab as keyof typeof developers].stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-cyan-400 font-mono">{value}</div>
                            <div className="text-xs text-gray-400 uppercase font-mono">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Info */}
                  <div className="p-12 space-y-8">
                    <div>
                      <div className="text-sm text-cyan-400 font-mono mb-2">
                        {">"} DEVELOPER_ID: {activeTab.toUpperCase()}
                      </div>
                      <h3 className="text-4xl font-black text-white mb-2">
                        {developers[activeTab as keyof typeof developers].name}
                      </h3>
                      <div className="text-xl text-purple-400 font-mono mb-1">
                        {developers[activeTab as keyof typeof developers].title}
                      </div>
                      <div className="text-cyan-300 font-mono">
                        {developers[activeTab as keyof typeof developers].role}
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg">
                      {developers[activeTab as keyof typeof developers].description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <span className="text-cyan-400 font-mono text-sm">EXPERIENCE_LEVEL:</span>
                        <span className="text-white ml-2 font-bold">
                          {developers[activeTab as keyof typeof developers].experience}
                        </span>
                      </div>

                      <div>
                        <span className="text-cyan-400 font-mono text-sm block mb-3">CORE_TECHNOLOGIES:</span>
                        <div className="flex flex-wrap gap-2">
                          {developers[activeTab as keyof typeof developers].specialties.map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 font-mono rounded-none"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                QUANTUM_SERVICES
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-mono max-w-3xl mx-auto">
              {">"} Tecnologías del futuro disponibles hoy. Construimos lo imposible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-none hover:border-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <CardHeader className="text-center pb-4 relative">
                  {/* Service Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center relative">
                      <div className="absolute inset-1 bg-black flex items-center justify-center">
                        <div className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </CardTitle>

                  <div className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-1 inline-block">
                    {service.code}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-300 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-gray-500 font-mono">{"{"}</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                NEURAL_PROJECTS
              </span>
              <span className="text-gray-500 font-mono">{"}"}</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">{">"} Casos de uso que redefinen industrias completas</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-none hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
              >
                {/* Project Header */}
                <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3),transparent_70%)]" />
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`font-mono text-xs px-2 py-1 rounded-none ${
                        project.status === "LIVE"
                          ? "bg-green-500 text-black"
                          : project.status === "BETA"
                            ? "bg-yellow-500 text-black"
                            : "bg-purple-500 text-white"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-sm">{project.metrics}</div>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-cyan-400 font-mono text-xs mb-2">TECH_STACK:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="border-purple-500/50 text-purple-300 font-mono text-xs rounded-none"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 font-mono rounded-none"
                    >
                      ANALYZE_PROJECT()
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-32 bg-gradient-to-t from-black to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ESTABLISH_CONNECTION
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">{">"} Inicializar protocolo de comunicación</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-none overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Contact Info */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-12 border-r border-cyan-500/30">
                    <h3 className="text-3xl font-bold text-white mb-8 font-mono">{">"} CONTACT_PROTOCOLS</h3>

                    <div className="space-y-8">
                      {[
                        { icon: Mail, label: "NEURAL_MAIL", value: "contact@future-devs.ai", protocol: "SMTP_QUANTUM" },
                        {
                          icon: MessageCircle,
                          label: "INSTANT_COMM",
                          value: "+57 300 123 4567",
                          protocol: "WHATSAPP_ENCRYPTED",
                        },
                        {
                          icon: Users,
                          label: "HOLOGRAM_MEET",
                          value: "Schedule Virtual Reality",
                          protocol: "VR_CONFERENCE",
                        },
                      ].map((contact, index) => (
                        <div key={index} className="flex items-start gap-4 group">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black flex items-center justify-center">
                              <contact.icon className="h-5 w-5 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                            </div>
                          </div>
                          <div>
                            <p className="text-cyan-400 font-mono text-sm">{contact.label}</p>
                            <p className="text-white font-semibold">{contact.value}</p>
                            <p className="text-gray-500 font-mono text-xs">{contact.protocol}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="p-12">
                    <h3 className="text-3xl font-bold text-white mb-8 font-mono">{">"} TRANSMISSION_FORM</h3>

                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">USER_NAME:</label>
                          <Input
                            placeholder="Enter designation"
                            className="bg-black/50 border-cyan-500/30 text-white placeholder:text-gray-500 rounded-none font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">ENTITY:</label>
                          <Input
                            placeholder="Organization ID"
                            className="bg-black/50 border-cyan-500/30 text-white placeholder:text-gray-500 rounded-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-cyan-400 font-mono text-sm">COMM_CHANNEL:</label>
                        <Input
                          type="email"
                          placeholder="neural.interface@domain.ai"
                          className="bg-black/50 border-cyan-500/30 text-white placeholder:text-gray-500 rounded-none font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-cyan-400 font-mono text-sm">PROJECT_BRIEF:</label>
                        <Textarea
                          placeholder="Describe your vision for the future..."
                          rows={4}
                          className="bg-black/50 border-cyan-500/30 text-white placeholder:text-gray-500 rounded-none font-mono resize-none"
                        />
                      </div>

                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold py-4 rounded-none font-mono">
                        TRANSMIT_MESSAGE()
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-cyan-500/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white font-mono">
                {"<"}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  FUTURE_DEVELOPERS
                </span>
                {" />"}
              </h3>
              <p className="text-gray-400 font-mono">{">"} Cristian.Escobar && Angel.Villa - Architects of Tomorrow</p>
            </div>

            <div className="flex justify-center gap-8">
              {["GITHUB", "LINKEDIN", "NEURAL_NET"].map((platform) => (
                <Button
                  key={platform}
                  variant="ghost"
                  className="text-cyan-400 hover:text-white font-mono hover:bg-cyan-500/10 rounded-none"
                >
                  {platform}
                </Button>
              ))}
            </div>

            <div className="pt-8 border-t border-cyan-500/30">
              <p className="text-gray-500 font-mono text-sm">
                © 2024 FUTURE_DEVELOPERS.AI - All rights reserved in this dimension
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
