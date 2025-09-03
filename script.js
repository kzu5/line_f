async function submitLog(status) {
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

    const regId = document.getElementById('regId').value;
    const roomId = document.getElementById('roomId').value;
    const messageEl = document.getElementById('message');

    if (!regId || !roomId) {
        messageEl.textContent = '学生番号と学習室を選択してください。';
        return;
    }

    const { data, error } = await fetch(`${supabaseUrl}/rest/v1/room_log`, {
        method: 'POST',
        headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify([{
            registration_id: regId,
            room_id: roomId,
            in_out_status: status
        }])
    }).then(res => res.json()).catch(err => ({ error: err }));

    if (error) {
        console.error('Error submitting log:', error);
        messageEl.textContent = 'エラーが発生しました。もう一度お試しください。';
    } else {
        messageEl.textContent = `${status}が完了しました！`;
        document.getElementById('logForm').reset();
    }
}
// メッセージ表示部分のstyle.colorはCSSで制御するため削除
// messageEl.style.color = 'green'; または 'red'; の行を削除

// 例:
if (error) {
    console.error('Error submitting log:', error);
    messageEl.textContent = 'エラーが発生しました。もう一度お試しください。';
    messageEl.classList.add('error'); // エラー時はクラスを追加
    messageEl.classList.remove('success');
} else {
    messageEl.textContent = `${status}が完了しました！`;
    document.getElementById('logForm').reset();
    messageEl.classList.add('success'); // 成功時はクラスを追加
    messageEl.classList.remove('error');
}