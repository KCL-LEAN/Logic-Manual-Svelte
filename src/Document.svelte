<script context="module" lang="ts">
    declare var MathJax: any;
</script>
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
    import Swap from './Swap.svelte'
    let page;
    export let ref; //for styling
    export let documentPath: string; //for styling
    onMount(async () => {
        //Dynamically load html content 
        page = await import(documentPath); 
    })
	onMount(() => {
        //mathJax
        let script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";


    script.onload = () => {
      MathJax = {
        packages: {'[+]': ['proof']},
        loader: {load: ['[tex]/proof']},
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']],
        },
        svg: {fontCache: 'global'}
      };
    };

	    console.log("Here")
        document.head.append(script);
	}
    );

    export const load = (async () => {
        return page;
    })
</script>


<div class="document">

    \({"\\newcommand{\\infer}[3]{\\cfrac{#3}{#2}\\small{#1}}"}\)
    <Swap samp={page}/>

</div>

<style>
    div {
        background-color: #ffffff;
        padding: 0;
        color: rgb(54, 54, 54);
    }
    h1 {
        font-family: "Eczar", serif;
        font-weight: bold;
    }
    p {
        font-family: "Eczar", serif;
    }

    .document{
      padding: 50px;
    }
</style>
