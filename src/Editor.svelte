<script lang="ts">
import './css/Editor.css'
import './editor/infoview.css'
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
import { config } from './config/config'
import { IConnectionProvider } from 'monaco-languageclient'
import { toSocket, WebSocketMessageWriter } from 'vscode-ws-jsonrpc'
import { DisposingWebSocketMessageReader } from './reader'
import { monacoSetup } from './monacoSetup'

const socketUrl = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket"

monacoSetup()
</script>

<div class = "Editor">
    
</div>


<style>
    
</style>
