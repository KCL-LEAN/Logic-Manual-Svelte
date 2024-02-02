<script lang="ts">
    import { onMount } from 'svelte';
    export let editorUrl;
    let frame: HTMLIFrameElement;
    let frameActive = true;
    console.log(editorUrl);
</script>
        {#key editorUrl}
            <iframe bind:this={frame} src = {editorUrl} width = "300" height = "100vh"></iframe>
        {/key}  

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
