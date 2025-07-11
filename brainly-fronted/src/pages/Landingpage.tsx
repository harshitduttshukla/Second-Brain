import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header Navigation */}
      <header className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">Second Brain</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-purple-400">Features</a>
          <a href="#how-it-works" className="hover:text-purple-400">How It Works</a>
          <a href="#pricing" className="hover:text-purple-400">Pricing</a>
        </nav>
        <button className="bg-purple-600 px-4 py-2 rounded-md">Get Started</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Second Brain for Notes, Ideas & Code
          </h2>
          <p className="text-gray-300 mt-4">
            Capture, organize, and connect your thoughts effortlessly.
          </p>
          <div className="flex space-x-4 mt-6">
            <button className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-md">Get Started</button>
            <button className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black">Learn More</button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <motion.div
            className="bg-[#1a1a1d] rounded-lg p-4"
            animate={{ rotateY: 360 }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ perspective: "1000px" }}
          >
            <div className="h-80 bg-gray-900 rounded-md"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-[#1a1a1d]">
        <h3 className="text-3xl font-bold mb-8">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Note Management", desc: "Create, edit, and organize your notes with ease." },
            { title: "Customizable Layout", desc: "Arrange content visually with tags and colors." },
            { title: "Secure Backend", desc: "Built with Node.js, Express, and MongoDB." },
            { title: "Markdown Support", desc: "Write notes using simple markdown formatting." },
            { title: "Dark Mode", desc: "Reduce eye strain with a fully dark-themed UI." },
            { title: "Responsive Design", desc: "Optimized for both desktop and mobile devices." },
            { title: "AI-Powered Suggestions", desc: "Get content suggestions based on your notes." },
            { title: "Cloud Sync", desc: "Access your notes anywhere, anytime." },
            { title: "Multi-User Collaboration", desc: "Share and collaborate on notes in real-time." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#121212] p-6 rounded-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-semibold text-xl">{feature.title}</h4>
              <p className="text-gray-400 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 py-20 flex flex-col items-center justify-center">
        <h3 className="text-3xl md:text-5xl font-bold text-center">
          Ready to Build Your Second Brain?
        </h3>
        <button className="mt-8 bg-purple-700 hover:bg-purple-800 px-8 py-4 rounded-md text-lg">Get Started Now</button>
      </section>

      {/* Footer */}
      <footer className="px-8 py-4 bg-[#1a1a1d] flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">&copy; 2025 Second Brain. All rights reserved.</p>
        <nav className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-purple-400">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-purple-400">Terms</a>
          <a href="#" className="text-gray-400 hover:text-purple-400">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
