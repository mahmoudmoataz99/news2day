import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Link } from 'react-router-dom';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/articles');
        const articlesData = await response.json();
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-800 to-purple-700 py-32 md:py-40 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to Day Blogs
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Discover insightful Blogs, tutorials, and stories across various topics
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Latest Articles
            </h2>
            <p className="text-gray-500 mt-2">
              Explore our most recent publications
            </p>
          </div>
          <Link to="/allarticles" className="hidden md:inline-flex items-center p-3 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            View All Articles
          </Link>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
            <p className="mt-2 text-gray-500">We couldn't find any articles at the moment.</p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link to="/articles"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
            View All Articles
          </Link>
        </div>
      </main>
    </section>
  );
}

export default HomePage;
