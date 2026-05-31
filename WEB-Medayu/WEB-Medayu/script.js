// =========================================================================
// SCRIPT INTERAKTIF DESA MEDAYU (VERSI TERPADU & PRELOADER SAFE)
// =========================================================================

// ================= GLOBAL STATE MANAGEMENT =================
let indeksSlideSekarang = 0;
let tipeChartGlobal = 'bar';
let dataChartInstansi = {};

// ================= DATASET ANGGARAN RIIL APBDES 2025 =================
const sumberDataChart = {
  pelaksanaan: {
    labels: ['Anggaran', 'Realisasi'],
    datasets: [{ label: 'Pendapatan', data: [1671428000, 0], backgroundColor: ['#bfdbfe', '#a7f3d0'] }]
  },
  pendapatan: {
    labels: ['Anggaran', 'Realisasi'],
    datasets: [{ label: 'Hasil Usaha Desa', data: [19400000, 0], backgroundColor: ['#bfdbfe', '#a7f3d0'] }]
  },
  pembelanjaan: {
    labels: ['Anggaran', 'Realisasi'],
    datasets: [{ label: 'Penyelenggaraan Pemerintahan', data: [655050420, 192135037], backgroundColor: ['#bfdbfe', '#a7f3d0'] }]
  }
};

// ================= DATA LOGIK POP-UP MODAL PROFIL & SEJARAHLENGKAP =================
const kumpulanDataProfil = {
  geografis: `
    <h2><i class="fa-solid fa-earth-asia"></i> Kondisi Geografis Desa</h2>
    <p>Desa Medayu merupakan salah satu desa yang berada dalam wilayah Kecamatan Wanadadi dengan luas murni <strong>243,490 Ha</strong>.</p>
    <p><strong>Batas Wilayah Administratif:</strong></p>
    <ul>
      <li>Utara: Berbatasan dengan Desa Paseh</li>
      <li>Selatan: Berbatasan dengan Desa Linggasari</li>
      <li>Timur: Berbatasan dengan Desa Banjarmangu</li>
      <li>Barat: Berbatasan dengan Desa Kandangwangi</li>
    </ul>
    <p>Secara topografi, Desa Medayu adalah daerah datar yang sebagian besar wilayahnya merupakan area persawahan dan perkebunan beriklim tropis.</p>
    <p><strong>Pembagian Wilayah:</strong> Terdiri atas 4 Dusun (Dusun Karangmiri, Dusun Medayu, Dusun Kayunan, Dusun Karangkobar) dengan total 20 RT dan 4 RW. Pusat pemerintahan berada di Dusun Karangmiri.</p>
  `,
  demografi: `
    <h2><i class="fa-solid fa-users"></i> Kondisi Demografi Penduduk</h2>
    <p>Jumlah total sebaran penduduk di akhir tahun pencatatan adalah sebanyak <strong>3.518 Jiwa</strong> dengan rincian pertumbuhan rata-rata sebesar 8,48%.</p>
    <table class="modal-tabel">
      <thead>
        <tr><th>Kategori Demografi</th><th>Jumlah Riil</th></tr>
      </thead>
      <tbody>
        <tr><td>Penduduk Laki-Laki</td><td>1.784 Jiwa</td></tr>
        <tr><td>Penduduk Perempuan</td><td>1.734 Jiwa</td></tr>
        <tr><td>Total Kepala Keluarga (KK)</td><td>1.044 KK</td></tr>
        <tr><td>Wilayah Dusun RW 001</td><td>1.030 Jiwa</td></tr>
        <tr><td>Wilayah Dusun RW 002</td><td>545 Jiwa</td></tr>
        <tr><td>Wilayah Dusun RW 003</td><td>642 Jiwa</td></tr>
        <tr><td>Wilayah Dusun RW 004</td><td>1.301 Jiwa</td></tr>
      </tbody>
    </table>
  `,
  sosial: `
    <h2><i class="fa-solid fa-graduation-cap"></i> Tingkat Pendidikan & Agama</h2>
    <p><strong>Komposisi Agama:</strong> Seluruh penduduk Desa Medayu (3.518 jiwa) memeluk agama Islam (100%).</p>
    <p><strong>Profil Tingkat Pendidikan Terbesar (Sampel KK):</strong></p>
    <table class="modal-tabel">
      <thead>
        <tr><th>Jenjang Pendidikan</th><th>Laki-Laki</th><th>Perempuan</th></tr>
      </thead>
      <tbody>
        <tr><td>Tamat SD / Sederajat</td><td>540 orang</td><td>494 orang</td></tr>
        <tr><td>Tamat SLTP / Sederajat</td><td>241 orang</td><td>269 orang</td></tr>
        <tr><td>Tamat SLTA / Sederajat</td><td>334 orang</td><td>263 orang</td></tr>
        <tr><td>Tamat Sarjana (S-1)</td><td>46 orang</td><td>48 orang</td></tr>
        <tr><td>Tamat Magister (S-2)</td><td>4 orang</td><td>1 orang</td></tr>
      </tbody>
    </table>
  `,
  sejarah: `
    <h2><i class="fa-solid fa-clock-rotate-left"></i> Sejarah Asal-Usul Desa Medayu</h2>
    <div style="text-align: justify; line-height: 1.7; font-size: 14px; color: #444;">
      <p>Dahulu kala saat wilayah pulau Jawa masih berupa hutan belantara, hiduplah seorang gadis berparas sangat cantik molek bernama <strong>Putri Ayu</strong>. Kecantikannya dikagumi banyak lelaki hingga membuat seorang perjaka sakti yang murka bernama <strong>Angkara</strong> berniat memaksanya menjadi istri. Karena menolak cinta yang berdasar harta dan kekuasaan, Putri Ayu melarikan diri demi mencari ketenteraman hidup.</p>
      
      <p><strong>Kronologi Terbentuknya Nama-Nama Dukuh di Medayu:</strong></p>
      <ol style="padding-left: 20px; margin-bottom: 15px;">
        <li style="margin-bottom: 8px;"><strong>Dukuh Kayunan:</strong> Tempat pertama Putri Ayu melepas lelah di bawah pohon/kayu yang sangat besar.</li>
        <li style="margin-bottom: 8px;"><strong>Dukuh Medini:</strong> Lahir saat Putri Ayu berjalan ke barat dan ditakut-takuti oleh seorang warga di tengah kepanikannya menghindari kejaran Angkara.</li>
        <li style="margin-bottom: 8px;"><strong>Desa Medayu:</strong> Ketika menjelang pagi, sang putri sampai di pemukiman yang warganya mulai beraktivitas. Warga terpukau melihat kecantikannya hingga berbisik bergumam memuji (dalam bahasa Jawa disebut <em>"pathing ngrumed ngalem wong ayu"</em>). Istilah inilah yang diabadikan menjadi <strong>Desa Medayu</strong>.</li>
        <li style="margin-bottom: 8px;"><strong>Dukuh Karangkobar, Dengok, & Clirik:</strong> Di sebelah barat, sang putri melongok dan melirik-lirik (Dengok & Clirik) melihat kobaran api besar dari rumah warga yang kebakaran (Karangkobar).</li>
        <li style="margin-bottom: 8px;"><strong>Dukuh Sipete:</strong> Tempat sang putri beristirahat menyandarkan badan sambil melamun termangu-mangu (<em>metengge</em>).</li>
        <li style="margin-bottom: 8px;"><strong>Dukuh Kembang & Kletak:</strong> Dinamai karena tempat jatuhnya kembang bawaan putri, serta tempat ia merebahkan diri (<em>kletak</em>) akibat lemas kelelahan setelah menempuh medan tinggi.</li>
        <li style="margin-bottom: 8px;"><strong>Dukuh Bandingan:</strong> Area tanah rata (lapang) di mana Putri Ayu beristirahat dan membanding-bandingkan kontur tanah tersebut dengan tanah tinggi yang pernah dilewatinya.</li>
      </ol>
      <p>Hingga kini, kisah perjalanan heroik nan penuh legenda dari Putri Ayu tersebut terus melekat dan menjadi identitas kultural yang mengikat kerukunan warga di setiap dusun yang ada di Desa Medayu.</p>
    </div>
  `
};

// DATASET STATISTIK DESA MEDAYU (Halaman data.html)
const datasetStatistik = {
  wilayah: {
    title: "Komposisi Penduduk Menurut Wilayah Dusun Desa Medayu",
    labels: ["Dusun Medayu", "Dusun Karangmiri", "Dusun Kayunan", "Dusun Karangkobar"],
    data: [984, 842, 912, 780],
    colors: ["#0b7a3d", "#00c46a", "#1abc9c", "#2ecc71"],
    info: "Wilayah Desa Medayu terbagi secara administratif ke dalam 4 wilayah Dusun utama. Berdasarkan data monografi terbaru, <strong>Dusun Medayu</strong> merupakan wilayah dengan konsentrasi pemukiman terpadat..."
  },
  pendidikan: {
    title: "Komposisi Penduduk Menurut Tingkat Pendidikan Desa Medayu",
    labels: ["Tidak Sekolah", "SD / Sederajat", "SMP / Sederajat", "SMA / Sederajat", "Diploma / Sarjana"],
    data: [420, 1150, 930, 810, 208],
    colors: ["#34495e", "#f1c40f", "#e67e22", "#3498db", "#9b59b6"],
    info: "Tingkat pendidikan masyarakat Desa Medayu didominasi oleh lulusan SD / Sederajat dan SMP / Sederajat..."
  },
  agama: {
    title: "Komposisi Penduduk Menurut Pemeluk Agama Desa Medayu",
    labels: ["Islam", "Kristen", "Katolik", "Hindu", "Budha"],
    data: [3502, 12, 4, 0, 0],
    colors: ["#27ae60", "#2980b9", "#e74c3c", "#f39c12", "#95a5a6"],
    info: "Masyarakat Desa Medayu memiliki tingkat homogenitas yang tinggi dalam aspek religi, di mana mayoritas mutlak penduduk memeluk agama <strong>Islam</strong>..."
  },
  pekerjaan: {
    title: "Komposisi Penduduk Menurut Mata Pencaharian Desa Medayu",
    labels: ["Petani", "Buruh Tani", "Swasta / Dagang", "PNS / TNI / Polri", "Belum/Tidak Bekerja"],
    data: [850, 620, 740, 98, 1210],
    colors: ["#d35400", "#16a085", "#2c3e50", "#2980b9", "#bdc3c7"],
    info: "As a village agraris, agricultural sector is still the prime driving pillar..."
  },
  perkawinan: {
    title: "Komposisi Penduduk Menurut Status Perkawinan Desa Medayu",
    labels: ["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"],
    data: [1320, 1980, 58, 160],
    colors: ["#3498db", "#e74c3c", "#9b59b6", "#7f8c8d"],
    info: "Data status perkawinan menunjukkan persentase penduduk berstatus 'Kawin' (menikah) sebesar 1.980 jiwa..."
  },
  umur: {
    title: "Komposisi Penduduk Menurut Rentang Usia Desa Medayu",
    labels: ["0 - 4 th", "5 - 14 th", "15 - 44 th", "45 - 64 th", "65 th ke atas"],
    data: [240, 510, 1580, 860, 328],
    colors: ["#e67e22", "#f1c40f", "#1abc9c", "#34495e", "#95a5a6"],
    info: "Desa Medayu saat ini menikmati era <strong>Bonus Demografi</strong>, di mana kelompok usia produktif menjadi kelompok terbesar..."
  }
};

// ================= INTERAKTIF SCROLL NAVBAR =================
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }
});

// ================= POPUP ANGGOTA & LOADER HANDLING =================
function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.classList.add("fade-out");
    setTimeout(() => { popup.style.display = "none"; }, 500);
  }
}

const FORCE_HIDE_OVERLAYS = false;

// ================= MOBILE NAVIGATION TOGGLE =================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const icon = toggle.querySelector("i");
      if(icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }
});

// ================= ANIMASI HITUNG ANGKA COUNTER CARDS =================
const runCounters = () => {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    counter.innerText = "0";
    const update = () => {
      const target = +counter.getAttribute("data-target") || 0;
      const current = +counter.innerText;
      const step = Math.max(1, Math.floor(target / 75));
      
      if (current < target) {
        counter.innerText = `${Math.min(target, current + step)}`;
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
};

// ================= HERO BACKROUND SLIDER =================
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-bg-slider .slide");
  const dots = document.querySelectorAll(".hero-dots .dot");
  if (slides.length === 0) return;

  let currentSlideIndex = 0;
  const slideIntervalTime = 5000;

  function changeHeroSlide(index) {
    slides[currentSlideIndex].classList.remove("active");
    if(dots[currentSlideIndex]) dots[currentSlideIndex].classList.remove("active");
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add("active");
    if(dots[currentSlideIndex]) dots[currentSlideIndex].classList.add("active");
  }

  function nextHeroSlide() {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    changeHeroSlide(nextIndex);
  }

  let autoSlideTimer = setInterval(nextHeroSlide, slideIntervalTime);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlideTimer);
      changeHeroSlide(index);
      autoSlideTimer = setInterval(nextHeroSlide, slideIntervalTime);
    });
  });
}

// ================= RE-RENDER DIAGRAM UTAMA & MONOGRAFI =================
function initChartMofografi() {
  if (typeof Chart === "undefined") return;

  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;

  const pieCtx = document.getElementById("genderPieChart");
  const barCtx = document.getElementById("genderBarChart");

  if (pieCtx && barCtx) {
    const initial = datasetStatistik.wilayah;

    window.myPieChart = new Chart(pieCtx, {
      type: 'pie',
      data: { labels: initial.labels, datasets: [{ data: initial.data, backgroundColor: initial.colors }] },
      options: { plugins: { legend: { position: 'bottom', labels: { font: { family: 'Poppins', size: 11 } } } } }
    });

    window.myBarChart = new Chart(barCtx, {
      type: 'bar',
      data: { labels: initial.labels, datasets: [{ data: initial.data, backgroundColor: initial.colors, borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });

    const defaultButton = document.querySelector(".menu-stat-btn.active") || document.querySelector(".menu-stat-btn");
    if (defaultButton) {
      switchMainStat('wilayah', defaultButton);
    }
  }

  // Mini Chart Under News
  for (let i = 1; i <= 3; i++) {
    const miniCtx = document.getElementById(`miniChart${i}`);
    if (miniCtx) {
      new Chart(miniCtx, {
        type: "bar",
        data: {
          labels: ["W1", "W2", "W3", "W4"],
          datasets: [{ data: [35 + i * 15, 75 - i * 8, 50 + i * 5, 85], backgroundColor: "#0b7a3d", borderRadius: 3, barThickness: 14 }]
        },
        options: { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false, beginAtZero: true } } }
      });
    }
  }
}

// FIX: PENGGANTI SYSTEM SWITCH TOMBOL WARNA DINAMIS
function switchMainStat(kategori, element) {
  const buttons = document.querySelectorAll('.menu-stat-btn');
  buttons.forEach(btn => btn.classList.remove('active', 'active-dusun'));
  
  if (element) {
    if (kategori === 'wilayah') {
      element.classList.add('active-dusun'); 
    } else {
      element.classList.add('active'); 
    }
  }

  const targetData = datasetStatistik[kategori];
  if (!targetData) return;

  const titleEl = document.getElementById('stat-title');
  if (titleEl) titleEl.innerHTML = targetData.title;

  const infoTxtEl = document.getElementById('stat-info-text');
  if (infoTxtEl) infoTxtEl.innerHTML = targetData.info;

  if (window.myPieChart && window.myBarChart) {
    window.myPieChart.data.labels = targetData.labels;
    window.myPieChart.data.datasets[0].data = targetData.data;
    window.myPieChart.data.datasets[0].backgroundColor = targetData.colors;
    window.myPieChart.update();

    window.myBarChart.data.labels = targetData.labels;
    window.myBarChart.data.datasets[0].data = targetData.data;
    window.myBarChart.data.datasets[0].backgroundColor = targetData.colors;
    window.myBarChart.update();
  }

  const tableBody = document.getElementById('stat-table-body');
  if (tableBody) {
    let htmlContent = "";
    let totalJiwa = targetData.data.reduce((a, b) => a + b, 0);

    targetData.labels.forEach((label, index) => {
      let jumlah = targetData.data[index];
      let persentase = ((jumlah / totalJiwa) * 100).toFixed(1);
      htmlContent += `<tr><td>${index + 1}</td><td>${label}</td><td>${jumlah.toLocaleString('id-ID')}</td><td>${persentase}%</td></tr>`;
    });
    htmlContent += `<tr class="row-total"><td colspan="2">Total Keseluruhan</td><td>${totalJiwa.toLocaleString('id-ID')}</td><td>100%</td></tr>`;
    tableBody.innerHTML = htmlContent;
  }
}

// ================= INTERAKTIF DIAGRAM APBDES (SAFE) =================
function renderSemuaChart(tipe) {
  if (!document.getElementById('chartPelaksanaan')) return; 

  const opsiUmum = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: tipe === 'pie' } }
  };

  ['Pelaksanaan', 'Pendapatan', 'Pembelanjaan'].forEach(id => {
    if (dataChartInstansi[id]) dataChartInstansi[id].destroy();
  });

  dataChartInstansi['Pelaksanaan'] = new Chart(document.getElementById('chartPelaksanaan'), {
    type: tipe, data: sumberDataChart.pelaksanaan, options: opsiUmum
  });
  dataChartInstansi['Pendapatan'] = new Chart(document.getElementById('chartPendapatan'), {
    type: tipe, data: sumberDataChart.pendapatan, options: opsiUmum
  });
  dataChartInstansi['Pembelanjaan'] = new Chart(document.getElementById('chartPembelanjaan'), {
    type: tipe, data: sumberDataChart.pembelanjaan, options: opsiUmum
  });
}

function ubahTipeChart(tipe) {
  tipeChartGlobal = tipe;
  const bBar = document.getElementById('btnBar');
  const bPie = document.getElementById('btnPie');
  if(bBar) bBar.classList.toggle('aktif', tipe === 'bar');
  if(bPie) bPie.classList.toggle('aktif', tipe === 'pie');
  renderSemuaChart(tipe);
}

function geserSlide(arah) {
  indeksSlideSekarang += arah;
  if (indeksSlideSekarang < 0) indeksSlideSekarang = 2;
  if (indeksSlideSekarang > 2) indeksSlideSekarang = 0;
  
  const track = document.getElementById('trackChart');
  if(track) track.style.transform = `translateX(-${indeksSlideSekarang * 33.333}%)`;
}

// ================= POP-UP PROFIL HANDLING =================
function bukaModalProfil(kategori) {
  const modal = document.getElementById('modalProfilDesa');
  const wadahKonten = document.getElementById('isiKontenModal');
  if(modal && wadahKonten) {
    wadahKonten.innerHTML = kumpulanDataProfil[kategori];
    modal.classList.add('aktif');
    document.body.style.overflow = 'hidden';
  }
}

function tutupModalProfil() {
  const modal = document.getElementById('modalProfilDesa');
  if(modal) {
    modal.classList.remove('aktif');
    document.body.style.overflow = 'auto';
  }
}

// ================= INISIALISASI DOMLOADED UTAMA =================
document.addEventListener("DOMContentLoaded", () => {
  if (FORCE_HIDE_OVERLAYS) {
    const wp = document.getElementById("popup");
    const ld = document.querySelector(".loader") || document.getElementById("preloader");
    if (wp) wp.style.display = "none";
    if (ld) ld.style.display = "none";
  }

  initHeroSlider();
  runCounters();
  initChartMofografi();
  
  if (document.getElementById('chartPelaksanaan')) {
    renderSemuaChart('bar');
  }

  if (typeof Swiper !== "undefined" && document.querySelector(".aparatSwiper")) {
    new Swiper(".aparatSwiper", {
      slidesPerView: 5, spaceBetween: 15, loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      breakpoints: { 0: { slidesPerView: 2 }, 576: { slidesPerView: 3 }, 992: { slidesPerView: 5 } }
    });
  }

  const modal = document.getElementById('modalProfilDesa');
  if(modal) {
    window.addEventListener('click', function(event) {
      if (event.target == modal) tutupModalProfil();
    });
  }

  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 900, once: true });
  }
});

// ================= JAMINAN PRELOADER MATI SAAT LOAD SEMPURNA =================
window.addEventListener("load", () => {
  if (!FORCE_HIDE_OVERLAYS) {
    const loader = document.querySelector(".loader") || document.getElementById("preloader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => { loader.style.display = "none"; }, 500);
    }
  }
});

// ================= DATASET BERITA PEMBANGUNAN RIIL LENGKAP DESA MEDAYU =================
const datasetBerita = {
  berita1: {
    title: "Pembangunan Drainase RT 5 RW 4 Dukuh Talunrata",
    date: "TA 2025",
    author: "TPK Medayu",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80",
    content: "<p><strong>Lokasi:</strong> Dukuh Talunrata RT 05 / RW 04</p><p><strong>Tahun:</strong> 2025</p><p>Pembangunan sistem drainase permanen...</p>"
  },
  berita2: {
    title: "Pembangunan Plat Beton dan Talud Jalan RT 7 RW IV",
    date: "TA 2024",
    author: "TPK Medayu",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=600&q=80",
    content: "<p><strong>Lokasi:</strong> RT 07 / RW IV, Desa Medayu</p><p><strong>Tahun:</strong> 2024</p><p>Konstruksi pengerasan jalan menggunakan plat beton...</p>"
  }
};

const dataPembangunanLengkap = {
  "drainase-talunrata": {
    judul: "PEMBANGUNAN DRAINASE RT 5 RW 4 DUKUH TALUNRATA",
    alamat: "DUKUH TALUNRATA RT 5 RW IV",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.467!2d109.6592!3d-7.3526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6bfaeacb6cdb8b%3A0x70fb3d2aa7a7bd27!2sMASJID%20SABILUL%20MUTTAQIN!5e0!3m2!1sid!2sid!4v1716812345678",
    sumber: "Pendapatan Transfer (Dana Desa)",
    anggaran: "Rp 113.318.500,00",
    volume: "103,85",
    pelaksana: "TPK",
    tahun: "2025",
    fotoUtama: "talunrata.webp",
    foto0: "talunrata0.webp",
    foto50: "talunrata50.webp",
    foto100: "talunrata100.webp"
  }
};

function tampilkanDataWilayah() {
    const boxKonten = document.getElementById('box-konten-statistik');
    const isiData = document.getElementById('isi-data-wilayah');
    
    boxKonten.style.display = 'block';
    document.getElementById('judul-stat-aktif').innerText = "Jumlah dan Persentase Penduduk Berdasarkan Wilayah RT di Desa Medayu";

    const dataWilayahMedayu = [
        { type: 'dusun', nama: 'Dusun KARANGMIRI', kk: 312, total: 961, l: 471, p: 490 },
        { type: 'rw', nama: 'RW 001', kk: 312, total: 961, l: 471, p: 490 },
        { type: 'rt', nama: 'RT 001', kk: 50, total: 157, l: 77, p: 80 },
        { type: 'rt', nama: 'RT 002', kk: 60, total: 182, l: 84, p: 98 },
        { type: 'rt', nama: 'RT 003', kk: 55, total: 178, l: 92, p: 86 },
        { type: 'rt', nama: 'RT 004', kk: 42, total: 116, l: 57, p: 59 },
        { type: 'rt', nama: 'RT 005', kk: 53, total: 176, l: 87, p: 89 },
        { type: 'rt', nama: 'RT 006', kk: 52, total: 152, l: 74, p: 78 },
        
        { type: 'dusun', nama: 'Dusun MEDAYU', kk: 184, total: 523, l: 277, p: 246 },
        { type: 'rw', nama: 'RW 002', kk: 184, total: 523, l: 277, p: 246 },
        { type: 'rt', nama: 'RT 001', kk: 47, total: 142, l: 78, p: 64 },
        { type: 'rt', nama: 'RT 002', kk: 57, total: 164, l: 91, p: 73 },
        { type: 'rt', nama: 'RT 003', kk: 49, total: 129, l: 60, p: 69 },
        { type: 'rt', nama: 'RT 004', kk: 31, total: 88, l: 48, p: 40 },
        
        { type: 'dusun', nama: 'Dusun KAYUNAN', kk: 204, total: 628, l: 309, p: 319 },
        { type: 'rw', nama: 'RW 003', kk: 204, total: 628, l: 309, p: 319 },
        { type: 'rt', nama: 'RT 001', kk: 65, total: 220, l: 111, p: 109 },
        { type: 'rt', nama: 'RT 002', kk: 78, total: 236, l: 115, p: 121 },
        { type: 'rt', nama: 'RT 003', kk: 61, total: 172, l: 83, p: 89 },
        
        { type: 'dusun', nama: 'Dusun KARANGKOBAR', kk: 328, total: 1006, l: 510, p: 496 },
        { type: 'rw', nama: 'RW 004', kk: 328, total: 1006, l: 510, p: 496 },
        { type: 'rt', nama: 'RT 001', kk: 45, total: 138, l: 68, p: 70 },
        { type: 'rt', nama: 'RT 002', kk: 55, total: 156, l: 87, p: 69 }
    ];

    let htmlTabel = `
        <table class="table-wilayah">
            <thead>
                <tr>
                    <th>Wilayah / Ketua</th>
                    <th class="text-center">KK</th>
                    <th class="text-center">L+P</th>
                    <th class="text-center">L</th>
                    <th class="text-center">P</th>
                </tr>
            </thead>
            <tbody>
    `;

    dataWilayahMedayu.forEach(item => {
        let kelasBaris = '';
        if (item.type === 'dusun') kelasBaris = 'class="bg-dusun"';
        else if (item.type === 'rw') kelasBaris = 'class="bg-rw"';
        else kelasBaris = 'class="bg-rt"';

        htmlTabel += `
            <tr ${kelasBaris}>
                <td ${item.type === 'rt' ? 'class="bg-rt"' : item.type === 'rw' ? 'class="bg-rw"' : ''}>${item.nama}</td>
                <td class="text-center">${item.kk}</td>
                <td class="text-center" style="font-weight:600;">${item.total}</td>
                <td class="text-center">${item.l}</td>
                <td class="text-center">${item.p}</td>
            </tr>
        `;
    });

    htmlTabel += `</tbody></table>`;
    isiData.innerHTML = htmlTabel;
    boxKonten.scrollIntoView({ behavior: 'smooth' });
}

// [Duplikat closePopup, scroll listener, load listener, dan slider dihapus — sudah ada versi lengkap di atas]

// Database Produk UMKM
const daftarLapakUMKM = [
    { nama: "Sale Pisang Karomah", harga: "Rp 45.000", penjual: "Saryun Yuni Setiadi", foto: "produk1.png" },
    { nama: "Super Rengginan", harga: "Rp 25.000", penjual: "Marsinah", foto: "produk2.png" },
    { nama: "Jenang Tape Amalia", harga: "Rp 25.000", penjual: "Jaswadi", foto: "produk3.png" },
    { nama: "Telor Gabus dan Kripik", harga: "Rp 17.000", penjual: "Restuti", foto: "produk4.png" }
];

// Fungsi untuk menampilkan produk ke halaman
function muatProduk() {
    const container = document.getElementById('umkmGrid');
    if (!container) return;

    // Deteksi otomatis path relatif berdasarkan lokasi halaman
    const path = window.location.pathname;
    let jalurGaleri;
    if (path.includes('/pages/') || path.includes('/profil/')) {
        jalurGaleri = '../assets/galeri/';
    } else {
        jalurGaleri = 'assets/galeri/';
    }

    container.innerHTML = daftarLapakUMKM.map(produk => `
    <div class="aparat-profile-card" style="background: white; padding: 15px; border-radius: 15px; border: 1px solid #eee;">
    <img src="${jalurGaleri}${produk.foto}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px;" onerror="this.style.background='#f0f0f0'; this.alt='Foto tidak tersedia';">
    <div class="info-produk" style="padding-top: 15px; color: #333;">
        <h4 style="margin: 0; color: #062b16;">${produk.nama}</h4>
        <p style="color: var(--primary); font-weight: 600; margin: 5px 0;">${produk.harga}</p>
        <p style="font-size: 0.85rem; margin: 0;">Penjual: <strong>${produk.penjual}</strong></p>
    </div>
    
    <a href="#" class="btn-primary" style="display:block; padding:8px; margin-top:10px; text-align:center;">Beli via WA</a>
</div>

    `).join('');
}

// Jalankan fungsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', muatProduk);

// Fungsi Modal Berita
function bukaModalBerita(id) {
  const b = datasetBerita[id];
  document.getElementById('modalJudul').innerText = b.judul;
  document.getElementById('modalImg').src = b.img;
  document.getElementById('modalIsi').innerHTML = `<p>${b.isi}</p>`;
  document.getElementById('modalBerita').style.display = "block";
}

function tutupModalBerita() {
  document.getElementById('modalBerita').style.display = "none";
}

// Fungsi Modal Tambah Produk
function bukaFormTambah() {
  document.getElementById('modalTambah').style.display = "block";
}

function tutupFormTambah() {
  document.getElementById('modalTambah').style.display = "none";
}

function kirimProduk() {
  alert("Data berhasil dikirim ke Admin Desa untuk verifikasi!");
  tutupFormTambah();
}

// Tutup modal jika klik di luar box
window.onclick = function(event) {
  if (event.target == document.getElementById('modalBerita')) tutupModalBerita();
  if (event.target == document.getElementById('modalTambah')) tutupFormTambah();
}