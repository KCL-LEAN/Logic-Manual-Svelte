<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

    import languageConfig from 'lean4/language-configuration.json';
    import  Registry  from '@codingame/monaco-vscode-textmate-service-override'
    import getTextMateServiceOverride from '@codingame/monaco-vscode-textmate-service-override'
    import monacoVscodeTextmateServiceOverride, { ITextMateTokenizationService } from '@codingame/monaco-vscode-textmate-service-override'
    import wireTmGrammars from '@codingame/monaco-vscode-textmate-service-override'
    //import * as vscode from 'vscode';
    //import { buildWorkerDefinition } from 'monaco-editor-workers';
    //
    //import editorWorker from ...;
    //import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker.js';
    //import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker';
    //import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker';
    //import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker';

    import * as leanSyntax from './syntaxes/lean.json'
    import * as leanMarkdownSyntax from './syntaxes/lean-markdown.json'
    import * as codeblockSyntax from './syntaxes/codeblock.json'
    import { buildWorkerDefinition } from 'monaco-editor-workers';
    import { IStorageService, LogLevel, getService, initialize } from 'vscode/services'

    export let ref;//for styling
    let editorElement: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let model: monaco.editor.ITextModel;
    const uri = monaco.Uri.parse('file:///LeanProject/LeanProject.lean')

    onMount(async () => {

        //await initialize({
        //    ...getTextMateServiceOverride()
        //})
        //start of lean4web file
        const grammars = new Map()
        grammars.set('lean4', 'source.lean')

        monaco.languages.register({
          id: 'lean4',
          extensions: ['.lean']
        })
        let config: any = { ...languageConfig }
        config.autoClosingPairs = config.autoClosingPairs.map(
          pair => { return {'open': pair[0], 'close': pair[1]} }
        )
        config.automaticLayout = true;
        config.theme = 'vs-dark';

          let grammardef = async (scopeName) => {
            if (scopeName === 'source.lean') {
              return {
                  format: 'json',
                  content: JSON.stringify(leanSyntax)
              }
            } else if (scopeName === 'source.lean.markdown') {
              return {
                  format: 'json',
                  content: JSON.stringify(leanMarkdownSyntax)
              }
            } else {
              return {
                  format: 'json',
                  content: JSON.stringify(codeblockSyntax)
              }
            }
          }
        
        buildWorkerDefinition('./node_modules/monaco-editor-workers/dist/workers', import.meta.url, true);
        const model = monaco.editor.createModel('', 'lean4', uri)
        //if (onDidChangeContent) {
        //  model.onDidChangeContent(() => onDidChangeContent(model.getValue()))
        //}
        const editor = monaco.editor.create(editorElement, {
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
          'semanticHighlighting.enabled': false,
          theme: 'vs-dark'
        })
    //const abbrevRewriter = new AbbreviationRewriter(new AbbreviationProvider(), model, editor)

        //model = monaco.editor.createModel("axiom a", "lean4");
        //editor = monaco.editor.create(editorElement, config);
    });
    onDestroy(() => {
    	monaco?.editor.getModels().forEach((model) => model.dispose());
    	editor?.dispose();
    });
</script>

<div class="monacoframe">
    <div class="ba">
        <!-- <button class="" on:click={() => loadCode('loader', 'html', editor)}>HTML</button> -->
    </div>
    <div class="editor" bind:this={editorElement} />
</div>

<style>
    .editor{
        min-width: 400px;
        min-height: 1000px;
        text-align:left;
        /* width: 0%; */

    }
    .monacoframe{
        display: flex;
        justify-content: space-between;
        border-radius: 5%;
        border-width: 10%;
        border-color: black;

    }
</style>
