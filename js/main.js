// 主程序
document.addEventListener('DOMContentLoaded', async () => {
    // 设置页面标题
    document.title = CONFIG.indexName;

    // 获取页面元素
    const cardContainer = document.getElementById('card-container');
    const cardCountSelect = document.getElementById('card-count-select');
    
    // 创建数据加载器
    const dataLoader = new DataLoader(); // 不再需要文件路径参数
    
    // 加载数据
    await dataLoader.loadData();
    
    // 存储当前卡片
    let cards = [];

    // 创建卡片函数
    function createCards(count, layoutType) {
        // 清空现有卡片
        cardContainer.innerHTML = '';
        cards = [];

        // 创建新卡片
        for (let i = 0; i < count; i++) {
            const dataGroup = dataLoader.getRandomDataGroup();
            console.log(`Card ${i} data:`, dataGroup); // <-- Add this log
            const card = new Card(i, cardContainer);
            card.setData(dataGroup);
            card.create();
            cards.push(card);
        }

        // 调整布局
        adjustLayout(layoutType);
    }

    // 响应式布局调整
    function adjustLayout(layoutType) {
        const containerWidth = cardContainer.clientWidth;
        const gap = 20; // 固定间距
        const cardElements = cardContainer.querySelectorAll('.card');
        const { fitDimension, aspectRatio } = CONFIG.cardStyle;
        let columns;
        let cardWidth, cardHeight;

        // 应用网格居中
        cardContainer.style.justifyContent = 'center';
        cardContainer.style.alignContent = 'center';

        if (layoutType === 'cross') {
            columns = 3; // 十字布局基于3列
            cardContainer.style.gridTemplateColumns = `repeat(3, 1fr)`;
            cardContainer.style.gridTemplateRows = 'repeat(3, auto)'; // 明确3行
            cardContainer.style.gap = `${gap}px`;

            if (fitDimension === 'height') {
                const availableHeight = window.innerHeight - 100;
                const rows = 3;
                const calculatedHeight = rows > 0 ? (availableHeight - (gap * (rows - 1))) / rows : CONFIG.cardStyle.height;
                cardHeight = Math.max(50, calculatedHeight);
                cardWidth = cardHeight * aspectRatio;

                const maxCardWidthBasedOnContainer = (containerWidth - (gap * (columns - 1))) / columns;
                if (cardWidth > maxCardWidthBasedOnContainer) {
                    console.warn('Cross layout height fit warning: Calculated width exceeds available width. Adjusting based on width.');
                    cardWidth = maxCardWidthBasedOnContainer;
                    cardHeight = cardWidth / aspectRatio;
                }
            } else { // fitDimension === 'width' or default
                cardWidth = (containerWidth - (gap * (columns - 1))) / columns;
                cardHeight = cardWidth / aspectRatio;
            }

            // 应用尺寸并清除定位
            cardElements.forEach(card => {
                card.style.width = `${cardWidth}px`;
                card.style.height = `${cardHeight}px`;
                card.style.gridColumn = '';
                card.style.gridRow = '';
            });

            // 手动将卡片放置到十字布局的正确网格单元
            const crossLayoutPositions = [
                { row: 1, col: 2 }, // Top center
                { row: 2, col: 1 }, // Middle left
                { row: 2, col: 2 }, // Middle center
                { row: 2, col: 3 }, // Middle right
                { row: 3, col: 2 }  // Bottom center
            ];
            cardElements.forEach((card, index) => {
                if (index < crossLayoutPositions.length) {
                    card.style.gridRow = crossLayoutPositions[index].row;
                    card.style.gridColumn = crossLayoutPositions[index].col;
                }
            });

        } else { // Handle standard grid layout (non-cross)
            // 动态计算列数，尝试形成接近方形的网格
            const numCards = cardElements.length;
            if (numCards === 3) {
                columns = 3; // 特殊处理：3张卡片时强制为3列
            } else {
                columns = Math.ceil(Math.sqrt(numCards));
                // 确保至少有1列
                columns = Math.max(1, columns);
                // 限制最大列数，例如不超过5列，防止卡片过小
                columns = Math.min(columns, 5);
            }

            if (fitDimension === 'width') {
                cardWidth = (containerWidth - (gap * (columns - 1))) / columns;
                cardHeight = cardWidth / aspectRatio;
            } else if (fitDimension === 'height') {
                const availableHeight = window.innerHeight - 100;
                const rows = Math.ceil(numCards / columns);
                const calculatedHeight = rows > 0 ? (availableHeight - (gap * (rows - 1))) / rows : CONFIG.cardStyle.height;
                cardHeight = Math.max(50, calculatedHeight);
                cardWidth = cardHeight * aspectRatio;

                const maxCardWidthBasedOnContainer = (containerWidth - (gap * (columns - 1))) / columns;
                if (cardWidth > maxCardWidthBasedOnContainer) {
                    cardWidth = maxCardWidthBasedOnContainer;
                    cardHeight = cardWidth / aspectRatio;
                }
            } else {
                // Default to width fitting
                cardWidth = (containerWidth - (gap * (columns - 1))) / columns;
                cardHeight = cardWidth / aspectRatio;
            }

            // 更新卡片样式
            cardElements.forEach(card => {
                card.style.width = `${cardWidth}px`;
                card.style.height = `${cardHeight}px`;
                // 清除之前的网格定位，以防冲突
                card.style.gridColumn = '';
                card.style.gridRow = '';
            });

            // 设置网格列数和间距
            cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            cardContainer.style.gridTemplateRows = 'auto'; // 行数自动
            cardContainer.style.gap = `${gap}px`;
        }
    }

    // 解析布局值
    function parseLayoutValue(value) {
        const parts = value.split('-');
        const count = parseInt(parts[0]);
        const layoutType = parts[1]; // 'cross' 或 列数
        return { count, layoutType };
    }

    // 下拉框改变事件处理
    cardCountSelect.addEventListener('change', (e) => {
        const { count, layoutType } = parseLayoutValue(e.target.value);
        createCards(count, layoutType);
    });

    // 初始化卡片（使用默认选项）
    const { count: initialCount, layoutType: initialLayoutType } = parseLayoutValue(cardCountSelect.value);
    createCards(initialCount, initialLayoutType);

    // 窗口大小变化时调整布局
    window.addEventListener('resize', () => {
        const { layoutType } = parseLayoutValue(cardCountSelect.value);
        adjustLayout(layoutType);
    });
});