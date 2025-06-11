"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Zap, Shield, Award, Star, Phone, Mail, MapPin, ChevronDown, Search } from "lucide-react"
import { ProductDetail } from "@/components/product-detail"
import type * as THREE from "three"

// Componente 3D para el hero
function VapeModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.3, 0.4, 2, 16]} />
        <meshStandardMaterial
          color="#a1a1aa"
          metalness={0.95}
          roughness={0.1}
          emissive="#52525b"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.05} />
      </mesh>
    </Float>
  )
}

function BackgroundSpheres() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.5]} position={[-3, 2, -2]}>
          <MeshDistortMaterial color="#a1a1aa" transparent opacity={0.15} distort={0.3} speed={2} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[0.3]} position={[3, -1, -1]}>
          <MeshDistortMaterial color="#71717a" transparent opacity={0.1} distort={0.4} speed={1.5} />
        </Sphere>
      </Float>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.4]} position={[0, -2, -3]}>
          <MeshDistortMaterial color="#d4d4d8" transparent opacity={0.12} distort={0.2} speed={3} />
        </Sphere>
      </Float>
    </>
  )
}

export default function EvokeVapesLanding() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"catalog" | "detail">("catalog")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const products = [
    {
      name: "EVOKE Elite Pro",
      category: "Premium",
      price: "$89.99",
      features: ["5000 Puffs", "Recargable", "Sabores Premium", "Batería Duradera"],
      image: "https://i.imgur.com/wxA8Pcq.png",
      description:
        "El EVOKE Elite Pro es nuestro modelo insignia, diseñado para los usuarios más exigentes que buscan la máxima calidad y rendimiento. Con tecnología de vanguardia y materiales premium.",
      specifications: {
        Capacidad: "5000 Puffs",
        Batería: "1200mAh",
        Resistencia: "0.8Ω Mesh Coil",
        Carga: "USB-C Rápida",
        Dimensiones: "120 x 28 x 18mm",
        Peso: "85g",
      },
      colors: ["Negro Mate", "Plata Premium", "Azul Océano", "Rojo Pasión"],
    },
    {
      name: "EVOKE Classic",
      category: "Estándar",
      price: "$45.99",
      features: ["3000 Puffs", "Desechable", "Múltiples Sabores", "Diseño Compacto"],
      image: "https://i.imgur.com/wxA8Pcq.png",
      description:
        "El EVOKE Classic ofrece la experiencia perfecta para usuarios que buscan calidad y simplicidad. Diseño elegante con rendimiento confiable.",
      specifications: {
        Capacidad: "3000 Puffs",
        Batería: "850mAh",
        Resistencia: "1.2Ω Mesh Coil",
        Tipo: "Desechable",
        Dimensiones: "110 x 25 x 15mm",
        Peso: "65g",
      },
      colors: ["Negro", "Plata", "Azul", "Verde"],
    },
    {
      name: "EVOKE Max",
      category: "Profesional",
      price: "$129.99",
      features: ["8000 Puffs", "Control de Flujo", "Pantalla LED", "Carga Rápida"],
      image: "https://i.imgur.com/wxA8Pcq.png",
      description:
        "El EVOKE Max es la cumbre de la tecnología de vapeo, con características profesionales y control total sobre tu experiencia de vapeo.",
      specifications: {
        Capacidad: "8000 Puffs",
        Batería: "1500mAh",
        Resistencia: "0.6Ω Dual Mesh",
        Pantalla: "OLED Color",
        Dimensiones: "130 x 30 x 20mm",
        Peso: "95g",
      },
      colors: ["Negro Carbón", "Titanio", "Azul Eléctrico", "Rojo Deportivo", "Dorado"],
    },
    {
      name: "EVOKE Mini",
      category: "Compacto",
      price: "$29.99",
      features: ["1500 Puffs", "Ultra Portátil", "Sabores Intensos", "Precio Accesible"],
      image: "https://i.imgur.com/wxA8Pcq.png",
      description:
        "El EVOKE Mini es perfecto para quienes buscan portabilidad sin comprometer la calidad. Compacto, elegante y poderoso.",
      specifications: {
        Capacidad: "1500 Puffs",
        Batería: "500mAh",
        Resistencia: "1.4Ω Mesh Coil",
        Tipo: "Desechable",
        Dimensiones: "95 x 20 x 12mm",
        Peso: "45g",
      },
      colors: ["Negro", "Blanco", "Rosa", "Azul Claro"],
    },
  ]

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "¡Hola! Me interesa conocer más sobre los productos EVOKE VAPES. ¿Podrían brindarme información sobre precios y disponibilidad?",
    )
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank")
  }

  const handleProductClick = (index: number) => {
    setSelectedProduct(index)
    setViewMode("detail")
  }

  const handleBackToCatalog = () => {
    setViewMode("catalog")
    setSelectedProduct(null)
  }

  // Si estamos en vista de detalle, mostrar el componente ProductDetail
  if (viewMode === "detail" && selectedProduct !== null) {
    return (
      <ProductDetail
        product={products[selectedProduct]}
        onBack={handleBackToCatalog}
        onWhatsAppClick={handleWhatsAppClick}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-zinc-950/20 backdrop-blur-2xl border-b border-zinc-800/30"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent tracking-tight"
          >
            EVOKE VAPES
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {["Inicio", "Productos", "Nosotros", "Contacto"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer font-medium tracking-wide"
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-zinc-700/50 backdrop-blur-sm rounded-2xl px-6 py-2 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
              <VapeModel />
              <BackgroundSpheres />
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tighter leading-none">
              EVOKE
              <br />
              <span className="text-6xl md:text-8xl font-light tracking-widest">VAPES</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-zinc-300 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              Experiencias de vapor excepcionales para el futuro
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 hover:from-zinc-700/90 hover:to-zinc-800/90 text-white font-semibold px-12 py-6 text-lg rounded-3xl border border-zinc-700/50 backdrop-blur-xl shadow-2xl transition-all duration-300"
              >
                Explorar Catálogo
                <Search className="w-5 h-5 ml-3" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-zinc-400" />
        </motion.div>
      </section>

      {/* Sobre Nosotros */}
      <section id="nosotros" className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              Excelencia Redefinida
            </h2>
            <p className="text-xl text-zinc-300 max-w-4xl mx-auto font-light leading-relaxed">
              Pioneros en la distribución de productos de vapeo premium, estableciendo nuevos estándares de calidad e
              innovación en la industria.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-16 h-16 text-zinc-300" />,
                title: "Calidad Suprema",
                description:
                  "Cada producto es sometido a rigurosos controles de calidad que superan los estándares internacionales más exigentes.",
              },
              {
                icon: <Zap className="w-16 h-16 text-zinc-300" />,
                title: "Innovación Vanguardista",
                description:
                  "Colaboramos con las marcas más innovadoras para ofrecer tecnología de última generación en cada experiencia.",
              },
              {
                icon: <Award className="w-16 h-16 text-zinc-300" />,
                title: "Legado de Confianza",
                description:
                  "Una década de experiencia nos posiciona como líderes indiscutibles en el mercado premium del vapeo.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
              >
                <Card className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 h-full rounded-3xl overflow-hidden group hover:border-zinc-700/50 transition-all duration-500">
                  <CardContent className="p-10 text-center">
                    <div className="mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">{feature.title}</h3>
                    <p className="text-zinc-300 leading-relaxed font-light">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section id="productos" className="py-32 px-6 bg-zinc-950/50">
        <div className="container mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              Colección Premium
            </h2>
            <p className="text-xl text-zinc-300 max-w-4xl mx-auto font-light leading-relaxed">
              Descubre nuestra selección exclusiva de productos de vapeo, diseñados para ofrecer experiencias
              extraordinarias
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateY: 3 }}
                className="cursor-pointer"
                onClick={() => handleProductClick(index)}
              >
                <Card className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/30 overflow-hidden h-full rounded-3xl group hover:border-zinc-700/50 transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <div className="relative group/image">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-contain p-6 transition-transform duration-500 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-zinc-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-2xl flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                          <Search className="w-4 h-4" />
                          <span className="text-sm font-medium">Ver detalles</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="absolute top-6 right-6 bg-zinc-800/80 backdrop-blur-sm text-white border border-zinc-700/50 rounded-xl px-3 py-1">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{product.name}</h3>
                    <p className="text-3xl font-bold text-zinc-200 mb-6 tracking-tight">{product.price}</p>
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-zinc-300 font-light">
                          <Star className="w-4 h-4 text-zinc-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWhatsAppClick()
                      }}
                      className="w-full bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 hover:from-zinc-700/90 hover:to-zinc-800/90 text-white font-semibold rounded-2xl py-3 border border-zinc-700/50 backdrop-blur-sm transition-all duration-300"
                    >
                      Consultar Precio
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              Conectemos
            </h2>
            <p className="text-xl text-zinc-300 font-light leading-relaxed">
              Estamos aquí para elevar tu experiencia de vapeo al siguiente nivel
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/30 h-full rounded-3xl">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold mb-8 text-white tracking-tight">Información de Contacto</h3>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="bg-zinc-800/50 p-4 rounded-2xl mr-6">
                        <Phone className="w-6 h-6 text-zinc-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">Teléfono</p>
                        <p className="text-zinc-300 font-light">+1 (234) 567-8900</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-zinc-800/50 p-4 rounded-2xl mr-6">
                        <Mail className="w-6 h-6 text-zinc-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">Email</p>
                        <p className="text-zinc-300 font-light">info@evokevapes.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-zinc-800/50 p-4 rounded-2xl mr-6">
                        <MapPin className="w-6 h-6 text-zinc-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">Ubicación</p>
                        <p className="text-zinc-300 font-light">Ciudad, País</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="text-center">
                <div className="mb-10">
                  <div className="bg-zinc-800/30 p-8 rounded-full inline-block mb-8">
                    <MessageCircle className="w-16 h-16 text-zinc-300" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">¿Listo para comenzar?</h3>
                  <p className="text-zinc-300 mb-8 font-light leading-relaxed max-w-md">
                    Contáctanos por WhatsApp para obtener asesoramiento personalizado sobre nuestros productos premium
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 hover:from-zinc-700/90 hover:to-zinc-800/90 text-white px-10 py-6 text-lg rounded-3xl border border-zinc-700/50 backdrop-blur-xl shadow-2xl transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Chatear en WhatsApp
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950/80 backdrop-blur-2xl border-t border-zinc-800/30 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-4xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              EVOKE VAPES
            </motion.div>
            <p className="text-zinc-400 mb-8 font-light text-lg">Experiencias de vapor excepcionales para el futuro</p>
            <div className="flex justify-center space-x-8 mb-10">
              {["Términos", "Privacidad", "Soporte"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors font-light"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <p className="text-zinc-500 text-sm font-light">© 2025 EVOKE VAPES. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsAppClick}
          className="bg-zinc-800/90 hover:bg-zinc-700/90 text-white p-5 rounded-3xl shadow-2xl backdrop-blur-xl border border-zinc-700/50 transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </div>
  )
}
