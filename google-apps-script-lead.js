/**
 * Quậy Complex — Nhận lead từ web → ghi Google Sheet + bắn Telegram.
 * HƯỚNG DẪN (cập nhật lại):
 * 1. Mở lại Sheet "Lead Quậy Complex" → Extensions → Apps Script.
 * 2. Xóa hết code cũ, dán TOÀN BỘ file này vào, Save.
 * 3. Deploy → Manage deployments → (bút chì Edit) → Version: New version → Deploy.
 *    (Giữ nguyên link /exec cũ, KHÔNG tạo deployment mới → khỏi đổi link.)
 */

// ==== Telegram config ====
var TELEGRAM_BOT_TOKEN = '7581633721:AAG8tupcVP2LJ8nTNx7R1PGmcN7oIfULZoM'; // bot SiquanBDS LEAD
var TELEGRAM_CHAT_ID = '519358049'; // chat riêng anh Khoa

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Họ tên', 'Số điện thoại', 'Loại căn', 'Trang', 'User Agent']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    var data = JSON.parse(e.postData.contents);
    var name = data.name || '';
    var phone = data.phone || '';
    var loai = data.loai || '';
    var time = data.time || new Date().toLocaleString('vi-VN');

    sheet.appendRow([time, name, "'" + phone, loai, data.page || 'Quậy Complex', data.ua || '']);

    // ==== Bắn Telegram ====
    try {
      var msg = '🔔 LEAD MỚI — Quậy Complex\n\n'
        + '👤 ' + name + '\n'
        + '📞 ' + phone + '\n'
        + '🏠 ' + (loai && loai.indexOf('Loại căn') < 0 ? loai : 'Chưa chọn') + '\n'
        + '🕒 ' + time;
      UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
        method: 'post',
        payload: { chat_id: TELEGRAM_CHAT_ID, text: msg },
        muteHttpExceptions: true,
      });
    } catch (tErr) { /* Sheet vẫn ghi dù Telegram lỗi */ }

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

/**
 * CHẠY HÀM NÀY 1 LẦN trong editor để cấp quyền gửi ra ngoài (Telegram).
 * Chọn hàm "testTelegram" ở thanh trên → bấm Run → Authorize → cho phép.
 * Sau đó Telegram sẽ bắn được. Nhận được tin "✅ Test OK" là xong.
 */
function testTelegram() {
  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post',
    payload: { chat_id: TELEGRAM_CHAT_ID, text: '✅ Test OK — Quậy Complex đã kết nối Telegram.' },
    muteHttpExceptions: true,
  });
}
