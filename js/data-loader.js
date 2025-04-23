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
                ['0', '内容1', '备注1', './assets/0.png'],
                ['1', '内容2', '备注2', './assets/1.png'],
                ['2', '内容3', '备注3', './assets/2.png'],
                ['3', '内容4', '备注4', './assets/3.png'],
                ['4', '内容5', '备注5', './assets/4.png'],
                ['5', '内容6', '备注6', './assets/5.png'],
                ['6', '内容7', '备注7', './assets/6.png'],
                ['7', '内容8', '备注8', './assets/7.png'],
                ['8', '内容9', '备注9', './assets/8.png'],
                ['9', '内容10', '备注10', './assets/9.png'],
                ['X', '内容11', '备注11', './assets/X.png']
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