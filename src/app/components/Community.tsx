import { motion } from 'motion/react';
import { MessageSquare, Users, Gift, Calendar } from 'lucide-react';

const communityFeatures = [
  {
    icon: MessageSquare,
    title: "Discord Attivo",
    description: "Unisciti alla nostra community su Discord con oltre 2000 membri"
  },
  {
    icon: Users,
    title: "Eventi Settimanali",
    description: "Partecipa agli eventi organizzati dallo staff ogni settimana"
  },
  {
    icon: Gift,
    title: "Giveaway",
    description: "Premi esclusivi e giveaway per i membri più attivi"
  },
  {
    icon: Calendar,
    title: "Competizioni",
    description: "Tornei e competizioni con premi reali e in-game"
  }
];

export function Community() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-black to-purple-950/30 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Unisciti alla Community
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Fai parte di una delle community più attive e accoglienti del panorama italiano
          </p>
        </motion.div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-cyan-500/0 group-hover:from-purple-600/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-300 blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative bg-gradient-to-r from-purple-900/30 via-black to-cyan-900/30 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
            {/* Animated Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Pronto a Iniziare?
                </h3>
                <p className="text-xl text-gray-300">
                  Entra ora e ricevi <span className="text-purple-400 font-bold">50.000€</span> di bonus benvenuto!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* LED Button with Animation */}
                <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10">Entra Ora</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="relative px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-lg hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300">
                  Discord
                </button>
              </div>
            </div>

            {/* Corner Glow Effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
