<?php require_once 'layout/header.php'; ?>

<div class="lg:col-span-12 max-w-xl mx-auto w-full bg-white border-4 border-[#3D332A] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#3D332A]">
    <h2 class="text-lg font-black text-[#3D332A] mb-4 flex items-center gap-2">🌸 Perbarui Rencanamu</h2>
    
    <form action="index.php?action=update" method="POST" onsubmit="showLoader()" class="space-y-4 text-xs font-bold text-slate-600">
        <input type="hidden" name="id" value="<?php echo $taskData['id']; ?>">
        
        <div>
            <label class="block mb-1">Judul Rencana</label>
            <input type="text" name="title" value="<?php echo htmlspecialchars($taskData['title']); ?>" required
                class="w-full px-3 py-2.5 bg-slate-50 border-2 border-[#3D332A] rounded-xl focus:outline-none">
        </div>
        
        <div>
            <label class="block mb-1">Deskripsi Rencana</label>
            <textarea name="description" rows="3"
                class="w-full px-3 py-2.5 bg-slate-50 border-2 border-[#3D332A] rounded-xl focus:outline-none"><?php echo htmlspecialchars($taskData['description']); ?></textarea>
        </div>

        <div>
            <label class="block mb-1">Ubah Hari / Tanggal</label>
            <input type="date" name="due_date" value="<?php echo $taskData['due_date']; ?>"
                class="px-3 py-2 bg-slate-50 border-2 border-[#3D332A] rounded-xl focus:outline-none">
        </div>
        
        <div class="flex gap-2 pt-2">
            <button type="submit" class="flex-1 bg-[#D2EAE8] text-[#2B736A] border-2 border-[#3D332A] py-2.5 rounded-xl font-black shadow-[2px_2px_0px_0px_#3D332A]">
                Simpan Perubahan
            </button>
            <a href="index.php" class="bg-slate-100 text-slate-500 border-2 border-[#3D332A] px-4 py-2.5 rounded-xl font-black text-center">
                Batal
            </a>
        </div>
    </form>
</div>

<div class="hidden lg:block lg:col-span-1"></div>
<?php require_once 'layout/footer.php'; ?>