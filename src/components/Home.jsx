function Home() {
  return (
    <div
      className="h-screen overflow-hidden flex flex-col items-center justify-center 
                 bg-gradient-to-b from-[#0f1b2d] to-[#0b1320] text-white px-6"
    >
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center tracking-tight">
        Choose your path
      </h1>

      <p className="text-green-400 mb-14 text-lg">
        Two programs. Same output.
      </p>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Casual Card */}
        <a href="/casual">
          <div
            className="w-80 p-8 rounded-2xl bg-[#162338] 
                       border border-white/5
                       shadow-lg
                       hover:scale-105
                       hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]
                       transition-all duration-300 ease-in-out
                       text-center cursor-pointer"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-600 flex items-center justify-center text-xl">
              📋
            </div>

            <h2 className="text-teal-400 font-semibold text-lg mb-2">
              Casual Experience
            </h2>

            <p className="text-gray-400 text-sm">
              Simple, Clean, Direct.
            </p>
          </div>
        </a>

        {/* Dev Card */}
        <a href="/dev">
          <div
            className="w-80 p-8 rounded-2xl bg-[#162338] 
                       border border-white/5
                       shadow-lg opacity-90
                       hover:scale-105
                       hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]
                       transition-all duration-300 ease-in-out
                       text-center cursor-pointer"
          >
            <div
              className="w-12 h-12 mx-auto mb-4 rounded-lg 
                         bg-purple-600 flex items-center justify-center text-xl"
            >
              {"</>"}
            </div>

            <h2 className="text-pink-400 font-semibold text-lg mb-2">
              Programmer Approach
            </h2>

            <p className="text-gray-400 text-sm">
              Reactive, Dynamic, Interactive
            </p>
          </div>
        </a>

      </div>
    </div>
  );
}

export default Home;