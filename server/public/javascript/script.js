    document.getElementById('busForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // フォームのデフォルト動作を防ぐ

    const busID_on = document.getElementById('busID_on').value;
    const busID_off = document.getElementById('busID_off').value;
    const date = document.getElementById('date').value;

    // クエリパラメータを手動で構築
    const queryParams = new URLSearchParams({
        busID_on: busID_on,
        busID_off: busID_off,
        date: date
    }).toString();
    // APIリクエストを送信
    try {
        const productin_api_endpoint = 'https://web-client-api.onrender.com';
        // const response = await fetch(`http://localhost:3000/api/available_bus_stops?${queryParams}`, {
        const response = await fetch(`${productions_api_endpoint}/api/available_bus_stops?${queryParams}`, {
            method: 'GET', // indexメソッドに対応するのでGETリクエスト
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('ネットワークエラーが発生しました。');
        }

        const data = await response.json();

        // 結果を表示
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);


    } catch (error) {
        console.error('エラー:', error);
        document.getElementById('result').innerHTML = 'エラーが発生しました。';
    } 
    });
