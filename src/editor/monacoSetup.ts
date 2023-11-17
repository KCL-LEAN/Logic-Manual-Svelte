import * as monaco from 'monaco-editor';
import * as vscode from 'vscode';
import { Registry } from 'monaco-textmate' // peer dependency
import { wireTmGrammars } from 'monaco-editor-textmate'
//import * as lightPlusTheme from './lightPlus.json'
import * as leanSyntax from './syntaxes/lean.json'
import * as leanMarkdownSyntax from './syntaxes/lean-markdown.json'
import * as codeblockSyntax from './syntaxes/codeblock.json'
import { initServices, MonacoLanguageClient } from 'monaco-languageclient';
import languageConfig from 'lean4/language-configuration.json';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
//import { loadWASM } from 'onigasm'
//import { MonacoServices } from 'monaco-languageclient';
//import { StandaloneServices } from 'vscode/services';
import getMessageServiceOverride from '@codingame/monaco-vscode-languages-service-override';
//@ts-ignore
import onigasmUrl from 'onigasm/lib/onigasm.wasm?url'

export function monacoSetup () {

  initServices({
    ...getMessageServiceOverride(document.body)
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

  // Load onigasm
  (async () => {
    try {
      await loadWASM(onigasmUrl)
    } catch (err) {
      // Hot module replacement can cause us to run this code twice and that's ok.
      if (!(err as Error).message?.startsWith('Onigasm#init has been called')) {
        throw err
      }
    }
    wireTmGrammars(monaco, registry, grammars)
  })()
}
