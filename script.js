document.addEventListener('DOMContentLoaded', function () {
  // ===== Tanggal otomatis di halaman artikel =====
  try {
    const dateEl = document.getElementById('autoDate');
    if (dateEl) {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = 'Diunggah: ' + today.toLocaleDateString('id-ID', options);
    }
  } catch (err) {
    console.error('Error saat men-set tanggal:', err);
  }

  // ===== Search filter di index (dengan pesan "Hasil tidak ditemukan") =====
  try {
    const searchInput = document.getElementById('searchInput');
    const noResult = document.getElementById('noResult'); // elemen pesan, boleh null

    if (searchInput) {
      // ambil semua card artikel (NodeList, mungkin kosong)
      const articles = Array.from(document.querySelectorAll('.article-card'));

      // sembunyikan pesan awalnya
      if (noResult) noResult.style.display = 'none';

      // pakai event 'input' supaya reaktif untuk copy/paste juga
      searchInput.addEventListener('input', function () {
        const filter = this.value.trim().toLowerCase();
        let found = false;

        articles.forEach(article => {
          // ambil title & snippet bila ada, fallback ke string kosong
          const titleEl = article.querySelector('.article-title');
          const snippetEl = article.querySelector('.article-snippet');

          const title = titleEl ? titleEl.textContent.toLowerCase() : '';
          const snippet = snippetEl ? snippetEl.textContent.toLowerCase() : '';

          // jika kosong (filter ''), tampilkan semua
          const match = (filter === '') || title.includes(filter) || snippet.includes(filter);

          article.style.display = match ? '' : 'none';
          if (match) found = true;
        });

        if (noResult) {
          noResult.style.display = found ? 'none' : 'block';
        }
      });
    }
  } catch (err) {
    console.error('Error pada search filter:', err);
  }
});
