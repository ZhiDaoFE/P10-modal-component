const Modal = ((document) => {
  const defaultCls = 'zd-modal';
  const maskCls = 'zd-modal-mask';
  const wrapCls = 'zd-modal-wrap';
  const titleCls = 'zd-modal-title';
  const closeBtnCls = 'zd-modal-close';
  const closeIconCls = 'zd-modal-close-icon';
  const bodyCls = 'zd-modal-body';
  const footerCls = 'zd-modal-footer';
  const footerBtnCls = 'zd-modal-footer-btn';
  const cancelBtnCls = `${footerBtnCls}--cancel`;
  const okBtnCls = `${footerBtnCls}--ok`;

  return class {
    // _root;
    // _mask;
    // _closeBtn;
    // _cancelBtn;
    // _okBtn;

    constructor(props = {}) {
      this.close = this.close.bind(this);

      this.init(props);
    }

    init(props) {
      this._buildModal(props);
    }

    _buildModal(props) {
      const { cls, title = '', content = '', closable = true, onOk } = props;
  
      this._root = document.createElement('div');
      this._root.classList.add(defaultCls, cls);
      this._root.innerHTML = `
        <div class="${maskCls}"></div>
        <div class="${wrapCls}">
          ${closable ? `<button class="${closeBtnCls}"><img class="${closeIconCls}" src="./assets/icon_close.svg" /></button>` : ''}
          <p class="${titleCls}">${title}</p>
          <div class="${bodyCls}">${content}</div>
          <div class="${footerCls}">
            <button class="${footerBtnCls} ${cancelBtnCls}">取消</button>
            <button class="${footerBtnCls} ${okBtnCls}">确定</button>
          </div>
        </div>`;
  
      this._mask = this._root.getElementsByClassName(maskCls)[0];
      this._closeBtn = this._root.getElementsByClassName(closeBtnCls)[0];
      this._cancelBtn = this._root.getElementsByClassName(cancelBtnCls)[0];
      this._okBtn = this._root.getElementsByClassName(okBtnCls)[0];

      this._mask.addEventListener('click', this.close);
      this._closeBtn.addEventListener('click', this.close);
      this._cancelBtn.addEventListener('click', this.close);
      if (onOk) {
        this._okBtn.addEventListener('click', onOk);
      }

      document.body.appendChild(this._root);
    }

    close() {
      if (this._root) {
        this._root.style.display = 'none';
      }

      return this;
    }

    open() {
      if (this._root) {
        this._root.style.display = 'block';
      }

      return this;
    }

    destroy() {
      if (this._root) {
        document.body.removeChild(this._root);
      }

      return this;
    }
  }
})(document);