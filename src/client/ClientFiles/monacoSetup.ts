import { Registry } from 'monaco-textmate' // peer dependency
import { wireTmGrammars } from 'monaco-editor-textmate'
import * as lightPlusTheme from './lightPlus.json'
import * as leanSyntax from './syntaxes/lean.json'
import * as leanMarkdownSyntax from './syntaxes/lean-markdown.json'
import * as codeblockSyntax from './syntaxes/codeblock.json'
import languageConfig from 'lean4/language-configuration.json';
import { loadWASM } from 'onigasm'
import { initialize } from 'vscode/services'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
//import { initServices } from 'monaco-languageclient/lib';
//import { StandaloneServices } from 'vscode/services';
//import getMessageServiceOverride from "@codingame/monaco-vscode-notifications-service-override"//TODO Fix
export function monacoSetup () {

  //initialize({
  //  ...getMessageServiceOverride()
  //});

  // install Monaco language client services
  //MonacoServices.install();
//initServices.

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map()
  grammars.set('lean4', 'source.lean')

  monaco.editor.defineTheme('vs-code-theme-converted', lightPlusTheme as any);

  // register Monaco languages
  monaco.languages.register({
    id: 'lean4',
    extensions: ['.lean']
  })

  let config: any = { ...languageConfig }
  config.autoClosingPairs = config.autoClosingPairs.map(
      (    pair: any[]) => { return {'open': pair[0], 'close': pair[1]} }
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
  (async () => { //TODO could be a problem
    try {
      await loadWASM('./onigasm.wasm')
    } catch (err) {
      // Hot module replacement can cause us to run this code twice and that's ok.
      if (!(err as Error).message?.startsWith('Onigasm#init has been called')) {
        throw err
      }
    }
    wireTmGrammars(monaco, registry, grammars)
  })()
}
