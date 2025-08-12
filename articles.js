// Sistema de gestión de artículos para Etherfiles

// Estructura de datos para almacenar artículos
let articles = JSON.parse(localStorage.getItem('etherfiles_articles')) || [];

// Función para agregar un nuevo artículo
function addArticle(articleData) {
    const newArticle = {
        id: Date.now(),
        title: articleData.title,
        subtitle: articleData.subtitle || '',
        content: articleData.content,
        image: articleData.image || '',
        keywords: articleData.keywords || '',
        date: articleData.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };

    articles.unshift(newArticle); // Agregar al inicio
    saveArticles();
    return newArticle;
}

// Función para guardar artículos en localStorage
function saveArticles() {
    localStorage.setItem('etherfiles_articles', JSON.stringify(articles));
}

// Función para cargar artículos en la interfaz
function loadArticles() {
    const articlesGrid = document.getElementById('articlesGrid');

    if (!articlesGrid) return;

    if (articles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-articles">
                No hay artículos publicados aún. 
                <br>
                <a href="editor.html" style="color: #0078d4; text-decoration: none; margin-top: 10px; display: inline-block;">
                    Crear mi primer artículo →
                </a>
            </div>
        `;
        return;
    }

    articlesGrid.innerHTML = articles.map(article => `
        <div class="article-card" data-article-id="${article.id}">
            <div>
                <h3 class="article-title">${article.title}</h3>
                ${article.subtitle ? `<p class="article-subtitle">${article.subtitle}</p>` : ''}
                <div class="article-content">
                    ${article.content.length > 80 ? article.content.substring(0, 80) + '...' : article.content}
                </div>
            </div>
            <div class="article-meta">
                <span style="font-size: 0.7rem;">${new Date(article.date).toLocaleDateString('es-ES')}</span>
                ${article.keywords ? `<span style="font-size: 0.7rem;">${article.keywords.split(',').slice(0, 1).join(', ')}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Función para eliminar un artículo
function deleteArticle(articleId) {
    articles = articles.filter(article => article.id !== articleId);
    saveArticles();
    loadArticles();
}

// Función para obtener un artículo por ID
function getArticle(articleId) {
    return articles.find(article => article.id === articleId);
}

// Función para actualizar un artículo
function updateArticle(articleId, updatedData) {
    const index = articles.findIndex(article => article.id === articleId);
    if (index !== -1) {
        articles[index] = { ...articles[index], ...updatedData };
        saveArticles();
        return articles[index];
    }
    return null;
}

// Exportar funciones para uso global
window.ArticlesManager = {
    addArticle,
    loadArticles,
    deleteArticle,
    getArticle,
    updateArticle,
    articles
}; 