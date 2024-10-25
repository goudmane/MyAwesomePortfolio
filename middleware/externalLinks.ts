export default defineNuxtRouteMiddleware((to, from) => {
    // Access route information and modify links as needed
    console.log('Navigating to:', to);
    console.log('Navigating from:', from);

    // Example: Add a custom attribute to all links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.setAttribute('data-custom-attribute', 'value');
    });
})
