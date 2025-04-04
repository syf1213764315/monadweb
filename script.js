// Configuration data (would normally come from a separate file)
const Monadconfig = {
    Accountable: {
        text: "这是 Accountable 的介绍文本。Accountable is a decentralized identity and reputation protocol that enables users to own and control their digital identity across applications.",
        pic: "https://monad-zw.notion.site/image/attachment%3A75c00f2e-7bc2-4e40-8e7c-983d8fd0cc51%3A%25E5%25A4%25A7%25E6%25A9%2599%25E5%25AD%2590.png?table=block&id=187f1add-fcca-8017-8da4-d64c022c6d07&spaceId=9f42c747-53d0-4d5d-852a-e98fd91aab5e&width=250&userId=&cache=v2",
        nft: [
            "https://example.com/nft1.png",
            "https://example.com/nft2.png"
        ],
        x: "https://x.com/xiaoayi1997/status/1896818846365032564",
        tags: ["Identity", "Social", "Infrastructure"]
    },
    MonadSwap: {
        text: "MonadSwap is a decentralized exchange built on Monad, offering lightning-fast trades with minimal fees.",
        pic: "https://via.placeholder.com/300",
        nft: [],
        x: "https://x.com/monadswap",
        tags: ["DeFi", "DEX"]
    },
    MonadNFT: {
        text: "The premier NFT marketplace on Monad, featuring digital art, collectibles, and more.",
        pic: "https://via.placeholder.com/300",
        nft: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300"
        ],
        x: "https://x.com/monadnft",
        tags: ["NFT", "Marketplace"]
    }
};

// Sample project data (would normally come from an API)
const projects = [
    {
        name: "Accountable",
        description: "Decentralized identity and reputation protocol",
        image: "https://monad-zw.notion.site/image/attachment%3A75c00f2e-7bc2-4e40-8e7c-983d8fd0cc51%3A%25E5%25A4%25A7%25E6%25A9%2599%25E5%25AD%2590.png?table=block&id=187f1add-fcca-8017-8da4-d64c022c6d07&spaceId=9f42c747-53d0-4d5d-852a-e98fd91aab5e&width=250&userId=&cache=v2",
        tags: ["Identity", "Social", "Infrastructure"]
    },
    {
        name: "MonadSwap",
        description: "Decentralized exchange with lightning-fast trades",
        image: "https://via.placeholder.com/300",
        tags: ["DeFi", "DEX"]
    },
    {
        name: "MonadNFT",
        description: "Premier NFT marketplace on Monad",
        image: "https://via.placeholder.com/300",
        tags: ["NFT", "Marketplace"]
    },
    {
        name: "MonadLend",
        description: "Decentralized lending and borrowing platform",
        image: "https://via.placeholder.com/300",
        tags: ["DeFi", "Lending"]
    },
    {
        name: "MonadBridge",
        description: "Cross-chain bridge for seamless asset transfers",
        image: "https://via.placeholder.com/300",
        tags: ["Infrastructure", "Bridge"]
    },
    {
        name: "MonadStake",
        description: "Staking platform for Monad validators",
        image: "https://via.placeholder.com/300",
        tags: ["Infrastructure", "Staking"]
    },
    {
        name: "MonadSocial",
        description: "Decentralized social media platform",
        image: "https://via.placeholder.com/300",
        tags: ["Social", "Web3"]
    },
    {
        name: "MonadGames",
        description: "Blockchain gaming platform",
        image: "https://via.placeholder.com/300",
        tags: ["Gaming", "NFT"]
    }
];

// DOM elements
const ecosystemGrid = document.querySelector('.ecosystem-grid');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupEventListeners();
});

// Render projects to the grid
function renderProjects(projects) {
    ecosystemGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.name}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Store the project name as a data attribute for modal lookup
        projectCard.dataset.projectName = project.name;
        
        ecosystemGrid.appendChild(projectCard);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Project card click handler
    ecosystemGrid.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            const projectName = projectCard.dataset.projectName;
            openModal(projectName);
        }
    });
    
    // Modal close handlers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Filter button handlers
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.textContent;
            if (filter === 'All') {
                renderProjects(projects);
            } else {
                const filteredProjects = projects.filter(project => 
                    project.tags.includes(filter)
                );
                renderProjects(filteredProjects);
            }
        });
    });
    
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            renderProjects(projects);
            return;
        }
        
        const filteredProjects = projects.filter(project => 
            project.name.toLowerCase().includes(searchTerm) || 
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        renderProjects(filteredProjects);
    });
}

// Open modal with project details
function openModal(projectName) {
    const projectData = Monadconfig[projectName];
    if (!projectData) {
        console.error(`No data found for project: ${projectName}`);
        return;
    }
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <img src="${projectData.pic}" alt="${projectName}" class="modal-logo">
            <h2 class="modal-title">${projectName}</h2>
        </div>
        <div class="modal-description">
            ${projectData.text}
        </div>
        
        ${projectData.nft.length > 0 ? `
        <div class="modal-section">
            <h3 class="modal-section-title">Featured NFTs</h3>
            <div class="nft-grid">
                ${projectData.nft.map(nft => `
                    <div class="nft-item">
                        <img src="${nft}" alt="NFT">
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${projectData.x ? `
        <div class="modal-section">
            <h3 class="modal-section-title">Community</h3>
            <a href="${projectData.x}" target="_blank" class="x-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
                View on X
            </a>
        </div>
        ` : ''}
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}