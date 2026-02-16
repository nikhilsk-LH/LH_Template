import './style.css'
import { categories } from './data.js'

// Simple icon mapping since we aren't using a full framework component library
const getIcon = (name) => {
  // SVG paths for Heroicons Outline
  const icons = {
    CurrencyDollarIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
    TruckIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />',
    XCircleIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
    BeakerIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />',
    ChatBubbleLeftRightIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />',
    ClipboardDocumentListIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />'
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3 opacity-90 transition-transform group-hover:scale-110">
    ${icons[name] || ''}
  </svg>`;
}

const app = document.querySelector('#app');
let activeCategory = null;

// Render Toast
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl z-50 animate-bounce transition-all duration-300 flex items-center gap-2';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="font-medium">${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  });
};

const renderTemplateCard = (item, index, categoryTitle) => {
  return `
    <div onclick="window.copyText(this)" 
         data-text="${encodeURIComponent(item.text)}"
         class="group relative bg-brand-yellow rounded-2xl p-8 shadow-md hover:shadow-xl border border-transparent hover:border-white transition-all duration-300 cursor-pointer transform hover:scale-[1.01] overflow-hidden">
      
      <!-- Hover Overlay Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div class="relative z-10">
        <div class="flex justify-between items-start mb-4">
          <span class="bg-white/30 text-brand-dark text-xs font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
            ${categoryTitle ? categoryTitle : `Template ${index + 1}`}
          </span>
          <span class="text-xs text-brand-dark/70 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.052 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25H6.75A2.25 2.25 0 019 6.75v11.25m6-1.5h2.25" />
            </svg>
            Click to copy
          </span>
        </div>
        <p class="text-brand-dark leading-relaxed whitespace-pre-wrap font-medium text-lg">${item.text}</p>
      </div>
    </div>
  `;
};

const renderHome = () => {
  app.innerHTML = `
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <header class="mb-8 text-center animate-fade-in-down flex flex-col items-center">
        <!-- Heart Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-brand-yellow mb-4">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        
        <h1 class="text-4xl md:text-5xl font-extrabold text-brand-yellow mb-6 tracking-tight">
          Laundryheap
        </h1>

        <!-- Search Bar -->
        <div class="w-full max-w-md relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-brand-blue">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input type="text" 
                 id="searchInput"
                 oninput="window.handleSearch(this.value)"
                 placeholder="Search templates..." 
                 class="w-full pl-12 pr-4 py-4 rounded-full bg-brand-yellow text-brand-dark placeholder-brand-dark/50 font-semibold focus:outline-none focus:ring-4 focus:ring-brand-yellow/50 shadow-lg transition-all"
                 autocomplete="off"
          >
        </div>
      </header>
      
      <!-- Category Grid -->
      <div id="categoryGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${categories.map(cat => `
          <div onclick="window.selectCategory('${cat.id}')" 
               class="group cursor-pointer rounded-2xl p-8 ${cat.color} border border-transparent ${cat.hoverBorderColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col items-center justify-center text-center h-48">
            <div class="${cat.textColor} mb-4">
              ${getIcon(cat.icon)}
            </div>
            <h2 class="text-xl font-bold ${cat.textColor} tracking-wide">
              ${cat.title}
            </h2>
          </div>
        `).join('')}
      </div>

      <!-- Search Results (Hidden by default) -->
      <div id="searchResults" class="hidden flex flex-col gap-6 max-w-4xl mx-auto">
        <!-- Results will be injected here -->
      </div>
      
      <div id="noResults" class="hidden text-center text-white/80 py-12">
        <p class="text-xl font-medium">No matching templates found.</p>
      </div>

    </div>
  `;
};

const renderDetail = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return renderHome();

  app.innerHTML = `
    <div class="min-h-screen bg-brand-blue flex flex-col">
      <div class="sticky top-0 z-40 bg-brand-blue/95 backdrop-blur-sm border-b border-white/10 shadow-sm">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onclick="window.goBack()" class="flex items-center text-white hover:text-brand-yellow transition-colors font-medium group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Categories
          </button>
          <h2 class="text-xl font-bold text-brand-yellow flex items-center gap-2">
            ${getIcon(category.icon).replace('w-8 h-8', 'w-6 h-6')}
            ${category.title}
          </h2>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8 max-w-4xl flex-grow">
        <div class="flex flex-col gap-6">
          ${category.items.map((item, index) => renderTemplateCard(item, index)).join('')}
        </div>
      </div>
    </div>
  `;
};

// Global handlers
window.handleSearch = (query) => {
  const categoryGrid = document.getElementById('categoryGrid');
  const searchResults = document.getElementById('searchResults');
  const noResults = document.getElementById('noResults');

  if (!query.trim()) {
    categoryGrid.classList.remove('hidden');
    searchResults.classList.add('hidden');
    noResults.classList.add('hidden');
    return;
  }

  const searchTerm = query.toLowerCase();
  const results = [];

  categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.text.toLowerCase().includes(searchTerm)) {
        results.push({ ...item, categoryTitle: cat.title });
      }
    });
  });

  categoryGrid.classList.add('hidden');

  if (results.length > 0) {
    searchResults.innerHTML = results.map((item, index) =>
      renderTemplateCard(item, index, item.categoryTitle)
    ).join('');
    searchResults.classList.remove('hidden');
    noResults.classList.add('hidden');
  } else {
    searchResults.classList.add('hidden');
    noResults.classList.remove('hidden');
  }
};

window.selectCategory = (id) => {
  activeCategory = id;
  renderDetail(id);
  window.scrollTo(0, 0);
};

window.goBack = () => {
  activeCategory = null;
  renderHome();
};

window.copyText = (el) => {
  const text = decodeURIComponent(el.getAttribute('data-text'));
  copyToClipboard(text);
};

// Initial Render
renderHome();
