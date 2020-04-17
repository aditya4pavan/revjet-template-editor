import './App.css';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import FieldGroup from './fieldGroups';
import io from 'socket.io-client';

DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length

export default class Default extends SampleBase {
    constructor() {
        super(...arguments);
        this.hostUrl = 'http://localhost:6000';
        this.onLoadDefault = () => {
            // this.container.documentEditor.open(JSON.stringify(defaultDocument));
            this.container.documentEditor.documentName = 'Getting Started';
            this.titleBar.updateDocumentTitle();
            this.container.documentChange = () => {
                this.titleBar.updateDocumentTitle();
                this.container.documentEditor.focusIn();
            };
        };
        this.state = {
            complete: false, groups: []
        }
    }

    socket = io('http://localhost:5000', {
        path: '/pusher'
    });


    componentDidMount() {
        const { uid } = this.props.match.params;
        this.socket.emit('template', { id: uid })

        this.socket.on('webapp', (content) => {
            console.log(content)
            if (content && Array.isArray(content)) {
                this.setState({ complete: true, groups: content })
            }
        })
    }

    // handleMerge = () => {
    //     let sfdt = this.container.documentEditor.serialize();
    //     Axios.post(this.container.serviceUrl + 'Download', JSON.stringify({ sfdt, groups }), {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         responseType: 'blob'
    //     }).then(response => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'Sample.docx'); //or any other extension
    //         document.body.appendChild(link);
    //         link.click();
    //     })
    // }

    rendereComplete() {
        this.container.serviceUrl = this.hostUrl + '/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.container.documentEditor.enableWordExport = true;
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.editor = this.container.documentEditor;
        this.onLoadDefault();
    }

    insertContent = (content) => {
        if (this.container && content && content !== '') {
            var fileName = content.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
            var fieldCode = 'MERGEFIELD  ' + fileName + "  \\* MERGEFORMAT ";
            this.container.documentEditor.editor.insertField(fieldCode, '«' + content + '»');
        }
    }

    render() {
        if (this.state.complete)
            return (<div className='control-pane'>
                <div className='control-section'>
                    <div id='documenteditor_titlebar' className="e-de-ctn-title" />
                    <FieldGroup groups={this.state.groups} insertContent={this.insertContent} />
                    <div id="documenteditor_container_body">
                        <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }} enableToolbar={true} locale='en-US' />
                    </div>
                </div>
                <button onClick={this.handleMerge}>Download</button>
            </div>);
        return <p>Waiting For Connections</p>
    }
}