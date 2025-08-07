
class RandomBrandDisplay {
    constructor() {
        this.brandContainer = null;
        this.apiEndpoint = themeData.templateUrl + '/api/random-brand.php';
        console.log('API Endpoint:', this.apiEndpoint);
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createBrandContainer();
                this.loadRandomBrand();
            });
        } else {
            this.createBrandContainer();
            this.loadRandomBrand();
        }
    }

    createBrandContainer() {
        const footer = document.querySelector('.site-footer');
        const main = document.querySelector('.site-main');
        
        if (!footer || !main) {
            console.warn('No footer or main found to insert brand block');
            return;
        }

        this.brandContainer = document.createElement('section');
        this.brandContainer.className = 'random-brand-section';
        this.brandContainer.innerHTML = `
            <div class="random-brand-container">
                <div class="random-brand-content loading">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Loading brand...</p>
                    </div>
                </div>
            </div>
        `;

        footer.parentNode.insertBefore(this.brandContainer, footer);
    }

    async loadRandomBrand() {
        if (!this.brandContainer) {
            console.warn('Brand container not created');
            return;
        }

        const contentDiv = this.brandContainer.querySelector('.random-brand-content');
        
        try {
            contentDiv.classList.add('loading');

            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Brand loading error');
            }

            this.displayBrand(result.data);

        } catch (error) {
            console.error('Brand loading error:', error);
            this.displayError(error.message);
        }
    }

    displayBrand(brandData) {
        const contentDiv = this.brandContainer.querySelector('.random-brand-content');
        
        console.log('Brand data:', brandData);
        console.log('Logo URL:', brandData.logo);
        
        const brandHTML = `
            <div class="brand-card" style="opacity: 0; transform: translateY(20px);">
             
                <div class="brand-body">
                    <div class="brand-logo">
                        <img src="${brandData.logo}" 
                             alt="Logo" 
                             onerror="console.error('Failed to load image:', this.src); this.parentElement.innerHTML='<div class=\\'logo-placeholder\\'>📦 Логотип не найден</div>'"
                             onload="console.log('Image loaded successfully:', this.src)"
                             loading="lazy">
                    </div>
                    <div class="brand-info">
                        <p class="brand-description">${brandData.description}</p>
                       
                    </div>
                </div>
                
            </div>
        `;

        contentDiv.classList.remove('loading');
        contentDiv.innerHTML = brandHTML;

        setTimeout(() => {
            const brandCard = contentDiv.querySelector('.brand-card');
            if (brandCard) {
                brandCard.style.transition = 'all 0.5s ease';
                brandCard.style.opacity = '1';
                brandCard.style.transform = 'translateY(0)';
            }
        }, 100);
    }

    displayError(errorMessage) {
        const contentDiv = this.brandContainer.querySelector('.random-brand-content');
        
        contentDiv.classList.remove('loading');
        contentDiv.innerHTML = `
            <div class="brand-error">
                <div class="error-icon"></div>
                <p>Failed to load brand</p>
                <small>${errorMessage}</small>
                <button onclick="randomBrand.loadRandomBrand()" class="retry-button">
                    Try Again
                </button>
            </div>
        `;
    }
}

let randomBrand;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        randomBrand = new RandomBrandDisplay();
    });
} else {
    randomBrand = new RandomBrandDisplay();
}
