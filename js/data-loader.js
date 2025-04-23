// 数据加载器
class DataLoader {
    constructor(dataFilePath) {
        this.dataFilePath = dataFilePath;
        this.data = [];
        this.usedIndices = new Set();  // 用于跟踪已使用的数据索引
    }

    // 加载CSV数据
    async loadData() {
        try {
            // 模拟CSV数据加载
            // 实际项目中，这里应该使用fetch或其他方法从服务器获取CSV文件
            // 由于浏览器安全限制，本地文件可能需要通过服务器访问
            console.log('正在加载数据文件:', this.dataFilePath);
            
            // 模拟数据
            this.data = [
                ['0', '内容1', '备注1', './assets/5_00.png'],
                ['11', '内容1', '备注1', './assets/5_01.png'],
                ['22', '内容2', '备注2', './assets/5_02.png'],
                ['33', '内容3', '备注3', './assets/5_03.png'],
                ['44', '内容4', '备注4', './assets/5_04.png'],
                ['5', '内容5', '备注5', './assets/5_05.png'],
                ['66', '内容6', '备注6', './assets/5_21.png'],
                ['77', '内容7', '备注7', './assets/5_18.png'],
                ['88', '内容8', '备注8', './assets/5_19.png'],
                ['99', '内容9', '备注9', './assets/5_20.png'],
                ['12/21', '内容10', '备注10', './assets/5_06.png'],
                ['13/31', '内容10', '备注10', './assets/5_10.png'],
                ['14/41', '内容10', '备注10', './assets/5_14.png'],
                ['16/61', '内容10', '备注10', './assets/5_22.png'],
                ['17/71', '内容10', '备注10', './assets/5_26.png'],
                ['18/81', '内容10', '备注10', './assets/5_30.png'],
                ['19/91', '内容10', '备注10', './assets/5_34.png'],
                ['23/32', '内容10', '备注10', './assets/5_29.png'],
                ['24/42', '内容10', '备注10', './assets/5_33.png'],
                ['26/62', '内容10', '备注10', './assets/5_37.png'],
                ['27/72', '内容10', '备注10', './assets/5_13.png'],
                ['28/82', '内容10', '备注10', './assets/5_17.png'],
                ['29/92', '内容10', '备注10', './assets/5_25.png'],
                ['34/43', '内容10', '备注10', './assets/5_36.png'],
                ['36/63', '内容10', '备注10', './assets/5_32.png'],
                ['37/73', '内容10', '备注10', './assets/5_09.png'],
                ['38/83', '内容10', '备注10', './assets/5_24.png'],
                ['39/93', '内容10', '备注10', './assets/5_16.png'],
                ['46/64', '内容10', '备注10', './assets/5_28.png'],
                ['47/74', '内容10', '备注10', './assets/5_23.png'],
                ['48/84', '内容10', '备注10', './assets/5_08.png'],
                ['49/94', '内容10', '备注10', './assets/5_12.png'],
                ['67/76', '内容10', '备注10', './assets/5_15.png'],
                ['68/86', '内容10', '备注10', './assets/5_11.png'],
                ['69/96', '内容10', '备注10', './assets/5_07.png'],
                ['78/87', '内容10', '备注10', './assets/5_35.png'],
                ['79/97', '内容10', '备注10', './assets/5_31.png'],
                ['89/98', '内容10', '备注10', './assets/5_27.png']
            ];
            
            console.log('数据加载成功，共加载', this.data.length, '组数据');
            return true;
        } catch (error) {
            console.error('加载数据失败:', error);
            return false;
        }
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