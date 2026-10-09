```javascript
// ========================================
// CSVファイルを読み込む
// ========================================

fetch("./works.csv")
    .then(function(response) {

        // CSVが正常に読み込めたか確認
        if (!response.ok) {
            throw new Error("works.csvを読み込めませんでした");
        }

        return response.text();
    })

    .then(function(data) {

        // ========================================
        // CSVを読み込む
        // ========================================

        var rows = data.trim().split(/\r?\n/);

        // 1行目をヘッダーとして取得
        var headers = rows[0].split(",").map(function(header) {
            return header.trim();
        });


        // ========================================
        // CSVから作品データを作成
        // ========================================

        var works = [];

        for (var i = 1; i < rows.length; i++) {

            var values = rows[i].split(",");

            var work = {};

            headers.forEach(function(header, index) {

                work[header] = values[index]
                    ? values[index].trim()
                    : "";

            });

            works.push(work);
        }


        // ========================================
        // HTMLの要素を取得
        // ========================================

        var grid = document.getElementById("works-grid");
        var categorySelect = document.getElementById("category");
        var sortSelect = document.getElementById("sort");


        // 要素が存在するか確認
        if (!grid || !categorySelect || !sortSelect) {

            console.error("Worksに必要なHTML要素が見つかりません");

            return;
        }


        // ========================================
        // カテゴリー一覧を作成
        // ========================================

        var categories = [];

        works.forEach(function(work) {

            if (
                work.category &&
                !categories.includes(work.category)
            ) {
                categories.push(work.category);
            }

        });


        // ========================================
        // カテゴリーをセレクトボックスに追加
        // ========================================

        categories.forEach(function(category) {

            var option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            categorySelect.appendChild(option);

        });


        // ========================================
        // 作品を表示する関数
        // ========================================

        function displayWorks() {

            // 選択されたカテゴリー
            var selectedCategory = categorySelect.value;

            // 選択された並び順
            var sortType = sortSelect.value;


            // 元のデータをコピー
            var displayWorks = works.slice();


            // ========================================
            // カテゴリーで絞り込む
            // ========================================

            if (selectedCategory !== "all") {

                displayWorks = displayWorks.filter(function(work) {

                    return work.category === selectedCategory;

                });

            }


            // ========================================
            // 並び替え
            // ========================================

            if (sortType === "new") {

                displayWorks.sort(function(a, b) {

                    return Number(b.year) - Number(a.year);

                });

            }

            else if (sortType === "old") {

                displayWorks.sort(function(a, b) {

                    return Number(a.year) - Number(b.year);

                });

            }

            else if (sortType === "title") {

                displayWorks.sort(function(a, b) {

                    return a.title.localeCompare(b.title, "ja");

                });

            }


            // ========================================
            // 現在表示されている作品を削除
            // ========================================

            grid.innerHTML = "";


            // ========================================
            // 作品カードを作成
            // ========================================

            displayWorks.forEach(function(work, index) {

                var card = document.createElement("article");

                card.className = "work-card";


                // 作品カードのHTML
                card.innerHTML =

                    '<img src="' + work.image +
                    '" alt="' + work.title + '">' +

                    '<div class="works-info">' +

                        '<p class="work-category">' +
                            work.category +
                        '</p>' +

                        '<h4>' +
                            work.title +
                        '</h4>' +

                        '<p>' +
                            work.description +
                        '</p>' +

                        '<p class="work-year">' +
                            work.year +
                        '</p>' +

                    '</div>';


                // Worksに追加
                grid.appendChild(card);

            });

        }


        // ========================================
        // 最初に作品を表示
        // ========================================

        displayWorks();


        // ========================================
        // カテゴリー変更
        // ========================================

        categorySelect.addEventListener("change", function() {

            displayWorks();

        });


        // ========================================
        // 並び順変更
        // ========================================

        sortSelect.addEventListener("change", function() {

            displayWorks();

        });

    })


    // ========================================
    // エラー処理
    // ========================================

    .catch(function(error) {

        console.error("作品データの読み込みに失敗しました。");
        console.error(error);

    });
```









        
    
    
    
    
    
    
    




        




