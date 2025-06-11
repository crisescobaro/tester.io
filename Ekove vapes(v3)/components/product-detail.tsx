"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Star, Zap, Shield, Award, Heart, Share2 } from "lucide-react"
import { ImageZoomViewer } from "./image-zoom-viewer"

interface Product {
  name: string
  category: string
  price: string
  features: string[]
  image: string
  description?: string
  specifications?: { [key: string]: string }
  colors?: string[]
}

interface ProductDetailProps {
  product: Product
  onBack: () => void
  onWhatsAppClick: () => void
}

export function ProductDetail({ product, onBack, onWhatsAppClick }: ProductDetailProps) {
  const specifications = product.specifications || {
    Capacidad: "5000 Puffs",
    Batería: "850mAh",
    Resistencia: "1.2Ω Mesh Coil",
    Carga: "USB-C",
    Dimensiones: "110 x 25 x 15mm",
    Peso: "65g",
  }

  const colors = product.colors || ["Negro", "Plata", "Azul", "Rojo"]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-800/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-zinc-800/50 rounded-2xl px-4 py-2">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al Catálogo
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-zinc-800/50 rounded-2xl p-3">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-zinc-800/50 rounded-2xl p-3">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Imagen del Producto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <Card className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/30 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-zinc-800/80 backdrop-blur-sm text-white border border-zinc-700/50 rounded-xl px-3 py-1">
                    {product.category}
                  </Badge>
                  <ImageZoomViewer
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-[600px] rounded-2xl bg-zinc-800/30"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Información del Producto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Título y Precio */}
            <div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-white">{product.price}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-zinc-400 ml-2">(4.8)</span>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <Card className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Descripción</h3>
                <p className="text-zinc-300 leading-relaxed font-light">
                  {product.description ||
                    `El ${product.name} representa la perfecta fusión entre tecnología avanzada y diseño elegante. Diseñado para ofrecer una experiencia de vapeo excepcional con cada calada, incorpora las últimas innovaciones en tecnología de vapeo para garantizar sabor puro y vapor denso.`}
                </p>
              </CardContent>
            </Card>

            {/* Características Principales */}
            <Card className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Características Principales</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                      <span className="text-zinc-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Especificaciones Técnicas */}
            <Card className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Especificaciones Técnicas</h3>
                <div className="space-y-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-zinc-800/30 last:border-b-0"
                    >
                      <span className="text-zinc-400 font-light">{key}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Colores Disponibles */}
            <Card className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Colores Disponibles</h3>
                <div className="flex gap-4">
                  {colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-zinc-800/50 hover:bg-zinc-700/50 px-4 py-2 rounded-xl border border-zinc-700/30 cursor-pointer transition-all duration-200"
                    >
                      <span className="text-zinc-300 font-light">{color}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Garantías */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-8 h-8" />, title: "Garantía", subtitle: "12 meses" },
                { icon: <Zap className="w-8 h-8" />, title: "Envío", subtitle: "24-48h" },
                { icon: <Award className="w-8 h-8" />, title: "Calidad", subtitle: "Premium" },
              ].map((item, index) => (
                <Card key={index} className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/30 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-zinc-300 mb-2 flex justify-center">{item.icon}</div>
                    <div className="text-white font-semibold text-sm">{item.title}</div>
                    <div className="text-zinc-400 text-xs">{item.subtitle}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={onWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 hover:from-zinc-700/90 hover:to-zinc-800/90 text-white font-semibold py-4 text-lg rounded-2xl border border-zinc-700/50 backdrop-blur-sm transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar por WhatsApp
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 rounded-2xl border-zinc-700/50 text-white hover:bg-zinc-800/50 backdrop-blur-sm"
              >
                Agregar a Favoritos
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
