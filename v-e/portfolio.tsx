"use client"

import { useState } from "react"
import { ArrowRight, Code, Database, Globe, Mail, MessageCircle, Smartphone, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("cristian")

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Desarrollo Web",
      description: "Aplicaciones web modernas con React, Next.js y tecnologías de vanguardia",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Apps Móviles",
      description: "Desarrollo nativo y multiplataforma para iOS y Android",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backend & APIs",
      description: "Arquitecturas escalables con Node.js, Python y bases de datos modernas",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automatización",
      description: "Soluciones que optimizan procesos y aumentan la productividad",
    },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de comercio electrónico con panel administrativo",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Sistema de Gestión",
      description: "CRM personalizado para empresas medianas con dashboard analítico",
      tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "App Móvil Fintech",
      description: "Aplicación de pagos móviles con autenticación biométrica",
      tech: ["React Native", "Firebase", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const developers = {
    cristian: {
      name: "Cristian Escobar",
      role: "Full Stack Developer",
      specialties: ["Frontend", "UI/UX", "React Ecosystem"],
      experience: "5+ años",
      description:
        "Especialista en crear experiencias de usuario excepcionales con código limpio y arquitecturas escalables.",
    },
    angel: {
      name: "Angel Villa",
      role: "Full Stack Developer",
      specialties: ["Backend", "DevOps", "Database Design"],
      experience: "4+ años",
      description:
        "Experto en arquitecturas backend robustas y optimización de rendimiento para aplicaciones de alto tráfico.",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Desarrolladores Full Stack Premium</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Software que
              </span>
              <br />
              <span className="text-white">Transforma Negocios</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Cristian Escobar & Angel Villa - Creamos soluciones tecnológicas innovadoras que impulsan el crecimiento
              de tu empresa
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
              >
                Ver Nuestro Trabajo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conoce al{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Equipo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dos desarrolladores apasionados con experiencia comprobada en crear software excepcional
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-full">
              <Button
                variant={activeTab === "cristian" ? "default" : "ghost"}
                onClick={() => setActiveTab("cristian")}
                className={`rounded-full px-6 py-2 ${activeTab === "cristian" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""}`}
              >
                Cristian Escobar
              </Button>
              <Button
                variant={activeTab === "angel" ? "default" : "ghost"}
                onClick={() => setActiveTab("angel")}
                className={`rounded-full px-6 py-2 ${activeTab === "angel" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""}`}
              >
                Angel Villa
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center">
                      <Code className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {developers[activeTab as keyof typeof developers].name}
                    </h3>
                    <p className="text-xl text-purple-600 font-semibold mb-4">
                      {developers[activeTab as keyof typeof developers].role}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {developers[activeTab as keyof typeof developers].description}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold text-gray-900">Experiencia: </span>
                        <span className="text-purple-600">
                          {developers[activeTab as keyof typeof developers].experience}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-2">Especialidades:</span>
                        <div className="flex flex-wrap gap-2">
                          {developers[activeTab as keyof typeof developers].specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestros{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Servicios
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluciones tecnológicas completas para hacer crecer tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Proyectos{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Algunos ejemplos de nuestro trabajo que han transformado negocios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-purple-200 text-purple-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Comenzar?
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Conversemos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Email</p>
                          <p className="text-white/80">contacto@cristian-angel.dev</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">WhatsApp</p>
                          <p className="text-white/80">+57 300 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Reunión Virtual</p>
                          <p className="text-white/80">Agenda una videollamada</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Nombre"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                        <Input
                          placeholder="Empresa"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Textarea
                        placeholder="Cuéntanos sobre tu proyecto..."
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-full">
                        Enviar Mensaje
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
      <footer className="py-12 bg-slate-900 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cristian Escobar & Angel Villa
              </span>
            </h3>
            <p className="text-white/60 mb-6">Full Stack Developers - Transformando ideas en software excepcional</p>
            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                Portfolio
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                © 2024 Cristian Escobar & Angel Villa. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
