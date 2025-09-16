document.addEventListener('DOMContentLoaded', function () {

  // ===== LOGIKA UNTUK NAVBAR MOBILE =====
  try {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.navbar nav');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        // Alihkan (toggle) kelas untuk menampilkan/menyembunyikan menu
        navMenu.classList.toggle('nav-open');
        
        // Alihkan (toggle) kelas untuk animasi tombol hamburger
        this.classList.toggle('active');
      });
    }
  } catch (err) {
    console.error('Error pada fungsionalitas Navbar mobile:', err);
  }

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
    const noResult = document.getElementById('noResult');

    if (searchInput) {
      const articles = Array.from(document.querySelectorAll('.article-card'));
      if (noResult) noResult.style.display = 'none';

      searchInput.addEventListener('input', function () {
        const filter = this.value.trim().toLowerCase();
        let found = false;

        articles.forEach(article => {
          const titleEl = article.querySelector('.article-title');
          const snippetEl = article.querySelector('.article-snippet');

          const title = titleEl ? titleEl.textContent.toLowerCase() : '';
          const snippet = snippetEl ? snippetEl.textContent.toLowerCase() : '';

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