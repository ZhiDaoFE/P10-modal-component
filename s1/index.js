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
});
