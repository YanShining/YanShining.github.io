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
        width: 250, // 默认宽度，当 fitDimension 为 'height' 时可能被覆盖
        height: 150, // 默认高度，当 fitDimension 为 'width' 时可能被覆盖
        aspectRatio: 250 / 150, // 卡片宽高比 (width / height)
        fitDimension: 'height' // 优先适应的维度: 'width' 或 'height'
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
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%'
    },
    
    // 资源文件路径
    assets: {
        cardBack: './assets/精准破局卡.png',
        cardFront: './assets/牌面.png',
        cardFaceBasePath: './assets/', // 新增：牌面图片基础路径
        dataFile: './data/card_data.csv'
    },

    // 验证码配置
    enableVerification: true, // 是否启用验证码功能
    verificationSalt: 'quanxiyouyi', // 用于生成验证码的盐值

    // 数据抽取配置
    dataOptions: {
        allowDuplicates: false  // 是否允许重复抽取数据
    }
};
