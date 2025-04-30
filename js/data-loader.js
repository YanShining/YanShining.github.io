// 数据加载器
// 数据加载器
class DataLoader {
    constructor() { // 不再需要 dataFilePath
        // 将 CSV 数据直接嵌入
        this.embeddedCsvData = 
`0,内容1,备注1,5_00.png
11,内容1,备注1,5_01.png
22,内容2,备注2,5_02.png
33,内容3,备注3,5_03.png
44,内容4,备注4,5_04.png
5,内容5,备注5,5_05.png
66,内容6,备注6,5_21.png
77,内容7,备注7,5_18.png
88,内容8,备注8,5_19.png
99,内容9,备注9,5_20.png
1221,内容10,备注10,5_06.png
1331,内容10,备注10,5_10.png
1441,内容10,备注10,5_14.png
1661,内容10,备注10,5_22.png
1771,内容10,备注10,5_26.png
1881,内容10,备注10,5_30.png
1991,内容10,备注10,5_34.png
2332,内容10,备注10,5_29.png
2442,内容10,备注10,5_33.png
2662,内容10,备注10,5_37.png
2772,内容10,备注10,5_13.png
2882,内容10,备注10,5_17.png
2992,内容10,备注10,5_25.png
3443,内容10,备注10,5_36.png
3663,内容10,备注10,5_32.png
3773,内容10,备注10,5_09.png
3883,内容10,备注10,5_24.png
3993,内容10,备注10,5_16.png
4664,内容10,备注10,5_28.png
4774,内容10,备注10,5_23.png
4884,内容10,备注10,5_08.png
4994,内容10,备注10,5_12.png
6776,内容10,备注10,5_15.png
6886,内容10,备注10,5_11.png
6996,内容10,备注10,5_07.png
7887,内容10,备注10,5_35.png
7997,内容10,备注10,5_31.png
8998,内容10,备注10,5_27.png`;
        this.data = [];
        this.usedIndices = new Set();  // 用于跟踪已使用的数据索引
    }

    // 加载嵌入的CSV数据
    async loadData() {
        try {
            console.log('正在解析嵌入的数据...');
            this.parseCSV(this.embeddedCsvData);
            console.log('数据加载成功，共加载', this.data.length, '组数据');
            return true;
        } catch (error) {
            console.error('解析嵌入数据失败:', error);
            // 提供备用或默认数据
            this.data = [
                ['错误', '无法加载数据', '解析嵌入数据时出错', 'X.png'] 
            ];
            return false;
        }
    }

    // 解析CSV文本
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        this.data = lines.map(line => {
            // Simple CSV parsing: split by comma, trim whitespace, remove surrounding quotes if any
            return line.split(',').map(field => field.trim().replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
        });
    }

    // 获取随机数据组
    getRandomDataGroup() {
        if (this.data.length === 0) {
            console.error('数据未加载或为空');
            return ['数据错误', '请检查数据文件', '加载失败'];
        }

        // 如果不允许重复且已使用所有数据，则重置已使用集合
        if (!CONFIG.dataOptions.allowDuplicates && this.usedIndices.size >= this.data.length) {
            this.usedIndices.clear();
            console.log('已重置数据池');
        }

        let randomIndex;
        if (!CONFIG.dataOptions.allowDuplicates) {
            // 获取未使用的随机索引
            const availableIndices = Array.from(Array(this.data.length).keys())
                .filter(index => !this.usedIndices.has(index));
            randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            this.usedIndices.add(randomIndex);
        } else {
            // 允许重复，直接随机
            randomIndex = Math.floor(Math.random() * this.data.length);
        }

        return this.data[randomIndex];
    }
}