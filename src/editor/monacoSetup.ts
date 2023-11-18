import * as monaco from 'monaco-editor';
import * as vscode from 'vscode';
//import * as lightPlusTheme from './lightPlus.json'
import * as leanSyntax from './syntaxes/lean.json'
import * as leanMarkdownSyntax from './syntaxes/lean-markdown.json'
import * as codeblockSyntax from './syntaxes/codeblock.json'
import { initServices, MonacoLanguageClient } from 'monaco-languageclient';
import languageConfig from 'lean4/language-configuration.json';

import { Registry } from 'monaco-editor/esm/vs/platform/registry/common/platform.js';//Fix
import { default as wireTmGrammars } from '@codingame/monaco-vscode-textmate-service-override';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
import getMessageServiceOverride from '@codingame/monaco-vscode-languages-service-override';
//import { loadWASM } from 'onigasm'
//import { MonacoServices } from 'monaco-languageclient';
//import { StandaloneServices } from 'vscode/services';
//@ts-ignore
import onigasmUrl from 'onigasm/lib/onigasm.wasm?url'
import textmate from '@codingame/monaco-vscode-textmate-service-override/textmate';
export function monacoSetup () {

  initServices({
    ...getMessageServiceOverride(),//(document.body) //TODO: I have 0 clue if this is correct at all
    ...getTextmateServiceOverride()
  });

  // install Monaco language client services
  //MonacoServices.install(); //TODO: Changed, may break it all

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map()
  grammars.set('lean4', 'source.lean')

  //monaco.editor.defineTheme('vs-code-theme-converted', lightPlusTheme as any);

  // register Monaco languages
  monaco.languages.register({
    id: 'lean4',
    extensions: ['.lean']
  })

  let config: any = { ...languageConfig }
  config.autoClosingPairs = config.autoClosingPairs.map(
    pair => { return {'open': pair[0], 'close': pair[1]} }
  )
  monaco.languages.setLanguageConfiguration('lean4', config);

  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
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
  });
/*
  // Load onigasm//No more textmate TODO
  (async () => {
    try {
      textmate()
    } catch (err) {
      // Hot module replacement can cause us to run this code twice and that's ok.
      if (!(err as Error).message?.startsWith('Onigasm#init has been called')) {
        throw err
      }
    }
    wireTmGrammars(monaco, registry, grammars)
  })()
    */
}
