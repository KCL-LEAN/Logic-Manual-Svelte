
<script lang="ts">
    import { Eczar } from 'fontsource-eczar'
    import Sidebar from './Sidebar.svelte'
    import Editor from './Editor.svelte'
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	onMount(() => {
		let script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
    document.head.append(script);
	    
	    script.onload = () => {
      MathJax = {
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
        svg: {fontCache: 'global'}
      };
	    };
	    console.log("Here")
	});
</script>


<div class="Document">
    <Sidebar>
        <p>
            wow text
        </p>
    </Sidebar>
    <h1>
        Document Header
    </h1>
    <main>

    <p>
        Rendering Latex
        $$\alpha\varphi$$
    </p>
    <Editor>
    </Editor>
        <slot name = "content"/>
        <p class = "missing"> No Content </p>
    </main>
</div>

<style> 
    h1 {
        font-family: "Eczar", serif;
        font-weight: bold;
    }
    p {
        font-family: "Eczar", serif;
    }
</style>
