// 主程序
document.addEventListener('DOMContentLoaded', async () => {
    // 设置页面标题
    document.title = CONFIG.indexName;

    // 获取页面元素
    const cardContainer = document.getElementById('card-container');
    const cardCountSelect = document.getElementById('card-count-select');
    
    // 创建数据加载器
    const dataLoader = new DataLoader(CONFIG.assets.dataFile);
    
    // 加载数据
    await dataLoader.loadData();
    
    // 存储当前卡片
    let cards = [];

    // 创建卡片函数
    function createCards(count, columns) {
        // 清空现有卡片
        cardContainer.innerHTML = '';
        cards = [];

        // 创建新卡片
        for (let i = 0; i < count; i++) {
            const dataGroup = dataLoader.getRandomDataGroup();
            const card = new Card(i, cardContainer);
            card.setData(dataGroup);
            card.create();
            cards.push(card);
        }

        // 调整布局
        adjustLayout(columns);
    }

    // 响应式布局调整
    function adjustLayout(columns) {
        const containerWidth = cardContainer.clientWidth;
        const gap = 20; // 固定间距

        // 计算卡片宽度（容器宽度减去间距后平均分配）
        const cardWidth = (containerWidth - (gap * (columns - 1))) / columns;
        const cardHeight = cardWidth * 0.6; // 高度为宽度的60%

        // 更新卡片样式
        document.querySelectorAll('.card').forEach(card => {
            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;
        });

        // 设置网格列数和间距
        cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        cardContainer.style.gap = `${gap}px`;
    }

    // 下拉框改变事件处理
    cardCountSelect.addEventListener('change', (e) => {
        const [count, columns] = e.target.value.split('-').map(Number);
        createCards(count, columns);
    });

    // 初始化卡片（使用默认选项）
    const [count, columns] = cardCountSelect.value.split('-').map(Number);
    createCards(count, columns);

    // 窗口大小变化时调整布局
    window.addEventListener('resize', () => {
        const [, columns] = cardCountSelect.value.split('-').map(Number);
        adjustLayout(columns);
    });
});