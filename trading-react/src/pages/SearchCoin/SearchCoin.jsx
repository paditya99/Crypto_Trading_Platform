import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';

const SearchCoin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample cryptocurrency data
  const sampleCoins = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 43250.50, change: 2.34, changeType: 'up' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2680.75, change: -1.24, changeType: 'down' },
    { id: 3, name: 'Binance Coin', symbol: 'BNB', price: 315.40, change: 0.85, changeType: 'up' },
    { id: 4, name: 'Cardano', symbol: 'ADA', price: 0.48, change: -3.12, changeType: 'down' },
    { id: 5, name: 'Solana', symbol: 'SOL', price: 102.35, change: 4.56, changeType: 'up' },
    { id: 6, name: 'Polkadot', symbol: 'DOT', price: 7.82, change: 1.23, changeType: 'up' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = sampleCoins.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Cryptocurrency</h1>
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for coins (e.g., Bitcoin, BTC, Ethereum)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{coin.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${coin.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${coin.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.changeType === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {Math.abs(coin.change)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" variant="outline" className="mr-2">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Buy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No coins found matching "{searchQuery}"</p>
          <p className="text-sm text-gray-400 mt-2">Try searching with different keywords</p>
        </div>
      )}

      {/* Popular Coins */}
      {searchResults.length === 0 && !searchQuery && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Cryptocurrencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleCoins.slice(0, 6).map((coin) => (
              <div key={coin.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{coin.name}</h3>
                    <p className="text-sm text-gray-500">{coin.symbol}</p>
                  </div>
                  <div className={`flex items-center text-sm ${coin.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.changeType === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {Math.abs(coin.change)}%
                  </div>
                </div>
                <p className="text-lg font-bold mb-3">${coin.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCoin; 