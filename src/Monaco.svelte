<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import * as monaco from 'monaco-editor';
    //import * as vscode from 'vscode';
    //import { buildWorkerDefinition } from 'monaco-editor-workers';
    //
    //import editorWorker from ...;
    //import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker.js';
    //import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker';
    //import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker';
    //import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker';

    //import { code as jsCode } from '$lib/js_code';
    //import { code as tsCode } from '$lib/ts_code';
    //import { code as phpCode } from '$lib/php_code';
    //import { code as pyCode } from '$lib/py_code';
    //import { code as htmlCode } from '$lib/html_code';

    import { buildWorkerDefinition } from 'monaco-editor-workers';

    export let ref;//for styling
    let editorElement: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let model: monaco.editor.ITextModel;

    function loadCode(code: string, language: string, editor: monaco.editor.IStandaloneCodeEditor) {
    	model = monaco.editor.createModel(code, language);

    	editor.setModel(model);
    }

    onMount(async () => {
        buildWorkerDefinition('./node_modules/monaco-editor-workers/dist/workers', import.meta.url, true);

        editor = monaco.editor.create(editorElement, {
        	automaticLayout: true,
        	theme: 'vs-dark'
        });

        monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);


        loadCode('a', 'code', editor);
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
        min-width: 500px;
        min-height: 1000px;
        text-align:left;
        width: 33%;
    }
    .monacoframe{
        display: flex;
        justify-content: space-between;
        border-radius: 5%;
    }
</style>
