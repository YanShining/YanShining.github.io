// 卡片配置文件
const CONFIG = {
    // 页面名称
    indexName: "随机翻牌效果",

    // 卡片数量
    cardCount: 9,
    
    // 卡片布局配置
    cardLayout: {
        gap: 20,  // 卡片之间的间距
        columns: 3  // 每行卡片数量
    },
    
    // 卡片样式配置
    cardStyle: {
        width: 250,
        height: 150
    },
    
    // 字符框体配置
    textBoxes: [
        {
            id: 'box1',
            top: '20%',
            left: '10%',
            width: '80%',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            visible: false,
            opacity: 1
        },
        {
            id: 'box2',
            top: '45%',
            left: '10%',
            width: '80%',
            fontSize: '16px',
            fontWeight: 'normal',
            color: '#555',
            visible: false,
            opacity: 1
        },
        {
            id: 'box3',
            top: '70%',
            left: '10%',
            width: '80%',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#777',
            visible: false,
            opacity: 1
        }
    ],
    
    // 图片框配置
    imageBox: {
        id: 'imageBox',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%'
    },
    
    // 资源文件路径
    assets: {
        cardBack: './assets/精准破局卡.png',
        cardFront: './assets/牌面.png',
        dataFile: './data/card_data.csv'
    },

    // 数据抽取配置
    dataOptions: {
        allowDuplicates: false  // 是否允许重复抽取数据
    }
};
