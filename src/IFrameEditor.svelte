<script lang="ts">
    import { onMount } from 'svelte';
    const editorUrl = "https://leanprover-community.github.io/lean-web-editor/"

    export let editorText;
    let frame;
     onMount(() => {
        frame.addEventListener('load', onLoad());
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
<div class = "IFrameEditor">
        <iframe bind:this={frame} src = "https://leanprover-community.github.io/lean-web-editor/" width = "300" height = "800"></iframe>
</div>

<style>
    IFrameEditor {
        float: right;
    }
</style>
