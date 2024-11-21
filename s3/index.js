document.addEventListener('DOMContentLoaded', () => {
  const btn1 = new Button({
    id: 'btn1',
    onClick: () => {
      const modal = new Modal({
        title: '之道前端简介',
        content: '学前端，来之道 —— 陪伴式自学前端圈子',
        onOk: () => {
          alert('感谢你的关注');
          modal.close();
        }
      });
    }
  });

  let modal1;
  const btn2 = new Button({
    id: 'btn2',
    onClick: () => {
      if (modal1) {
        modal1.open();
        return;
      }

      let timer;
      modal1 = new Modal({
        title: '测试不会被销毁的对话框',
        content: (root) => {
          const start = Date.now();
          const counterCls = 'js-counter';
          const inputCls = 'input';
          const btnId = 'test-btn';

          function getCounter() {
            const end = Date.now();

            return Math.floor((end - start) / 1000);
          }

          root.innerHTML = `
            <p>计时：<span class="${counterCls}">${getCounter()}</span>秒</p>
            <input class="${inputCls}" type="number" placeholder="随便输入一个数字"></input>
            <div id="${btnId}">提交信息</div>
          `;

          setTimeout(() => {
            const counterDom = root.getElementsByClassName(counterCls)[0];
            timer = setInterval(() => {
              counterDom.innerText = getCounter();
            }, 1000);

            const submitBtn = new Button({
              id: btnId,
              onClick: () => {
                alert(`当前计时: ${counterDom.innerText}秒, 你输入的数字是: ${root.getElementsByClassName(inputCls)[0].value}`);
              }
            });
          }, 0);
        },
        onDestroy: () => {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }
      });
    }
  });

  let modal2;
  const btn3 = new Button({
    id: 'btn3',
    onClick: () => {
      if (modal2) {
        modal2.open();
        return;
      }

      let timer;
      modal2 = new Modal({
        title: '测试会被销毁的对话框',
        destroyOnClose: true,
        content: (root) => {
          const start = Date.now();
          const counterCls = 'js-counter';
          const inputCls = 'input';
          const btnId = 'test-btn2';

          function getCounter() {
            const end = Date.now();

            return Math.floor((end - start) / 1000);
          }
          
          root.innerHTML = `
            <p>计时：<span class="${counterCls}">${getCounter()}</span>秒</p>
            <input class="${inputCls}" type="number" placeholder="随便输入一个数字"></input>
            <div id="${btnId}">提交信息</div>
          `;

          setTimeout(() => {
            const counterDom = root.getElementsByClassName(counterCls)[0];
            timer = setInterval(() => {
              counterDom.innerText = getCounter();
            }, 1000);

            const submitBtn = new Button({
              id: btnId,
              onClick: () => {
                alert(`当前计时: ${counterDom.innerText}秒, 你输入的数字是: ${root.getElementsByClassName(inputCls)[0].value}`);
              }
            });
          }, 0);
        },
        onOk: () => {
          modal.close();
        },
        onDestroy: () => {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }
      });
    }
  });

  const btn4 = new Button({
    id: 'btn4',
    onClick: () => {
      const modal = new Modal({
        title: '之道前端简介',
        content: '学前端，来之道 —— 陪伴式自学前端圈子',
        okBtnPorps: {
          text: '之道前端使命',
          onClick: () => {
            alert('提升前端开发的职业天花板，延长前端开发的职业寿命');
            modal.close();
          }
        },
        cancelBtnProps: {
          text: '关闭'
        }
      });
    }
  });

  const btn5 = new Button({
    id: 'btn5',
    onClick: () => {
      const modal = new Modal({
        title: '之道前端简介',
        content: '学前端，来之道 —— 陪伴式自学前端圈子',
        onOk: () => {
          alert('感谢你的关注');
          modal.close();
        },
        footer: (parent, cancel, ok) => {
          parent.removeChild(cancel);
        }
      });
    }
  });

  const btn6 = new Button({
    id: 'btn6',
    onClick: () => {
      const modal = new Modal({
        title: '之道前端简介',
        content: '学前端，来之道 —— 陪伴式自学前端圈子',
        onOk: () => {
          alert('感谢你的关注');
          modal.close();
        },
        footer: (parent, cancel, ok) => {
          const dom = document.createElement('div');
          const btn = new Button({
            root: dom,
            cls: 'test',
            text: '之道前端的使命',
            onClick: () => {
              alert('提升前端开发的职业天花板，延长前端开发的职业寿命');
              modal.close();
            }
          });
          parent.insertBefore(dom, ok);
        }
      });
    }
  });
});
