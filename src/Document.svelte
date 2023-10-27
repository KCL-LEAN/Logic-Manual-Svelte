
<script lang="ts">
    import { Eczar } from 'fontsource-eczar'
    import Sidebar from './Sidebar.svelte'
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	onMount(() => {
		let script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
    document.head.append(script);
	    
	    script.onload = () => {
      MathJax = {
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']],
        
        packages: {'[+]': ['proof']}
        },
        loader: {load: ['[tex]/proof']},
        svg: {fontCache: 'global'}
      };
	    };
	    console.log("Here")
	});


    let problems = ["Problem One", "Problem Two","Problem Three","Problem Four","Problem Five"]
</script>


<div class="Document">
\( \require{proof}\)
    <Sidebar>
    <h1>
        Problems
    </h1>
    {#each problems as problem}
        <h2 >
        <a href = "molin.ski">
            {problem} 
        </a>
        </h2>
    {/each}
    </Sidebar>
    <h1>
        Document Header
    </h1>

    <main>
    <p>
        Rendering Latex
        $$\alpha\varphi$$
    </p>
        <slot name = "content"/>
        <p class = "missing"> No Content </p>
    </main>
    <h1>LEAN FOR LOGIC MANUAL</h1>
    <h2>Propositional Logic</h2>
    <div>
    The plan for this section is to review the natural deduction rules for propositional logic and learn their implementation in Lean.

    $$\infer[land Elim] &#123A B&#125&#123A\&B&#125$$
    </div>




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
