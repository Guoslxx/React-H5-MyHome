import React from 'react';
import './App.less';
import bg0 from './assets/img/bg0.jpg';
import bg1 from './assets/img/bg1.jpg';
import bg2 from './assets/img/bg2.jpg';
import bg3 from './assets/img/bg3.jpg';
import bg4 from './assets/img/bg4.jpg';
import bg5 from './assets/img/bg5.jpg';
import { Button, Modal, Tabs, TextareaItem, List, Grid, ActivityIndicator } from 'antd-mobile';
import html2canvas from 'html2canvas';
import SignaturePad from './components/SignaturePad';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// 背景图片数据
const data = [
  { icon: bg5, text: '新春贺卡', signatureStyle: { top: '60.5%', left: '48%' }, textStyle: { top: '25.5%', left: '23%', color: '#f4d5b5' } },
  { icon: bg2, text: '恭贺新禧', signatureStyle: { top: '55.5%', left: '55%' }, textStyle: { top: '24.5%', left: '35%', color: '#dfc58d' } },
  { icon: bg1, text: '恭贺新年', signatureStyle: { top: '70.5%', left: '48%' }, textStyle: { top: '40.5%', left: '32%', color: '#f4d5b5' } },
  { icon: bg4, text: '你好,2020', signatureStyle: { top: '54.5%', left: '55%' }, textStyle: { top: '24.5%', left: '18.5%', color: '#ffe2c2' } },
  { icon: bg3, text: '福禄双全', signatureStyle: { top: '57.5%', left: '55%' }, textStyle: { top: '24.5%', left: '18.5%', color: '#edd1b1' } },
  {
    icon: bg0, text: '鼠金福', signatureStyle: { top: '76.5%', left: '48%' },
    textStyle: { top: '45.5%', left: '28%', color: '#573002' }
  },
]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.autoFocusInst = React.createRef();

    this.state = {
      ...this.state,
      curBg: data[0]
    }
  }

  state = {
    displayText: `此刻
伴随着新年钟声的敲响
新的一年
幸福开启
真诚向您道一声
新年好
衷心祝您新的一年
身体棒棒的，工作顺顺的
生活美美的，事业旺旺的 `,
    popupVisible: false,
    previewModel: false,
    previewImg: 'loading',
    signatureImg: '',
    penColor: '',
    tabsInitPage: 0
  }

  tabs = [
    { title: '文字', },
    { title: '背景', },
    { title: '签名' }
  ];

  showModal = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    const { curBg } = this.state;
    this.setState({
      popupVisible: true,
      penColor: curBg.textStyle.color
    });
  }
  onClose = () => {
    this.setState({
      popupVisible: false,
    });
  }

  showPreviewModel = () => {
    this.setState({
      previewModel: true,
    });
  }

  onPreviewModelClose = () => {
    this.setState({
      previewModel: false,
    });
  }

  render() {
    const { displayText, popupVisible, previewModel, previewImg, curBg, signatureImg, penColor, tabsInitPage } = this.state;
    return (
      <div className="App" >
        <main className="app-container" id='capture'>
          <img src={curBg.icon} alt="bg" />
          <div className="text-show-container" style={curBg.textStyle}>{displayText}</div>

          {
            signatureImg &&
            <div className="signature-kit" style={curBg.signatureStyle}>
              <img src={signatureImg} alt="signatureImg" />
            </div>
          }

        </main>

        {/* 浮层按钮 */}
        <div className="app-btnbar">
          <i onClick={e => { this.showModal(e) }} className="iconfont icon-bianji"></i>
          <i onClick={() => { this.handleCapture() }} className="iconfont icon-tubiao105"></i>
        </div>
        <Modal
          popup
          onClose={this.onClose}
          visible={popupVisible}
          animationType="slide-up"
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: '60vh' }}>
            <Tabs tabs={this.tabs}
              initialPage={tabsInitPage}
              onChange={(tab, index) => { this.setState({ tabsInitPage: index }) }}
            >
              <div style={{ height: '200px', backgroundColor: '#fff' }}>
                <List>
                  <TextareaItem
                    ref={this.autoFocusInst}
                    value={displayText}
                    onChange={val => { this.handleInput(val) }}
                    autoHeight
                  />
                </List>
              </div>
              <div id='insert' style={{ backgroundColor: '#fff' }}>
                <Grid
                  data={data}
                  columnNum={3}
                  onClick={(el, index) => { this.selectBg(el, index) }}
                />
              </div>
              <div style={{ backgroundColor: '#fff' }}>
                <SignaturePad
                  value={signatureImg}
                  penColor={penColor}
                  onUpdate={val => { this.updateSignature(val) }}></SignaturePad>
              </div>
            </Tabs>
          </div>
          <div className="edit-model-btns">
            <Button type='primary' onClick={() => { this.onClose() }}>确认</Button>
          </div>
        </Modal>
        <Modal
          onClose={this.onPreviewModelClose}
          visible={previewModel}
          animationType="slide-up"
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          actions={this.previewActions}
        >
          <div className="preview-container">
            {previewImg === 'loading' ?
              <ActivityIndicator size='large' animating />
              :
              <img src={previewImg} alt="preview" />
            }
          </div>
          <p>提示:长按图片保存至本地或发送给朋友!</p>
          <div className="preview-btns">
            <Button type='primary' onClick={() => { this.onPreviewModelClose() }}>关闭</Button>
          </div>
        </Modal>

      </div>
    );
  }

  updateSignature(val) {
    this.setState({
      signatureImg: val
    })
  }

  selectBg(el, index) {
    this.setState({
      curBg: el
    })
  }

  handleCapture() {
    this.showPreviewModel();
    this.setState({
      previewImg: 'loading'
    })
    setTimeout(() => {
      html2canvas(document.querySelector("#capture")).then(canvas => {
        var data = canvas.toDataURL('image/png', 1);  //1表示质量(无损压缩)
        this.setState({
          previewImg: data
        })
      });
    }, 500)

  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }




  handleInput(val) {
    this.setState({
      displayText: val
    })
  }
}

export default App;
