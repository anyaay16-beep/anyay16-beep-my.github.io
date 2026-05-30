<?php
require_once 'app/controllers/TaskController.php';

$controller = new TaskController();

// Routing sederhana berdasarkan parameter 'action' di URL
$action = isset($_GET['action']) ? $_GET['action'] : 'index';
$id = isset($_GET['id']) ? $_GET['id'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;

switch ($action) {
    case 'store':
        $controller->store();
        break;
    case 'check':
        $controller->check($id, $status);
        break;
    case 'delete':
        $controller->destroy($id);
        break;
    // Tambahkan case baru untuk melihat riwayat/history log
    case 'history':
        $controller->history(); // Pastikan method ini ada di TaskController
        break;
    default:
        $controller->index();
        break;
}
?>