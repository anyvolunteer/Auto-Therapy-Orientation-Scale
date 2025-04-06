// 帮助面板和新手引导功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建帮助按钮
    const helpButton = document.createElement('div');
    helpButton.className = 'help-button';
    helpButton.id = 'help-button';
    helpButton.innerHTML = '?';
    helpButton.title = '查看帮助';
    document.body.appendChild(helpButton);

    // 创建帮助面板
    const helpPanel = document.createElement('div');
    helpPanel.className = 'help-panel';
    helpPanel.id = 'help-panel';
    
    // 帮助面板内容
    helpPanel.innerHTML = `
        <div class="help-panel-header">
            <h2 class="help-panel-title">使用指南</h2>
            <button class="help-panel-close" id="help-panel-close">&times;</button>
        </div>
        
        <div class="help-section">
            <h3 class="help-section-title">功能介绍</h3>
            <div class="help-section-content">
                <p>这是一个用于评估个人心理治疗理论取向偏好的量表。通过回答76个问题，系统会计算出您在15种不同心理治疗取向上的得分，帮助您了解自己的理论倾向。</p>
                <ul>
                    <li>包含76个评估问题，每个问题提供中英文双语显示</li>
                    <li>支持1-7分的李克特量表评分方式</li>
                    <li>实时显示问卷完成进度</li>
                    <li>自动计算15种不同心理治疗取向的得分</li>
                    <li>按得分从高到低排序显示结果</li>
                    <li>高亮显示得分最高的治疗取向</li>
                    <li>提供详细的计算过程说明</li>
                    <li>新手引导功能，帮助快速了解使用方法</li>
                    <li>一键测试填充功能，使用0💕112循环模式快速填写</li>
                    <li>完成作答后提供重新开始选项</li>
                </ul>
            </div>
        </div>
        
        <div class="help-section">
            <h3 class="help-section-title">使用方法</h3>
            <div class="help-section-content">
                <ol>
                    <li>阅读指导说明，了解评分标准</li>
                    <li>对每个问题选择1-7分的评分（1=强烈不同意，7=强烈同意）</li>
                    <li>回答完所有问题后，点击"计算结果"按钮</li>
                    <li>查看您在各个心理治疗取向上的得分结果</li>
                    <li>如需重新开始，可点击完成提示中的"重新开始"按钮</li>
                </ol>
            </div>
        </div>
        
        <div class="help-section">
            <h3 class="help-section-title">键盘操作指南</h3>
            <div class="help-section-content">
                <ul>
                    <li>使用数字键1-7直接选择对应选项</li>
                    <li>使用上下箭头键在不同问题间导航</li>
                    <li>使用左右箭头键在同一问题的选项间导航</li>
                </ul>
            </div>
        </div>
        
        <div class="help-section">
            <h3 class="help-section-title">注意事项</h3>
            <div class="help-section-content">
                <ul>
                    <li>本量表仅供参考，不应作为专业心理评估的替代</li>
                    <li>结果反映的是您对不同心理治疗理论的偏好，而非专业能力</li>
                    <li>建议在专业指导下解读结果</li>
                </ul>
            </div>
        </div>
        
        <div class="help-section">
            <h3 class="help-section-title">技术说明</h3>
            <div class="help-section-content">
                <ul>
                    <li>本应用使用纯HTML、CSS和JavaScript开发</li>
                    <li>无需任何外部依赖或服务器支持</li>
                    <li>完全在客户端运行，不会收集或发送任何数据</li>
                    <li>兼容所有现代浏览器</li>
                </ul>
            </div>
        </div>
        
        <div class="help-section">
            <button class="btn" id="start-tutorial">启动新手引导</button>
        </div>
    `;
    
    // 创建新手引导按钮（靠近答题区）
    const tutorialButton = document.createElement('button');
    tutorialButton.className = 'tutorial-button-standalone';
    tutorialButton.id = 'tutorial-button-standalone';
    tutorialButton.innerHTML = '启动新手引导';
    tutorialButton.title = '启动新手引导';
    
    // 将新手引导按钮添加到问卷区域附近
    const questionnaire = document.getElementById('questionnaire');
    if (questionnaire) {
        questionnaire.parentNode.insertBefore(tutorialButton, questionnaire);
    } else {
        // 如果问卷区域不存在，添加到控制按钮下方
        const controlButtons = document.querySelector('.control-buttons');
        if (controlButtons) {
            controlButtons.parentNode.insertBefore(tutorialButton, controlButtons.nextSibling);
        } else {
            // 如果控制按钮也不存在，添加到body
            document.body.appendChild(tutorialButton);
        }
    }
    
    // 新手引导按钮点击事件
    tutorialButton.addEventListener('click', function() {
        startTutorial();
    });
    
    // 将帮助面板添加到DOM
    document.body.appendChild(helpPanel);
    
    // 创建新手引导覆盖层
    const tutorialOverlay = document.createElement('div');
    tutorialOverlay.className = 'tutorial-overlay';
    tutorialOverlay.id = 'tutorial-overlay';
    document.body.appendChild(tutorialOverlay);
    
    // 帮助按钮点击事件
    helpButton.addEventListener('click', function() {
        helpPanel.classList.toggle('open');
    });
    
    // 关闭帮助面板按钮点击事件
    document.getElementById('help-panel-close').addEventListener('click', function() {
        helpPanel.classList.remove('open');
    });
    
    // 启动新手引导按钮点击事件
    document.getElementById('start-tutorial').addEventListener('click', function() {
        helpPanel.classList.remove('open');
        startTutorial();
    });
    
    // 每次打开文件都自动启动新手导航
    // 延迟启动新手引导，确保页面完全加载
    setTimeout(startTutorial, 1000);
    
    // 新手引导功能
    function startTutorial() {
        // 定义引导步骤
        const steps = [
            {
                target: '.instructions',
                title: '指导说明',
                content: '这里是量表的指导说明，解释了如何根据您对每个陈述的认同程度进行评分。',
                position: 'bottom'
            },
            {
                target: '.progress-container',
                title: '进度条',
                content: '这个进度条会显示您已完成的问题数量和百分比。',
                position: 'bottom'
            },
            {
                target: '.question:first-child',
                title: '问题',
                content: '每个问题都有中英文双语显示，请根据您的认同程度选择1-7分。',
                position: 'bottom'
            },
            {
                target: '.options',
                title: '评分选项',
                content: '点击相应的数字进行评分：1=强烈不同意，7=强烈同意。您也可以使用键盘数字键1-7直接选择。',
                position: 'top'
            },
            {
                target: '.control-buttons',
                title: '控制按钮',
                content: '您可以选择打乱题目顺序或恢复默认顺序。',
                position: 'bottom'
            },
            {
                target: '#calculate',
                title: '计算结果',
                content: '回答完所有问题后，点击此按钮查看您的评估结果。',
                position: 'top',
                onShow: function() {
                    // 滚动到计算结果按钮
                    document.querySelector('#calculate').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            },
            {
                target: '#help-button',
                title: '帮助按钮',
                content: '随时点击此按钮查看使用指南和帮助信息。',
                position: 'right',
                onShow: function() {
                    // 将帮助按钮定位到屏幕右侧1/4位置
                    const helpButton = document.querySelector('#help-button');
                    const windowWidth = window.innerWidth;
                    helpButton.style.left = (windowWidth * 0.75) + 'px';
                }
            }
        ];
        
        let currentStep = 0;
        const tutorialOverlay = document.getElementById('tutorial-overlay');
        
        // 显示当前步骤
        function showStep(stepIndex) {
            // 清除之前的高亮和步骤元素
            document.querySelectorAll('.tutorial-highlight').forEach(el => {
                el.classList.remove('tutorial-highlight');
            });
            
            const existingStep = document.querySelector('.tutorial-step');
            if (existingStep) {
                existingStep.remove();
            }
            
            if (stepIndex >= steps.length) {
                // 结束引导
                tutorialOverlay.style.display = 'none';
                return;
            }
            
            // 显示覆盖层
            tutorialOverlay.style.display = 'block';
            
            const step = steps[stepIndex];
            const targetElement = document.querySelector(step.target);
            
            if (!targetElement) {
                // 如果目标元素不存在，跳到下一步
                showStep(stepIndex + 1);
                return;
            }
            
            // 高亮目标元素
            targetElement.classList.add('tutorial-highlight');
            
            // 如果步骤有onShow回调，执行它
            if (step.onShow && typeof step.onShow === 'function') {
                step.onShow();
            }
            
            // 创建步骤元素
            const stepElement = document.createElement('div');
            stepElement.className = 'tutorial-step';
            
            // 设置步骤内容
            stepElement.innerHTML = `
                <div class="tutorial-step-number">${stepIndex + 1}/${steps.length}</div>
                <div class="tutorial-title">${step.title}</div>
                <div class="tutorial-content">${step.content}</div>
                <div class="tutorial-buttons">
                    <button class="tutorial-button tutorial-button-skip">跳过引导</button>
                    <button class="tutorial-button tutorial-button-next">${stepIndex === steps.length - 1 ? '完成' : '下一步'}</button>
                </div>
                <div class="tutorial-arrow tutorial-arrow-${step.position}"></div>
            `;
            
            document.body.appendChild(stepElement);
            
            // 定位步骤元素
            positionStepElement(stepElement, targetElement, step.position);
            
            // 添加按钮事件
            stepElement.querySelector('.tutorial-button-next').addEventListener('click', function() {
                showStep(stepIndex + 1);
            });
            
            stepElement.querySelector('.tutorial-button-skip').addEventListener('click', function() {
                tutorialOverlay.style.display = 'none';
                document.querySelectorAll('.tutorial-highlight').forEach(el => {
                    el.classList.remove('tutorial-highlight');
                });
                stepElement.remove();
            });
        }
        
        // 定位步骤元素
        function positionStepElement(stepElement, targetElement, position) {
            const targetRect = targetElement.getBoundingClientRect();
            const stepRect = stepElement.getBoundingClientRect();
            
            let left, top;
            
            switch (position) {
                case 'top':
                    left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
                    top = targetRect.top - stepRect.height - 10;
                    break;
                case 'bottom':
                    left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
                    top = targetRect.bottom + 10;
                    break;
                case 'left':
                    left = targetRect.left - stepRect.width - 10;
                    top = targetRect.top + (targetRect.height / 2) - (stepRect.height / 2);
                    break;
                case 'right':
                    left = targetRect.right + 10;
                    top = targetRect.top + (targetRect.height / 2) - (stepRect.height / 2);
                    break;
            }
            
            // 确保步骤元素在视口内
            if (left < 10) left = 10;
            if (top < 10) top = 10;
            if (left + stepRect.width > window.innerWidth - 10) {
                left = window.innerWidth - stepRect.width - 10;
            }
            if (top + stepRect.height > window.innerHeight - 10) {
                top = window.innerHeight - stepRect.height - 10;
            }
            
            stepElement.style.left = `${left}px`;
            stepElement.style.top = `${top}px`;
        }
        
        // 开始显示第一步
        showStep(currentStep);
        
        // 在最后一步完成后自动执行一键测试填充
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('tutorial-button-next') && e.target.textContent === '完成') {
                // 当点击最后一步的"完成"按钮时，自动执行一键测试填充
                setTimeout(() => {
                    if (typeof testFill === 'function') {
                        testFill();
                        // 显示完成提示
                        const completionMessage = document.createElement('div');
                        completionMessage.className = 'completion-message';
                        completionMessage.style.position = 'fixed';
                        completionMessage.style.top = '50%';
                        completionMessage.style.left = '50%';
                        completionMessage.style.transform = 'translate(-50%, -50%)';
                        completionMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
                        completionMessage.style.color = 'white';
                        completionMessage.style.padding = '20px';
                        completionMessage.style.borderRadius = '10px';
                        completionMessage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                        completionMessage.style.zIndex = '2000';
                        completionMessage.style.textAlign = 'center';
                        completionMessage.style.maxWidth = '80%';
                        completionMessage.style.animation = 'fadeIn 0.5s';
                        
                        completionMessage.innerHTML = `
                            <h3 style="margin-top: 0;">恭喜您完成作答！</h3>
                            <p>感谢您的好奇心、求知欲</p>
                            与自己对内心关照。</p>
                            <p>您现在可以点击【页面底部的】"计算结果"按钮</p>
                            <p>查看您的心理治疗取向评估结果。</p>
                            <p>【点击关闭按钮】或者【双击鼠标】关闭通话框</p>
                            <button id="restart-test" style="background-color: #3498db; color: white; border: none; padding: 8px 16px; margin-right: 10px; border-radius: 4px; cursor: pointer;">重新开始</button>
                            <button id="close-message" style="background-color: white; color: #4CAF50; border: none; padding: 8px 16px; margin-top: 10px; border-radius: 4px; cursor: pointer;">双击任何区域以关闭</button>
                        `;
                        
                        document.body.appendChild(completionMessage);
                        
                        document.getElementById('close-message').addEventListener('click', function() {
                            document.body.removeChild(completionMessage);
                        });
                        
                        document.getElementById('restart-test').addEventListener('click', function() {
                            // 清空所有选择
                            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                                radio.checked = false;
                            });
                            document.querySelectorAll('.question').forEach(question => {
                                question.classList.remove('answered');
                            });
                            // 隐藏结果区域
                            document.getElementById('results').style.display = 'none';
                            // 重置进度条
                            updateProgressBar();
                            // 关闭提示
                            document.body.removeChild(completionMessage);
                        });
                        
                        // 添加双击关闭功能
                        document.addEventListener('dblclick', function(e) {
                            // 确保双击的不是按钮
                            if (!e.target.matches('button')) {
                                const completionMessage = document.querySelector('.completion-message');
                                if (completionMessage) {
                                    document.body.removeChild(completionMessage);
                                }
                            }
                        });
                        
                        // 移除自动关闭功能，只有点击关闭按钮才能关闭提示
                    }
                }, 500);
            }
        });
    }
});

// 键盘上下键导航逻辑
function handleKeyNavigation(event) {
    // 如果当前有输入框或单选按钮被聚焦，不处理键盘导航
    // 这样可以避免与index.html中的键盘导航冲突
    const activeElement = document.activeElement;
    const isFormElement = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT';
    if (isFormElement) {
        return;
    }
    
    cachedQuestions = Array.from(document.querySelectorAll('.question'));

    if (cachedQuestions.length === 0) {
        console.warn('No questions found in the DOM.');
        return;
    }

    let currentIndex = cachedQuestions.findIndex(q => q.classList.contains('current-focus'));

    // 如果没有当前焦点，默认设置第一个元素为焦点
    if (currentIndex === -1 && cachedQuestions.length > 0) {
        currentIndex = 0;
        cachedQuestions[currentIndex].classList.add('current-focus');
    }

    if (event.key === 'ArrowUp') {
        if (currentIndex > 0) {
            moveFocus(currentIndex - 1);
        }
    } else if (event.key === 'ArrowDown') {
        if (currentIndex < cachedQuestions.length - 1) {
            moveFocus(currentIndex + 1);
        }
    }
}

// 焦点移动逻辑
function moveFocus(newIndex) {
    const questions = cachedQuestions;
    if (newIndex < 0 || newIndex >= questions.length) {
        console.warn('Invalid index for focus navigation:', newIndex);
        return;
    }

    const currentElement = questions[newIndex];
    if (!currentElement) {
        console.error('Failed to find question element at index:', newIndex);
        return;
    }

    // 移除旧焦点并添加新焦点
    questions.forEach(q => q.classList.remove('current-focus'));
    currentElement.classList.add('current-focus');

    // 滚动到目标元素
    currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 使用变量存储事件处理函数引用，以便可以在需要时移除
const keyNavHandler = handleKeyNavigation;
document.addEventListener('keydown', keyNavHandler);

// 添加键盘事件监听器
document.addEventListener('keydown', function(event) {
    // 检查是否输入了999
    if (event.key === '9') {
        // 使用一个临时变量来存储输入的数字
        let input = '';
        const keydownHandler = function(e) {
            if (e.key === '9') {
                input += '9';
                if (input === '999') {
                    // 清除页面缓存
                    clearPageCache();
                    // 移除事件监听器，防止重复触发
                    document.removeEventListener('keydown', keydownHandler);
                }
            } else {
                // 如果输入不是9，则重置输入
                input = '';
                document.removeEventListener('keydown', keydownHandler);
            }
        };
        document.addEventListener('keydown', keydownHandler);
    }
});

// 清除页面缓存的函数
function clearPageCache() {
    // 清除localStorage
    localStorage.clear();
    // 清除sessionStorage
    sessionStorage.clear();
    // 刷新页面
    location.reload();
}
