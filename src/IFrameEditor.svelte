<script lang="ts">
    import { onMount } from 'svelte';
    export let editorText;
    let frame;
    function onLoad() {
        const head = frame.contentDocument.querySelector('leanheader');
        console.log(head);
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
