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
        const response = await fetch(`http://localhost:3000/api/available_bus_stops?${queryParams}`, {
            method: 'GET', // indexメソッドに対応するのでGETリクエスト
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('ネットワークエラーが発生しました。');
        }

        const data = await response.json();
        console.log(data);

        // 結果を表示
        const busTime = Array(15).fill(null).map(() => Array(4).fill(null));
        const idx = Array(15).fill(null);

        for(var i = 0; i < 57; i++){
            const dateTime = new Date(data.message[i].startTime);
            dateHour = dateTime.getHours();
            dateMini = dateTime.getMinutes();
            switch(dateHour){
                case 7:
                    busTime[0][idx[0]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[0]+=1; 
                    break;
                case 8:
                    busTime[1][idx[1]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[1]+=1; 
                    break;
                case 9:
                    busTime[2][idx[2]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[2]+=1; 
                    break;
                case 10:
                    busTime[3][idx[3]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[3]+=1; 
                    break;
                case 11:
                    busTime[4][idx[4]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[4]+=1; 
                    break;
                case 12:
                    busTime[5][idx[5]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[5]+=1; 
                    break;
                case 13:
                    busTime[6][idx[6]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[6]+=1; 
                    break;
                case 14:
                    busTime[7][idx[7]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[7]+=1; 
                    break;
                case 15:
                    busTime[8][idx[8]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[8]+=1; 
                    break;
                case 16:
                    busTime[9][idx[9]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[9]+=1; 
                    break;
                case 17:
                    busTime[10][idx[10]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[10]+=1; 
                    break;
                case 18:
                    busTime[11][idx[11]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[11]+=1; 
                    break;
                case 19:
                    busTime[12][idx[12]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[12]+=1; 
                    break;
                case 20:
                    busTime[13][idx[13]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[13]+=1; 
                    break;
                case 21:
                    busTime[14][idx[14]] = (JSON.stringify(dateHour, null, 2) + ":" + JSON.stringify(dateMini, null, 2));
                    idx[14]+=1; 
                    break;
            }
        }
        console.log(busTime);
        // for (i = 0; i <= 14; i++) {
        //     for(var k = 0; k < 4; k++){
        //         document.getElementById(`${i}result_${k}result`).innerHTML = busTime[i][k];
        //     }
        //     k = 0;
        // }
        

        const buttons = document.createElement("div"); // 全体を囲むコンテナ
        for (let i = 7; i <= 20; i++) {
            const div = document.createElement("div");
            div.id = `${7}result`; // <div> の ID を設定
            div.innerHTML = `${i}`; // <div> 内の表示用の数字
        
            for (let j = 1; j <= 4; j++) {
                const button = document.createElement("button");
                button.id = `${i}result_${j}result`; // <button> の ID を設定
                div.appendChild(button); // <button> を <div> に追加
            }
        
            container.appendChild(div); // 作成した <div> をコンテナに追加
        }
        
        document.body.appendChild(buttons); // コンテナをページに追加

        document.getElementById('21result').innerHTML = busTime[14][0];

        document.getElementById('7result').innerHTML = busTime[0];
        document.getElementById('8result').innerHTML = busTime[1];
        document.getElementById('9result').innerHTML = busTime[2];
        document.getElementById('10result').innerHTML = busTime[3];
        document.getElementById('11result').innerHTML = busTime[4];
        document.getElementById('12result').innerHTML = busTime[5];
        document.getElementById('13result').innerHTML = busTime[6];
        document.getElementById('14result').innerHTML = busTime[7];
        document.getElementById('15result').innerHTML = busTime[8];
        document.getElementById('16result').innerHTML = busTime[9];
        document.getElementById('17result').innerHTML = busTime[10];
        document.getElementById('18result').innerHTML = busTime[11];
        document.getElementById('19result').innerHTML = busTime[12];
        document.getElementById('20result').innerHTML = busTime[13];
        document.getElementById('21result').innerHTML = busTime[14][0];
        




    } catch (error) {
        console.error('エラー:', error);
        document.getElementById('result').innerHTML = 'エラーが発生しました。';
    } 
});
function reserve(time, date){
    alert(time + "の予約が完了しました");

}