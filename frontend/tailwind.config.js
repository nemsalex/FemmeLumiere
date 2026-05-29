/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Jaune
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400',
    'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900',
    'border-yellow-200', 'border-yellow-300', 'hover:bg-yellow-300',
    // Rose
    'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-400',
    'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800',
    'border-pink-100', 'border-pink-200', 'border-pink-300', 'border-pink-400',
    // Violet
    'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-500',
    'text-purple-600', 'text-purple-700', 'text-purple-800',
    'border-purple-300', 'hover:bg-purple-300',
    // Vert
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-500',
    'text-green-600', 'text-green-700', 'text-green-800',
    'border-green-200', 'border-green-300',
    // Orange
    'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-400',
    'text-orange-600', 'text-orange-700', 'text-orange-800',
    'border-orange-100', 'border-orange-200',
    // Bleu
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-400',
    'text-blue-600', 'text-blue-700', 'text-blue-800',
    'border-blue-100', 'border-blue-200',
    // Rouge
    'bg-red-50', 'bg-red-100',
    'text-red-500', 'text-red-600',
    'border-red-200',
    // Gris
    'bg-gray-50', 'bg-gray-100',
    'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800',
    'border-gray-200',
  ],
  plugins: [],
}