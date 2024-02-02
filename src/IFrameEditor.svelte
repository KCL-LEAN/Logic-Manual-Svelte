<script lang="ts">
    import { onMount } from 'svelte';


    export let editorUrl;
    let frame: HTMLIFrameElement;
    console.log(editorUrl);
    function onLoad () {//TODO Fix This
        let loadHelper = async function () { setTimeout(async function () {
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
