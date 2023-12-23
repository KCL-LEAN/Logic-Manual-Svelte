<script lang="ts">
    import { onMount } from 'svelte';
    const editorUrl = "https://leanprover-community.github.io/lean-web-editor/"

    export let editorText;
     onMount(() => {
        //frame.addEventListener('load', onLoad());
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
    //window dimensions

    let frame : HTMLIFrameElement;
    frame.src = editorUrl;
    frame.width = "300";
    frame.height= "100";

    

</script>
<div class = "IFrameEditor">
        <iframe bind:this={frame}></iframe>
</div>

<style>
    IFrameEditor {
        float: right;
    }
</style>
