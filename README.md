# 紫微斗數完整排盤與逐宮解盤

純靜態 HTML 專案，可直接用 GitHub Pages 發布，不需安裝 Node、npm 或建置工具。

## 發布到 GitHub Pages

1. 在 GitHub 建立一個新的儲存庫；若使用 GitHub Free，將儲存庫設為 **Public**。
2. 解壓縮下載的 ZIP，將 `ziwei-github-pages` 資料夾**裡面的全部內容**（包含 `.github` 隱藏資料夾和 `site` 資料夾）放在儲存庫根目錄，推送到 `main` 分支。請上傳解壓縮後的檔案，不是 ZIP 本身。
3. 到儲存庫 **Settings → Pages → Build and deployment → Source**，選擇 **GitHub Actions**。
4. 到 **Actions** 查看 `Deploy Ziwei Chart to GitHub Pages` 的執行結果。若首次推送早於第 3 步，可以在工作流程頁面按 **Run workflow**，或再次推送一個 commit。成功後，Settings → Pages 會顯示網址。

一般專案網址為 `https://<帳號>.github.io/<儲存庫名稱>/`；若儲存庫名稱是 `<帳號>.github.io`，網址通常為 `https://<帳號>.github.io/`。頁面引用 `./analysis.js` 及 `./iztro-v2.6.1.min.js`，兩種網址形式均適用。

若你的預設分支不是 `main`，請把 `.github/workflows/deploy-pages.yml` 中 `branches: [main]` 改為你的分支名稱。

## 專案結構

- `site/index.html`：首頁、十二宮命盤與解盤介面
- `site/analysis.js`：星曜、宮位、三方四正及十年大限的解說規則
- `site/iztro-v2.6.1.min.js`：排盤引擎，授權見 `site/IZTRO-LICENSE.txt`
- `.github/workflows/deploy-pages.yml`：推送到 `main` 時自動發布 `site/` 的靜態檔案

本機預覽可直接開啟 `site/index.html`。出生資料只在瀏覽器內處理，重新整理後不保留；按「清空」會移除輸入與結果。頁面內的古籍來源連結需連網。

## 解盤範圍

十二宮逐宮解釋主星、輔曜及雜曜的語意，對看三方四正、生年四化及傳統虛歲十年大限。白話規則是對《紫微斗數全書》相關框架的整理，不是古籍原有的數值公式或具體事件預測。
