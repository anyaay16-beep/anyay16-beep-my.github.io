<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AyOList — Ayo Atur Jadwalmu</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Quicksand', sans-serif; }
        /* Efek Pop-up & Shadow Tebal ala Neubrutalism Pastel */
        .retro-popup-shadow { box-shadow: 5px 5px 0px 0px #4A3B32; }
        .retro-shadow-sm { box-shadow: 2px 2px 0px 0px #4A3B32; }
        .pixel-font { font-family: 'Courier New', Courier, monospace; }

        /* ========================================================
           ANIMASI LOADER & LOGO EKSTERNAL (MURNI CSS NEUBRUTALISM)
           ======================================================== */
        
        /* Container Overlay Loader */
        .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 249, 230, 0.85); /* Sesuai warna bg #FFF9E6 */
            backdrop-filter: blur(4px);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        /* Trigger muncul loader lewat JavaScript */
        .loader-overlay.show-loader {
            opacity: 1;
            pointer-events: auto;
        }

        /* Kotak Bingkai Animasi */
        .animation-box {
            position: relative;
            width: 90px;
            height: 90px;
            margin-bottom: 15px;
        }

        /* Animasi Ikon Catatan */
        .notebook-icon {
            position: absolute;
            bottom: 10px;
            left: 10px;
            width: 50px;
            height: 60px;
            background: #FFFFFF;
            border: 4px solid #4A3B32;
            border-radius: 8px;
            box-shadow: 4px 4px 0px 0px #4A3B32;
            animation: noteShake 2s infinite ease-in-out;
        }

        /* Garis di dalam kertas catatan */
        .notebook-icon::before, .notebook-icon::after {
            content: '';
            position: absolute;
            left: 8px;
            height: 4px;
            background: #B3C5FF;
            border-radius: 2px;
            border: 1px solid #4A3B32;
        }
        .notebook-icon::before { top: 14px; width: 26px; }
        .notebook-icon::after { top: 26px; width: 18px; }

        /* Animasi Ikon Pena */
        .pen-icon {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 36px;
            transform-origin: bottom left;
            animation: penWrite 2s infinite ease-in-out;
            filter: drop-shadow(2px 2px 0px #4A3B32);
        }

        /* Efek Animasi Mengambang Pada Logo Utama */
        .floating-logo {
            animation: floatLogo 3s infinite ease-in-out;
        }

        /* KEYFRAMES LOGIKA ANIMASI */
        @keyframes penWrite {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            30% { transform: translate(-18px, 22px) rotate(-20deg); }
            55% { transform: translate(-35px, 28px) rotate(-10deg); }
            75% { transform: translate(-12px, 38px) rotate(-25deg); }
        }

        @keyframes noteShake {
            0%, 100% { transform: scale(1) rotate(0deg); }
            40% { transform: scale(1.04) rotate(3deg); }
            70% { transform: scale(0.96) rotate(-3deg); }
        }

        @keyframes floatLogo {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
    </style>
    <script>
        // Fungsi menampilkan loader saat tombol/form disubmit
        function showLoader() { 
            const loader = document.getElementById('global-loader');
            if(loader) loader.classList.add('show-loader');
        }

        // Fungsi menghilangkan layar pembuka otomatis
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const opener = document.getElementById('opening-screen');
                if(opener) {
                    opener.style.opacity = '0';
                    opener.style.transition = 'opacity 0.4s ease';
                    setTimeout(() => opener.style.display = 'none', 400);
                }
            }, 1200);
        });
    </script>
</head>
<body class="bg-[#FFF9E6] text-[#4A3B32] antialiased min-h-screen flex flex-col p-4 sm:p-6">

    <div id="opening-screen" class="fixed inset-0 bg-[#B3C5FF] z-50 flex flex-col items-center justify-center">
        <div class="bg-white p-8 rounded-2xl border-4 border-[#4A3B32] retro-popup-shadow text-center flex flex-col items-center gap-4">
            <div class="animation-box">
                <div class="notebook-icon"></div>
                <div class="pen-icon">✏️</div>
            </div>
            <h1 class="text-xl font-black text-[#4A3B32] tracking-wider uppercase">Welcome to AyOList...</h1>
        </div>
    </div>

    <div id="global-loader" class="loader-overlay">
        <div class="bg-white p-8 rounded-2xl border-4 border-[#4A3B32] retro-popup-shadow text-center flex flex-col items-center gap-4">
            <div class="animation-box">
                <div class="notebook-icon"></div>
                <div class="pen-icon">✏️</div>
            </div>
            <span class="text-xs font-black tracking-wide uppercase">Mencatat Rencana Baru...</span>
        </div>
    </div>

    <header class="w-full max-w-6xl mx-auto bg-[#D57EE6] border-4 border-[#4A3B32] rounded-2xl p-4 retro-popup-shadow flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <div class="flex items-center gap-3">
        
        <div class="logo-custom-css" title="AyOList">
            <div class="logo-book"></div>
            <div class="logo-pen">✏️</div>
        </div>
        
        <h1 class="text-2xl font-black text-white tracking-wide drop-shadow-[2px_2px_0px_#4A3B32]">AyOList</h1>
    </div>

    <div class="flex items-center gap-2 bg-white/20 p-1 rounded-xl border-2 border-[#4A3B32]/30">
        <a href="index.php" class="px-4 py-2 rounded-lg bg-white text-[#4A3B32] text-xs font-black border-2 border-[#4A3B32] retro-shadow-sm">
            📋 Tugas
        </a>
        <button onclick="toggleSidebar()" class="px-4 py-2 rounded-lg text-white text-xs font-black hover:bg-white/10">
            ⏳ Riwayat Log
        </button>
    </div>
</header>

    <div class="w-full max-w-6xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">