const Modal = ((document) => {
  if (!Button) {
    throw new ReferenceError('必须先引入 Button 组件');
  }

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
    // _props;
    // _root;
    // _mask;
    // _body;
    // _closeBtn;
    // _cancelBtn;
    // _okBtn;
    // _destroyOnClose;

    constructor(props = {}) {
      this.close = this.close.bind(this);

      this._props = props;
      this._destroyOnClose = !!props.destroyOnClose;
      this.init(this._props);
    }

    init(props) {
      this._buildModal(props);
    }

    _buildModal(props) {
      const { 
        cls,
        title = '',
        content = '',
        closable = true,
        onOk,
        onCancel,
        okBtnPorps = {},
        cancelBtnProps = {},
        footer
      } = props;
  
      this._root = document.createElement('div');
      this._root.classList.add(defaultCls, cls);
      this._root.innerHTML = `
        <div class="${maskCls}"></div>
        <div class="${wrapCls}">
          ${closable ? `<button class="${closeBtnCls}"><img class="${closeIconCls}" src="./assets/icon_close.svg" /></button>` : ''}
          <p class="${titleCls}">${title}</p>
          <div class="${bodyCls}"></div>
          <div class="${footerCls}">
            <button class="${cancelBtnCls}">取消</button>
            <button class="${okBtnCls}">确定</button>
          </div>
        </div>`;
  
      this._mask = this._root.getElementsByClassName(maskCls)[0];
      this._body = this._root.getElementsByClassName(bodyCls)[0];
      this._closeBtn = this._root.getElementsByClassName(closeBtnCls)[0];

      this._cancelBtn = new Button({
        ...cancelBtnProps,
        root: this._root.getElementsByClassName(cancelBtnCls)[0],
        cls: cancelBtnProps.cls ? `${cancelBtnProps.cls} ${cancelBtnCls}` : cancelBtnCls,
        onClick: onCancel ? onCancel : cancelBtnProps.onClick ? cancelBtnProps.onClick : this.close
      });
      this._okBtn = new Button({
        ...okBtnPorps,
        root: this._root.getElementsByClassName(okBtnCls)[0],
        cls: okBtnPorps.cls ? `${okBtnPorps.cls} ${okBtnCls}` : okBtnCls,
        onClick: onOk ? onOk : okBtnPorps.onClick ? okBtnPorps.onClick : this.close
      });

      if (footer && typeof footer === 'function') {
        footer(this._root.getElementsByClassName(footerCls)[0], this._cancelBtn.getRoot(), this._okBtn.getRoot());
      }

      this._mask.addEventListener('click', this.close);
      this._closeBtn.addEventListener('click', this.close);

      if (typeof content === 'string') {
        this._body.innerText = content;
      } else if (content instanceof HTMLElement) {
        this._body.appendChild(content);
      } else if (typeof content === 'function') {
        content(this._body);
      } else {
        throw new TypeError(`对话框内容格式错误：${content}`);
      }

      document.body.appendChild(this._root);
    }

    close() {
      if (this._root) {
        if (this._destroyOnClose) {
          return this.destroy();
        } else {
          this._root.style.display = 'none';
        }
      }

      return this;
    }

    open() {
      if (this._root) {
        this._root.style.display = 'block';
      } else if (this._props) {
        this.init(this._props);
      }

      return this;
    }

    destroy() {
      if (this._root) {
        document.body.removeChild(this._root);
        this._root = null;

        if (this._props.onDestroy) {
          this._props.onDestroy();
        }
      }

      return this;
    }
  }
})(document);