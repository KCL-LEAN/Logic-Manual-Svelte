import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import './css/Editor.module.css'
import './editor/infoview.module.css'
import './editor/vscode.module.css'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import { loadRenderInfoview } from '@leanprover/infoview/loader'
import { InfoviewApi } from '@leanprover/infoview-api'
import { InfoProvider } from './editor/infoview'
import { LeanClient } from './editor/leanclient'
import { AbbreviationRewriter } from './editor/abbreviation/rewriter/AbbreviationRewriter'
import { AbbreviationProvider } from './editor/abbreviation/AbbreviationProvider'
import { LeanTaskGutter } from './editor/taskgutter'
import Split from 'react-split'
import Notification from './Notification'
import { monacoSetup } from './monacoSetup'
import { config } from './config/config'

const socketUrl = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket"

monacoSetup()

const Editor: React.FC<{setRestart?, onDidChangeContent?, value: string}> =
    ({setRestart, onDidChangeContent, value}) => {
  const uri = monaco.Uri.parse('file:///LeanProject/LeanProject.lean')
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  // const [editorApi, setEditorApi] = useState<MyEditorApi | null>(null)
  const [infoviewApi, setInfoviewApi] = useState<InfoviewApi | null>(null)
  const [infoProvider, setInfoProvider] = useState<InfoProvider | null>(null)
  const codeviewRef = useRef<HTMLDivElement>(null)
  const infoviewRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<boolean | null>(false)
  const [restartMessage, setRestartMessage] = useState<boolean | null>(false)

  useEffect(() => {
    const model = monaco.editor.getModel(uri) ??
      monaco.editor.createModel(value ?? '', 'lean4', uri)
    if (!model.isAttachedToEditor()) {
      if (onDidChangeContent) {
        model.onDidChangeContent(() => onDidChangeContent(model.getValue()))
      }
      const editor = monaco.editor.create(codeviewRef.current!, {
        model,
        glyphMargin: true,
        lineDecorationsWidth: 5,
        folding: false,
        lineNumbers: 'on',
        lineNumbersMinChars: 1,
        // rulers: [100],
        lightbulb: {
          enabled: true
        },
        unicodeHighlight: {
            ambiguousCharacters: false,
        },
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        tabSize: 2,
        'semanticHighlighting.enabled': true,
        theme: 'vs-code-theme-converted'
      })
      setEditor(editor)
      new AbbreviationRewriter(new AbbreviationProvider(), model, editor)
    }

    // Following `vscode-lean4/webview/index.ts`
    const client = new LeanClient(socketUrl, undefined, uri, showRestartMessage)
    const infoProvider = new InfoProvider(client)
    const div: HTMLElement = infoviewRef.current!
    const imports = {
      '@leanprover/infoview': `${window.location.origin}/index.production.min.js`,
      'react': `${window.location.origin}/react.production.min.js`,
      'react/jsx-runtime': `${window.location.origin}/react-jsx-runtime.production.min.js`,
      'react-dom': `${window.location.origin}/react-dom.production.min.js`,
      'react-popper': `${window.location.origin}/react-popper.production.min.js`
    }
    loadRenderInfoview(imports, [infoProvider.getApi(), div], setInfoviewApi)
    setInfoProvider(infoProvider)
    client.restart()
  }, [])

  const showRestartMessage = () => {
    setRestartMessage(true)
  }

  const restart = async () => {
    await infoProvider.client.stop();
    await infoProvider.client.start();
    infoProvider.openPreview(editor, infoviewApi)
  }

  useEffect(() => {
    if (editor){
      if (editor.getModel().getValue() != value) {
        editor.pushUndoStop()
        editor.executeEdits("component", [
          { range: editor.getModel().getFullModelRange(), text: value }
        ]);
        editor.setSelection(new monaco.Range(1,1,1,1))
      }
    }
  }, [value])

  useEffect(() => {
    if (infoProvider !== null && editor !== null && infoviewApi !== null) {
      infoProvider.openPreview(editor, infoviewApi)
      const taskgutter = new LeanTaskGutter(infoProvider.client, editor)
    }
    setRestart(() => restart)
  }, [editor, infoviewApi, infoProvider])


  return (
    <div className='editor-wrapper'>
      <Split className={`editor ${ dragging? 'dragging':''}`}
        gutter={(index,direction) => {
          const gutter = document.createElement('div')
          gutter.className = `gutter` // no `gutter-${direction}` as it might change
          return gutter
        }}
        gutterStyle={(dimension, gutterSize, index) => {
          return {
            'width': config.verticalLayout ? '100%' : `${gutterSize}px`,
            'height': config.verticalLayout ? `${gutterSize}px` : '100%',
            'cursor': config.verticalLayout ? 'row-resize' : 'col-resize',
            'margin-left': config.verticalLayout ? 0 : `-${gutterSize}px`,
            'margin-top': config.verticalLayout ? `-${gutterSize}px` : 0,
            'z-index': 0,
          }}}
        gutterSize={5}
        onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)}
        sizes={config.verticalLayout ? [50, 50] : [70, 30]}
        direction={config.verticalLayout ? "vertical" : "horizontal"}
        style={{flexDirection: config.verticalLayout ? "column" : "row"}}>
        <div ref={codeviewRef} className="codeview"
          style={config.verticalLayout ? {width : '100%'} : {height: '100%'}}></div>
        <div ref={infoviewRef} className="vscode-light infoview"
          style={config.verticalLayout ? {width : '100%'} : {height: '100%'}}></div>
      </Split>
      {restartMessage ?
        <Notification
          restart={() => {setRestartMessage(false); restart()} }
          close={() => {setRestartMessage(false)}} />
        : ''}
    </div>
  )
}

export default Editor
