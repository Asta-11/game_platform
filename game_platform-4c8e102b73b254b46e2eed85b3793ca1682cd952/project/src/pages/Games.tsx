import React, { useState } from 'react';
import { TowerControl as GameController, Calendar, Star, ArrowRight, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: number;
  title: string;
  developer: string;
  releaseDate: string;
  rating: number;
  image: string;
  description: string;
  status: 'released' | 'upcoming';
}

const games: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2078",
    developer: "Future Games Studio",
    releaseDate: "2024-12-15",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Experience the next generation of open-world gaming in this futuristic RPG.",
    status: 'upcoming'
  },
  {
    id: 2,
    title: "Medieval Legends",
    developer: "Epic Quest Games",
    releaseDate: "2024-08-30",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    description: "Embark on an epic journey through a mythical medieval world.",
    status: 'upcoming'
  },
  {
    id: 3,
    title: "Space Explorer",
    developer: "Cosmic Games",
    releaseDate: "2024-03-15",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=800&q=80",
    description: "Explore the vastness of space in this immersive adventure game.",
    status: 'released'
  }
];

function Games() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'released'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const filteredGames = games.filter(game => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'upcoming' && game.status === 'upcoming') ||
      (filter === 'released' && game.status === 'released');
    
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.developer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <GameController className="mr-2" />
            GameHub
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="h-[50vh] bg-cover bg-center relative"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Discover Your Next Gaming Adventure
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Latest Releases</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              All Games
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'upcoming' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('released')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'released' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Released
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition duration-300">
              <div className="relative">
                <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                {game.status === 'upcoming' && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    Upcoming
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 mb-4">{game.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <GameController size={16} className="mr-2" />
                    {game.developer}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {game.releaseDate}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="text-white">{game.rating}</span>
                  </div>
                  <button className="flex items-center text-purple-400 hover:text-purple-300">
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;