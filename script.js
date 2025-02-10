document.getElementById('jsonFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            generatePage(data);
        } catch (error) {
            alert('Błąd pliku JSON');
        }
    };

    reader.readAsText(file);
});

function generatePage(data) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    if (data.warianty && Array.isArray(data.warianty)) {
        data.warianty.forEach(wariant => {
            const div = document.createElement('div');
            div.className = wariant.styl || 'styl1';

            if (wariant.tytul) {
                const h1 = document.createElement('h1');
                h1.textContent = wariant.tytul;
                div.appendChild(h1);
            }

            if (wariant.tresc) {
                const p = document.createElement('p');
                p.textContent = wariant.tresc;
                div.appendChild(p);
            }

            if (wariant.lista && Array.isArray(wariant.lista)) {
                const ul = document.createElement('ul');
                wariant.lista.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                div.appendChild(ul);
            }

            content.appendChild(div);
        });
    }
}