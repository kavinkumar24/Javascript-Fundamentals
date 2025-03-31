function navigateTo() {
    const hash = window.location.hash.replace('#', '') || 'home';
    updateView(hash);
    updateNav(hash);
}

function updateView(route) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    const activeView = document.getElementById(route);

    if (activeView) {
        activeView.classList.add('active');
    } else {
        const errorView = document.createElement('h1');
        errorView.textContent = "404 - Page Not Found";
        document.body.innerHTML = '';
        document.body.appendChild(errorView); 
    }
}

function updateNav(route) {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`a[href="#${route}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

window.onhashchange = navigateTo;

document.addEventListener('DOMContentLoaded', () => {
    navigateTo();
});
