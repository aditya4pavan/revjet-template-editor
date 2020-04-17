Object.defineProperty(exports, "__esModule", { value: true });
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_buttons_1 = require("@syncfusion/ej2-buttons");
var ej2_splitbuttons_1 = require("@syncfusion/ej2-splitbuttons");
/**
 * Represents document editor title bar.
 */
var TitleBar = /** @class */ (function () {
    function TitleBar(element, docEditor, isShareNeeded) {
        var _this = this;
        this.initializeTitleBar = function (isShareNeeded) {
            var downloadText;
            var downloadToolTip;
            var printText;
            var printToolTip;
            var openText;
            var documentTileText;
            var saveText;
            var saveToolTip;
            var cancelText;
            var cancelToolTip;

            downloadText = 'Download';
            downloadToolTip = 'Download this document.';
            printText = 'Print';
            printToolTip = 'Print this document (Ctrl+P).';
            openText = 'Open';
            documentTileText = 'Document Name. Click or tap to rename this document.';
            saveText = 'Save';
            saveToolTip = 'Save Document';
            cancelText = 'Cancel';
            cancelToolTip = 'Cancel Text';

            // tslint:disable-next-line:max-line-length
            _this.documentTitle = ej2_base_1.createElement('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
            // tslint:disable-next-line:max-line-length
            _this.documentTitleContentEditor = ej2_base_1.createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line' });
            _this.documentTitleContentEditor.appendChild(_this.documentTitle);
            _this.tileBarDiv.appendChild(_this.documentTitleContentEditor);
            _this.documentTitleContentEditor.setAttribute('title', documentTileText);
            var btnStyles = 'float:right;background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
                + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;height:28px;font-weight:400;margin-top: 2px;';
            // tslint:disable-next-line:max-line-length
            _this.cancel = _this.addButton('e-de-icon-Cancel e-de-padding-right', cancelText, btnStyles, 'de-save', cancelToolTip, false);
            _this.done = _this.addButton('e-de-icon-Save e-de-padding-right', saveText, btnStyles, 'de-save', saveToolTip, false);
            _this.print = _this.addButton('e-de-icon-Print e-de-padding-right', printText, btnStyles, 'de-print', printToolTip, false);
            _this.open = _this.addButton('e-de-icon-Open e-de-padding-right', openText, btnStyles, 'de-open', openText, false);


            var items = [
                { text: 'Microsoft Word (.docx)', id: 'word' },
                { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
            ];
            // tslint:disable-next-line:max-line-length
            _this.export = _this.addButton('e-de-icon-Download e-de-padding-right', downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items);

            if (!isShareNeeded) {
                _this.export.element.style.display = 'none';
            }
            else {
                _this.open.element.style.display = 'none';
            }
        };
        this.wireEvents = function () {
            _this.print.element.addEventListener('click', _this.onPrint);
            _this.open.element.addEventListener('click', function (e) {
                if (e.target.id === 'de-open') {
                    var fileUpload = document.getElementById('uploadfileButton');
                    fileUpload.value = '';
                    fileUpload.click();
                }
            });
            _this.done.element.addEventListener('click', function (e) {
                console.log(_this.documentEditor.serialize());
            });
            _this.cancel.element.addEventListener('click', function (e) {
                console.log('Cancel')
            });
            _this.documentTitleContentEditor.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    _this.documentTitleContentEditor.contentEditable = 'false';
                    if (_this.documentTitleContentEditor.textContent === '') {
                        _this.documentTitleContentEditor.textContent = 'Document1';
                    }
                }
            });
            _this.documentTitleContentEditor.addEventListener('blur', function () {
                if (_this.documentTitleContentEditor.textContent === '') {
                    _this.documentTitleContentEditor.textContent = 'Document1';
                }
                _this.documentTitleContentEditor.contentEditable = 'false';
                _this.documentEditor.documentName = _this.documentTitle.textContent;
            });
            _this.documentTitleContentEditor.addEventListener('click', function () {
                _this.updateDocumentEditorTitle();
            });
        };
        this.updateDocumentEditorTitle = function () {
            _this.documentTitleContentEditor.contentEditable = 'true';
            _this.documentTitleContentEditor.focus();
            window.getSelection().selectAllChildren(_this.documentTitleContentEditor);
        };
        // Updates document title.
        this.updateDocumentTitle = function () {
            if (_this.documentEditor.documentName === '') {
                _this.documentEditor.documentName = 'Untitled';
            }
            _this.documentTitle.textContent = _this.documentEditor.documentName;
        };
        this.onPrint = function () {
            _this.documentEditor.print();
        };
        this.onExportClick = function (args) {
            var value = args.item.id;
            switch (value) {
                case 'word':
                    _this.save('Docx');
                    break;
                case 'sfdt':
                    _this.save('Sfdt');
                    break;
                default:
                    break;
            }
        };
        this.save = function (format) {
            // tslint:disable-next-line:max-line-length
            _this.documentEditor.save(_this.documentEditor.documentName === '' ? 'sample' : _this.documentEditor.documentName, format);
        };
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.documentEditor = docEditor;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    TitleBar.prototype.setTooltipForPopup = function () {
        console.log(document.getElementById('documenteditor-share-popup').querySelectorAll('li'))
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    };
    // tslint:disable-next-line:max-line-length
    TitleBar.prototype.addButton = function (iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
        var _this = this;
        var button = ej2_base_1.createElement('button', { id: id, styles: styles });
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            var dropButton = new ej2_splitbuttons_1.DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: function () { _this.setTooltipForPopup(); } }, button);
            return dropButton;
        }
        else {
            var ejButton = new ej2_buttons_1.Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    };
    return TitleBar;
}());
exports.TitleBar = TitleBar;
