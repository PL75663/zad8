// Numer indeksu w kodzie: pl75663

// ZADANIE 4: Interakcja (Zmiana motywu i ukrywanie sekcji)
const themeBtn = document.getElementById('theme-toggle-btn');
const themeStyle = document.getElementById('theme-style');
themeBtn.addEventListener('click', () => {
    if (themeStyle.getAttribute('href') === 'red.css') {
        themeStyle.setAttribute('href', 'green.css');
        themeBtn.innerText = 'Zmień motyw (Red)';
    } else {
        themeStyle.setAttribute('href', 'red.css');
        themeBtn.innerText = 'Zmień motyw (Green)';
    }
});

const sectionBtn = document.getElementById('section-toggle-btn');
const projectsSection = document.getElementById('projects-section');
sectionBtn.addEventListener('click', () => {
    if (projectsSection.style.display === 'none') {
        projectsSection.style.display = 'block';
        sectionBtn.innerText = 'Ukryj Projekty';
    } else {
        projectsSection.style.display = 'none';
        sectionBtn.innerText = 'Pokaż Projekty';
    }
});

// ZADANIE 6: Dane z JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const skillsList = document.getElementById('skills-list');
        data.skills.forEach(skill => {
            let li = document.createElement('li');
            li.innerText = skill;
            skillsList.appendChild(li);
        });

        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            let p = document.createElement('p');
            p.innerHTML = `<strong>${project.title}</strong>: ${project.description}`;
            projectsContainer.appendChild(p);
        });
    })
    .catch(err => console.error('Błąd JSON:', err));

// ZADANIE 7: Local Storage
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');

function loadNotes() {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
    notes.forEach((note, index) => {
        let li = document.createElement('li');
        li.innerText = note + " ";
        let delBtn = document.createElement('button');
        delBtn.innerText = 'Usuń';
        delBtn.onclick = () => {
            notes.splice(index, 1);
            localStorage.setItem('myNotes', JSON.stringify(notes));
            loadNotes();
        };
        li.appendChild(delBtn);
        notesList.appendChild(li);
    });
}
loadNotes();

addNoteBtn.addEventListener('click', () => {
    if (noteInput.value.trim() !== '') {
        let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
        notes.push(noteInput.value.trim());
        localStorage.setItem('myNotes', JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
});

// ZADANIE 5 i 8: Formularz, walidacja i Backend (POST)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    document.querySelectorAll('.error-message').forEach(el => el.innerText = '');
    document.getElementById('success-message').style.display = 'none';

    const nameRegex = /\d/; // Sprawdza cyfry
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fname === '' || nameRegex.test(fname)) { document.getElementById('fname-error').innerText = 'Błędne imię (brak cyfr)'; isValid = false; }
    if (lname === '' || nameRegex.test(lname)) { document.getElementById('lname-error').innerText = 'Błędne nazwisko (brak cyfr)'; isValid = false; }
    if (!emailRegex.test(email)) { document.getElementById('email-error').innerText = 'Błędny e-mail'; isValid = false; }
    if (message === '') { document.getElementById('message-error').innerText = 'Wiadomość wymagana'; isValid = false; }

    if (isValid) {
        // ZADANIE 8: Wysłanie danych (POST)
        const payload = { imie: fname, nazwisko: lname, email: email, wiadomosc: message };
        
        // Twoj link z webhook.site:
        fetch('https://webhook.site/d2ba88d3-d4dd-49c1-af0f-6b799b47bce5', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(() => {
            document.getElementById('success-message').style.display = 'block';
            form.reset();
        })
        .catch(err => console.error('Błąd wysyłania:', err));
    }
});
