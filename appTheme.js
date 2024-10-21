const seasonImagesContainer = document.getElementById('seasonImagesContainer');
const themeStylesheetLink = document.getElementById('CSSTheme');
const seasonImages = document.querySelectorAll('.season-image');

// Set initial theme
const initialTheme = localStorage.getItem('theme') || 'autumn';

let currentIndex = 0;

seasonImagesContainer.addEventListener('click', rotateSeasons);

function rotateSeasons() {
    seasonImagesContainer.classList.add('animating');
    const currentImage = seasonImages[currentIndex];
    currentImage.classList.remove('active');
    
    currentIndex = (currentIndex + 1) % seasonImages.length;
    const nextImage = seasonImages[currentIndex];
    
    nextImage.classList.add('active');
    
    setTimeout(() => {
        currentImage.classList.remove('active');
        setTheme(nextImage.dataset.theme);
        seasonImagesContainer.classList.remove('animating');
    }, 1000); // Match this with the animation duration
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    themeStylesheetLink.setAttribute("href", "style-theme-" + theme + ".css");
}




setTheme(initialTheme);

seasonImages.forEach((img, index) => {
    if (img.dataset.theme === initialTheme) {
        currentIndex = index;
        img.classList.add('active');
    }
});