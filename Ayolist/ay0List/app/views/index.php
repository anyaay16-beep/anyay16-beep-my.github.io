<?php require_once 'layout/header.php'; ?>

<div class="lg:col-span-5 bg-[#D2D6DC] border-4 border-[#3D332A] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#3D332A] space-y-5">
    
    <div class="border-b-2 border-dashed border-[#9AA1A9] pb-4 flex items-center gap-3">
        <div class="text-3xl">🌷</div>
        <div>
            <h2 class="text-xl font-black text-[#2B736A]">Haiii, Anya</h2>
            <p class="text-[11px] font-bold text-[#E56385] tracking-wide">Selamat Datang Kembali! Yuk cek dan atur jadwalmu hari ini</p>
        </div>
    </div>

    <form action="index.php?action=store" method="POST" onsubmit="showLoader()" class="space-y-4 text-xs font-bold text-[#554D45]">
        <div>
            <label class="block mb-1.5 text-[#385E8C]">Judul Rencana</label>
            <input type="text" name="judul" placeholder="Tuliskan nama tugas..." required
                class="w-full px-3 py-2.5 bg-[#B8BFC7] border-2 border-[#3D332A] rounded-xl focus:outline-none focus:bg-white transition-colors font-medium placeholder-[#7A828A]">
        </div>

        <div>
            <label class="block mb-1.5 text-[#385E8C]">Hari / Tanggal</label>
            <input type="date" name="tanggal" required
                class="w-full px-3 py-2.5 bg-[#B8BFC7] border-2 border-[#3D332A] rounded-xl focus:outline-none focus:bg-white text-slate-700">
        </div>

        <div>
            <label class="block mb-1.5 text-[#385E8C]">Deskripsi</label>
            <textarea name="deskripsi" placeholder="Catatan tambahan rencana..." rows="4"
                class="w-full px-3 py-2.5 bg-[#B8BFC7] border-2 border-[#3D332A] rounded-xl focus:outline-none focus:bg-white font-medium placeholder-[#7A828A]"></textarea>
        </div>

        <div class="pt-2">
            <button type="submit" class="w-full bg-[#B5CBD3] hover:bg-[#9BB7C2] text-[#3A535D] border-2 border-[#3D332A] py-2.5 rounded-xl shadow-[2px_2px_0px_0px_#3D332A] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5">
                <span>+</span> Tambahkan
            </button>
        </div>
    </form>
</div>

<div class="lg:col-span-7 flex flex-col gap-5 w-full">
    
    <div class="w-full bg-[#BFD7EA] border-4 border-[#3D332A] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#3D332A] flex justify-between items-center">
        <div>
            <span class="text-xs font-black uppercase text-[#476075] tracking-widest block">Status Ruang Kerja</span>
            <span class="text-xs font-bold text-slate-500">Kelola semua aktivitas secara visual di sini.</span>
        </div>
        <button onclick="toggleSidebar()" class="bg-white hover:bg-[#F2F6FA] border-2 border-[#3D332A] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#3D332A] transition">
            ⏳ Logs
        </button>
    </div>

    <div class="grid grid-cols-3 gap-4">
        <div class="bg-white border-4 border-[#52B788] rounded-2xl p-3 text-center shadow-[3px_3px_0px_0px_#3D332A]">
            <span class="block text-xl font-black text-[#2D6A4F]"><?php echo $analytics['planned'] ?? 0; ?></span>
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Rencana</span>
        </div>
        <div class="bg-white border-4 border-[#4EA8DE] rounded-2xl p-3 text-center shadow-[3px_3px_0px_0px_#3D332A]">
            <span class="block text-xl font-black text-[#1A6596]"><?php echo $analytics['completed'] ?? 0; ?></span>
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Selesai</span>
        </div>
        <div class="bg-white border-4 border-[#E56385] rounded-2xl p-3 text-center shadow-[3px_3px_0px_0px_#3D332A]">
            <span class="block text-xl font-black text-[#A12B4A]"><?php echo $analytics['overdue'] ?? 0; ?></span>
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Meleset</span>
        </div>
    </div>

    <div class="bg-[#FBC3CB] border-4 border-[#3D332A] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#3D332A] flex-1 min-h-[300px]">
        <h3 class="text-xs font-black uppercase text-[#8F3A47] tracking-wider mb-4 flex items-center gap-1.5">
            📋 Tugas yang Harus Diikuti:
        </h3>
        
        <div class="space-y-3">
            <?php if (isset($allTasks) && count($allTasks) > 0): ?>
                <?php foreach ($allTasks as $row): 
                    // Logika status tugas
                    $isCompleted = ($row['status'] === 'Selesai');
                    $isOverdue = ($row['status'] === 'Meleset');
                ?>
                    <div class="bg-white border-2 border-[#3D332A] p-4 rounded-xl flex items-center justify-between shadow-[2px_2px_0px_0px_#3D332A] group transition-all">
                        <div class="flex items-center gap-3">
                            <a href="index.php?action=check&id=<?php echo $row['id']; ?>&status=<?php echo $row['status']; ?>" onclick="showLoader()"
                               class="w-5 h-5 rounded-full border-2 border-[#3D332A] flex items-center justify-center text-xs transition-colors <?php echo $isCompleted ? 'bg-[#52B788] text-white' : 'bg-[#FFF] hover:bg-slate-100'; ?>">
                                <?php if($isCompleted) echo '✓'; ?>
                            </a>
                            
                            <div>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="font-bold text-sm <?php echo $isCompleted ? 'line-through text-slate-400' : 'text-[#3D332A]'; ?>">
                                        <?php echo htmlspecialchars($row['judul']); ?>
                                    </span>
                                    <?php if(!empty($row['tanggal'])): ?>
                                        <span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-[#3D332A] <?php echo $isOverdue ? 'bg-[#FFCCD5] text-[#A12B4A]' : 'bg-[#FFF3CD] text-[#856404]'; ?>">
                                            📅 <?php echo date('d M', strtotime($row['tanggal'])); ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                                <?php if(!empty($row['deskripsi'])): ?>
                                    <p class="text-xs text-slate-400 mt-0.5 <?php echo $isCompleted ? 'line-through' : ''; ?>">
                                        <?php echo htmlspecialchars($row['deskripsi']); ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        </div>

                        <div class="flex gap-1">
                            <a href="index.php?action=edit&id=<?php echo $row['id']; ?>" class="border border-[#3D332A] bg-[#FFF3CD] hover:bg-[#FFEBA3] p-1.5 rounded-lg text-xs transition">
                                ✏️
                            </a>
                            <a href="index.php?action=delete&id=<?php echo $row['id']; ?>" onclick="showLoader(); return confirm('Hapus tugas ini?')" class="border border-[#3D332A] bg-[#FFCCD5] hover:bg-[#FFA3B1] p-1.5 rounded-lg text-xs transition">
                                🗑️
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="text-center py-10 bg-white/40 border-2 border-dashed border-[#8F3A47]/30 rounded-xl">
                    <p class="text-[#8F3A47] text-xs font-bold">Belum ada tugas. Waktunya bersenang-senang! 🎈</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php require_once 'layout/footer.php'; ?>