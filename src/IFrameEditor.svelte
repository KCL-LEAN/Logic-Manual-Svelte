<script lang="ts">
    import { onMount } from 'svelte';

    export let editorText;
    let frame: HTMLIFrameElement;
    let editorUrl =
        `https://leanprover-community.github.io/lean-web-editor/#code=${editorText}`;
     onMount(() => {
        
      })
    function onLoad () {
        let loadHelper = async function () { setTimeout(async function () {
            console.log(frame.contentDocument);
            const head : HTMLIFrameElement = (frame.contentDocument).querySelector(".leanheader");
            if (head) {
            console.log("loaded frame: " + head);
            head.remove();
            return;
            }else{
                loadHelper();
            }
        }, 10);
        }
        loadHelper();
    }
    
</script>
        <iframe bind:this={frame} src = {editorUrl} width = "300" height = "100vh"></iframe>

<style>
    iframe {
        position: fixed;
        overflow: hidden;
        flex: 0.8 0 0px;
        right: 0;
        top: 0;
        height: 100vh;
        width: 30vw;
    }
</style>
