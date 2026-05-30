<?php
class Task {
    private $conn;
    private $table_name = "tasks";

    // Properti objek
    public $id;
    public $judul;
    public $tanggal;
    public $deskripsi;
    public $waktu;
    public $status;

    // Constructor untuk menerima koneksi database dari Controller
    public function __construct($db) {
        $this->conn = $db;
    }

    // 1. QUERY: Mengambil semua data tugas
    public function readAll() {
        // Otomatis cek dan update status 'Meleset' jika tanggal sudah lewat dari hari ini dan status masih 'Rencana'
        $this->updateMelesetStatus();

        $query = "SELECT * FROM " . $this->table_name . " ORDER BY tanggal ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 2. QUERY: Tambah Tugas Baru
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET judul=:judul, tanggal=:tanggal, deskripsi=:deskripsi, waktu=:waktu, status='Rencana'";
        $stmt = $this->conn->prepare($query);

        // Sanitisasi data (Fundamental PHP & Security)
        $this->judul = htmlspecialchars(strip_tags($this->judul));
        $this->deskripsi = htmlspecialchars(strip_tags($this->deskripsi));

        // Binding data ke parameter query
        $stmt->bindParam(":judul", $this->judul);
        $stmt->bindParam(":tanggal", $this->tanggal);
        $stmt->bindParam(":deskripsi", $this->deskripsi);
        $stmt->bindParam(":waktu", $this->waktu);

        return $stmt->execute();
    }

    // 3. QUERY: Update Status (Selesai/Rencana)
    public function updateStatus($id, $status) {
        $query = "UPDATE " . $this->table_name . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // 4. QUERY: Hapus Tugas
    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // FITUR OTOMATIS: Mengubah tugas menjadi 'Meleset' jika melewati tanggal sekarang
    private function updateMelesetStatus() {
        $today = date('Y-m-d');
        $query = "UPDATE " . $this->table_name . " SET status = 'Meleset' WHERE tanggal < :today AND status = 'Rencana'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":today", $today);
        $stmt->execute();
    }
}
?>