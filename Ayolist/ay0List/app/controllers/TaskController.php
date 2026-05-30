<?php
require_once 'config/database.php';
require_once 'app/models/Task.php';

class TaskController {
    private $db;
    private $task;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->task = new Task($this->db);
    }

    // Mengendalikan halaman utama (Menampilkan data & statistik)
    public function index() {
        // Menangani request GET untuk update status
        if (isset($_GET['action']) && $_GET['action'] == 'toggle' && isset($_GET['id'])) {
            $status_baru = ($_GET['status'] == 'Selesai') ? 'Rencana' : 'Selesai';
            $this->task->updateStatus($_GET['id'], $status_baru);
            header("Location: index.php");
            exit();
        }

        // Menangani request GET untuk hapus data
        if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['id'])) {
            $this->task->delete($_GET['id']);
            header("Location: index.php?status=success_delete");
            exit();
        }

        // Ambil semua data tugas untuk dikirim ke View
        $allTasks = $this->task->readAll();
        
        // Hitung statistik (Fundamental PHP: Array Counter / Loops)
        $counts = ['Rencana' => 0, 'Selesai' => 0, 'Meleset' => 0];
        foreach ($allTasks as $t) {
            // Validasi jika status dari DB ada di dalam array $counts
            if (isset($counts[$t['status']])) {
                $counts[$t['status']]++;
            }
        }
        
        $analytics = [
            'planned' => $counts['Rencana'],
            'completed' => $counts['Selesai'],
            'overdue' => $counts['Meleset']
        ];

        // Panggil file tampilan (View) - Cukup SATU KALI di paling bawah
        require_once 'app/views/index.php';
    }

    // Menangani request POST untuk tambah data (Aksi dari file routing index.php)
    public function store() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Ambil data dari form input (menyesuaikan dengan name input HTML kamu)
            $this->task->judul = $_POST['judul'] ?? '';
            $this->task->tanggal = $_POST['tanggal'] ?? '';
            $this->task->deskripsi = $_POST['deskripsi'] ?? '';
            $this->task->waktu = !empty($_POST['waktu']) ? $_POST['waktu'] : null;
            
            // Jalankan fungsi create dari Model Task
            if ($this->task->create()) {
                header("Location: index.php?status=success_add");
                exit();
            } else {
                // Jika gagal, kembalikan ke index dengan status error
                header("Location: index.php?status=failed_add");
                exit();
            }
        }
    }

    // Menangani request untuk menghapus data via routing (jika index.php router memanggil destroy)
    public function destroy($id) {
        if ($this->task->delete($id)) {
            header("Location: index.php?status=success_delete");
            exit();
        }
    }

    // Menangani request untuk check/toggle status via routing (jika index.php router memanggil check)
    public function check($id, $status) {
        $status_baru = ($status == 'Selesai') ? 'Rencana' : 'Selesai';
        if ($this->task->updateStatus($id, $status_baru)) {
            header("Location: index.php");
            exit();
        }
    }
} // <--- SEKARANG CLASS SUDAH DITUTUP DENGAN BENAR!
?>