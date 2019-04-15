# jquery-scrollable-table
テーブルのスクロール可能にするjQueryプラグインです。

## 動作済み環境
### PC
- Windows 10
  - IE11 (追従が遅れ気味)
  - GoogleChrome
  - FireFox
### スマートフォン
- Android 8.0.0
  - GoogleChrome
- iOS 12.0.1
  - Safari

## 使い方
```
$('table').scrollableTable(options);
```
これで動きます。

### options
```
const options = {
  'el_width': 300,    // 縦列の幅
  'sp_el_width': 200, // SP時の縦列の幅(breakpoint未指定の場合無効)
  'breakpoint': 749   // レスポンシブ対応のためのブレイクポイント(0で無効)
};
```
これだけです。

### 構造化
セマンティックに構造化してください。
```
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>項目名</th>
          <th>項目名</th>
          <th>項目名</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>項目名</th>
          <td>項目</td>
          <td>項目</td>
          <td>項目</td>
        </tr>
        <tr>
          <th>項目名</th>
          <td>項目</td>
          <td>項目</td>
          <td>項目</td>
        </tr>
        <tr>
          <th>項目名</th>
          <td>項目</td>
          <td>項目</td>
          <td>項目</td>
        </tr>
        <tr>
          <th>項目名</th>
          <td>項目</td>
          <td>項目</td>
          <td>項目</td>
        </tr>
      </tbody>
    </table>
  </div>
```

### スタイリング
style.cssを参考にしていただければと思います。(丸投げ)   
.table-viewportの領域を指定するとスクロールできるようになります。
