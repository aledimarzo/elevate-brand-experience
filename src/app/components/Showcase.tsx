import { motion } from 'motion/react';

const showcaseImages = [
  {
    url: "https://images.unsplash.com/photo-1665491641262-53155eaac2b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBuZW9uJTIwbGlnaHRzfGVufDF8fHx8MTc3NTE0MzI0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Veicoli di Lusso"
  },
  {
    url: "https://images.unsplash.com/photo-1718592168438-fb990cd0e2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBjYXIlMjBsaWdodHMlMjBuaWdodHxlbnwxfHx8fDE3NzUxNDMyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Polizia & Servizi"
  },
  {
    url: "https://images.unsplash.com/photo-1641650265007-b2db704cd9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXxlbnwxfHx8fDE3NzUwODM5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Città Immersiva"
  }
];

export function Showcase() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Esplora il Mondo
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Immergiti in scenari mozzafiato e vivi avventure indimenticabili
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {image.title}
                </motion.h3>
                <motion.div
                  className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Glow Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
