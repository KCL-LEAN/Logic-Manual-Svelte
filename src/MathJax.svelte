
<script context="module" lang="ts">
    declare var MathJax: any;
</script>
<script lang="ts">
    const mjsource = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	onMount(() => {
        //mathJax
        let script = document.createElement('script');
        script.src = mjsource;


    script.onload = () => {
        console.log("MathJax Loaded");
      MathJax = {
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']],
        },
        svg: {fontCache: 'global'}
      };
    };

	    console.log("Here")
        document.head.append(script);
	}
    );
    onDestroy(() => {
        let scripts = document.head.getElementsByTagName("script");
        for (const scr of scripts ){
        if (scr.getAttribute("src")==mjsource) {
            scr.remove();
        }
        };
    });
</script>
