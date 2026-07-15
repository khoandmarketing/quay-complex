/**
 * Quậy Complex — Nhận lead từ web đổ vào Google Sheet.
 * HƯỚNG DẪN (làm 1 lần):
 * 1. Vào https://sheets.new tạo 1 Google Sheet mới, đặt tên "Lead Quậy Complex".
 * 2. Menu Extensions (Tiện ích mở rộng) → Apps Script.
 * 3. Xóa hết code mẫu, dán TOÀN BỘ file này vào.
 * 4. Bấm Deploy (Triển khai) → New deployment → chọn type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone   (BẮT BUỘC để web gửi được)
 * 5. Authorize (cho phép quyền). Copy link "/exec" nó trả ra → gửi cho Mây Mây.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Họ tên', 'Số điện thoại', 'Loại căn', 'Trang', 'User Agent']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.time || new Date().toLocaleString('vi-VN'),
      data.name || '',
      "'" + (data.phone || ''),   // dấu ' giữ số 0 đầu SĐT
      data.loai || '',
      data.page || 'Quậy Complex',
      data.ua || '',
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Quậy Complex lead endpoint OK');
}
