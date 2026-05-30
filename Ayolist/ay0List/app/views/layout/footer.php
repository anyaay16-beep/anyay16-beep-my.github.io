</div> <aside id="history-sidebar" class="fixed right-0 top-0 bottom-0 w-80 bg-white border-l-4 border-[#3D332A] p-6 shadow-2xl z-40 transform translate-x-full transition-transform duration-300 overflow-y-auto">
        <div class="flex justify-between items-center mb-6 border-b-2 border-slate-100 pb-3">
            <h2 class="text-sm font-black text-[#8A4A91]">⏳ LOG AKTIVITAS</h2>
            <button onclick="toggleSidebar()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
        </div>
        
        <div class="space-y-3 font-mono text-[10px] text-slate-500">
            <?php 
            if(isset($historyLogs) && $historyLogs->rowCount() > 0):
                while ($log = $historyLogs->fetch(PDO::FETCH_ASSOC)): 
            ?>
                <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <p class="text-slate-700 font-medium">> <?php echo htmlspecialchars($log['action_message']); ?></p>
                    <span class="text-[9px] text-slate-400 block mt-1"><?php echo date('d/M H:i:s', strtotime($log['created_at'])); ?></span>
                </div>
            <?php 
                endwhile; 
            else: 
            ?>
                <p class="italic text-slate-400">Belum ada log sistem.</p>
            <?php endif; ?>
        </div>
    </aside>

    <footer class="text-center text-[10px] font-bold text-slate-400 mt-6 pb-2">
        &copy; <?php echo date('Y'); ?> AyOList App • By Anya-
    </footer>

    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('history-sidebar');
            sidebar.classList.toggle('translate-x-full');
        }
    </script>
</body>
</html>