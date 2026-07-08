"use strict";

const page = {
    menu_placeholder: document.getElementById('menu_placeholder'),
    title_placeholder: document.getElementById('title_placeholder'),
    content_placeholder: document.getElementById('content_placeholder'),
    nav_links: document.getElementsByClassName('nav_link'),
}

function attachEventListners() {
    for (const link of page.nav_links) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('page_content', link.dataset.file)
            getContent(link.dataset.file, page.content_placeholder);
        })
    }
}

function getContent(path, placeholder) {
    return fetch(`components/${path}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fout bij het laden van het bestand');
            }
            return response.text(); // Zet de response om in tekst (HTML)
        })
        .then(data => {
            placeholder.innerHTML = data; // Stop de HTML in de placeholder
        })
        .catch(error => {
            console.error('Er is iets misgegaan:', error);
        });
}

function findPageContent() {
    return localStorage.getItem('page_content') || "home";
}

getContent("title", page.title_placeholder);
getContent(findPageContent(), page.content_placeholder);
getContent("nav", page.menu_placeholder)
    .then(data => {
        attachEventListners();
    });