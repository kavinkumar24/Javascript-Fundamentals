const postsContainer = document.getElementById('posts_container');
const loading = document.getElementById('loading');
let currentPage = 1;

async function fetchPosts(page) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}


function renderPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function loadMorePosts() {
    loading.style.display = 'block';

    const posts = await fetchPosts(currentPage);

    if (posts.length > 0) {
        renderPosts(posts);
        currentPage++;
    } else {
        currentPage = 1;
        renderPosts(await fetchPosts(currentPage));
    }

    loading.style.display = 'none';
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePosts();
    }
});

loadMorePosts();
