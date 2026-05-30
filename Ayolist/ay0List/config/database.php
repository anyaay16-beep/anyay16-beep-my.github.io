<?php
class Database {
    // Menggunakan Encapsulation (private) agar konfigurasi aman
    // Contoh jika port MySQL kamu di XAMPP berubah menjadi 3307
    private $host = "localhost:3307";
    private $db_name = "ayolist_db";
    private $username = "root";
    private $password = "";
    public $conn;

    // Method untuk mendapatkan koneksi database
    public function getConnection() {
        $this->conn = null;
        try {
            // Menggunakan PDO (PHP Data Objects) untuk interaksi DB yang aman dari SQL Injection
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Koneksi database gagal: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>