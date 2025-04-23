// 卡片类
class Card {
    constructor(id, container) {
        this.id = id;
        this.container = container;
        this.element = null;
        this.isFlipped = false;
        this.dataGroup = null;
    }

    // 设置卡片数据
    setData(dataGroup) {
        this.dataGroup = dataGroup;
    }

    // 创建卡片元素
    create() {
        // 创建卡片容器
        this.element = document.createElement('div');
        this.element.className = 'card';
        this.element.id = `card-${this.id}`;
        
        // 应用配置中的卡片样式
        this.element.style.width = `${CONFIG.cardStyle.width}px`;
        this.element.style.height = `${CONFIG.cardStyle.height}px`;
        
        // 创建卡片内部容器
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        cardInner.style.width = '100%';
        cardInner.style.height = '100%';
        
        // 创建卡片背面
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const backImg = document.createElement('img');
        backImg.src = CONFIG.assets.cardBack;
        backImg.alt = '卡片背面';
        cardBack.appendChild(backImg);
        
        // 创建卡片正面
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const frontImg = document.createElement('img');
        frontImg.src = CONFIG.assets.cardFront;
        frontImg.alt = '卡片正面';
        cardFront.appendChild(frontImg);
        
        // 创建文本容器
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        // 创建图片框
        const imageBox = document.createElement('div');
        imageBox.className = 'image-box';
        imageBox.id = `${this.id}-${CONFIG.imageBox.id}`;
        imageBox.style.position = 'absolute';
        imageBox.style.top = CONFIG.imageBox.top;
        imageBox.style.left = CONFIG.imageBox.left;
        imageBox.style.width = CONFIG.imageBox.width;
        imageBox.style.height = CONFIG.imageBox.height;
        
        // 创建图片元素
        const customImage = document.createElement('img');
        customImage.style.width = '100%';
        customImage.style.height = '100%';
        customImage.style.objectFit = 'contain';
        
        // 如果有数据，则设置图片路径
        if (this.dataGroup && this.dataGroup[3]) {
            customImage.src = this.dataGroup[3];
        }
        
        imageBox.appendChild(customImage);
        cardFront.appendChild(imageBox);
        
        // 根据配置创建文本框
        CONFIG.textBoxes.forEach((boxConfig, index) => {
            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.id = `${this.id}-${boxConfig.id}`;
            textBox.style.position = 'absolute';
            textBox.style.top = boxConfig.top;
            textBox.style.left = boxConfig.left;
            textBox.style.width = boxConfig.width;
            textBox.style.fontSize = boxConfig.fontSize;
            textBox.style.fontWeight = boxConfig.fontWeight;
            textBox.style.color = boxConfig.color;
            
            // 应用可见性和透明度设置
            if (boxConfig.visible === false) {
                textBox.style.display = 'none';
            }
            textBox.style.opacity = boxConfig.opacity;
            
            // 如果有数据，则填充内容
            if (this.dataGroup && this.dataGroup[index]) {
                textBox.textContent = this.dataGroup[index];
            } else {
                textBox.textContent = `文本 ${index + 1}`;
            }
            
            textContainer.appendChild(textBox);
        });
        
        cardFront.appendChild(textContainer);
        
        // 组装卡片
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        this.element.appendChild(cardInner);
        
        // 添加点击事件
        this.element.addEventListener('click', () => this.flip());
        
        // 将卡片添加到容器
        this.container.appendChild(this.element);
        
        return this;
    }

    // 翻转卡片
    flip() {
        this.isFlipped = !this.isFlipped;
        if (this.isFlipped) {
            this.element.classList.add('flipped');
        } else {
            this.element.classList.remove('flipped');
        }
    }

    // 更新卡片内容
    updateContent(dataGroup) {
        this.dataGroup = dataGroup;
        
        // 更新各个文本框的内容
        CONFIG.textBoxes.forEach((boxConfig, index) => {
            const textBox = document.getElementById(`${this.id}-${boxConfig.id}`);
            if (textBox) {
                // 应用可见性和透明度设置
                if (boxConfig.visible === false) {
                    textBox.style.display = 'none';
                } else {
                    textBox.style.display = '';
                }
                textBox.style.opacity = boxConfig.opacity;
                
                // 更新文本内容
                if (this.dataGroup && this.dataGroup[index]) {
                    textBox.textContent = this.dataGroup[index];
                }
            }
        });
        
        // 更新图片框的内容
        const imageBox = document.getElementById(`${this.id}-${CONFIG.imageBox.id}`);
        if (imageBox && this.dataGroup && this.dataGroup[3]) {
            const customImage = imageBox.querySelector('img');
            if (customImage) {
                customImage.src = this.dataGroup[3];
            }
        }
    }
}