import React from 'react';
import Signature from 'signature_pad'
import { Button, Toast } from 'antd-mobile';

class SignaturePad extends React.Component {

    componentDidMount() {
        const { penColor, value } = this.props;

        var wrapper = document.getElementById("signature-pad");
        var canvas = wrapper.querySelector("canvas");
        this.signaturePad = new Signature(canvas, {
            // It's Necessary to use an opaque color when saving image as JPEG;
            // this option can be omitted if only saving as PNG or SVG
            backgroundColor: 'rgba(255, 255, 255,0)',
            penColor: penColor || 'black'
        });
        if (value) {
            this.signaturePad.fromDataURL(value)
        }

        // this.resizeCanvas(canvas);
    }

    resizeCanvas(canvas) {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);

        // This part causes the canvas to be cleared
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);

        // This library does not listen for canvas changes, so after the canvas is automatically
        // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
        // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
        // that the state of this library is consistent with visual state of the canvas, you
        // have to clear it manually.
        this.signaturePad.clear();
    }

    render() {
        return (
            <div id="signature-pad" className="signature-pad" onTouchMove={e => e.stopPropagation()}>
                <div className="signature-pad--body">
                    <canvas width='375' height='187.5'></canvas>
                </div>
                <div className="signature-pad--footer">
                    <Button type='ghost' size='small' onClick={() => { this.dispatchAction('update') }}>更新签名</Button>
                    <Button type='warning' size='small' onClick={() => { this.dispatchAction('clear') }} style={{ marginTop: '10px' }}>清除签名</Button>
                    {/* <div className="description">Sign above</div>
                    <div className="signature-pad--actions">
                        <div>
                            <button type="button" className="button clear" data-action="clear">Clear</button>
                            <button type="button" className="button" data-action="change-color">Change color</button>
                            <button type="button" className="button" data-action="undo">Undo</button>
                        </div>
                        <div>
                            <button type="button" className="button save" data-action="save-png">Save as PNG</button>
                            <button type="button" className="button save" data-action="save-jpg">Save as JPG</button>
                            <button type="button" className="button save" data-action="save-svg">Save as SVG</button>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }

    dispatchAction(action) {
        const { onUpdate } = this.props;
        let dataUrl = '';

        if (this.signaturePad.isEmpty()) {
            Toast.info('签名为空',1)
            return;
        }
        if (action === 'update') {
            dataUrl = this.signaturePad.toDataURL();
            Toast.success('签名更新成功!',1);
        } else if (action === 'clear') {
            this.signaturePad.clear();
            Toast.success('签名清除成功!',1);
        }
        onUpdate && onUpdate(dataUrl);
    }
}

export default SignaturePad;