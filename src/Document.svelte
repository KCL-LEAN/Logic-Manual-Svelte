<script context="module" lang="ts">
    declare var MathJax: any;
</script>
<script lang="ts">
    import Sidebar from './Sidebar.svelte'
    import sty from './static/proof.sty';

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
    let latexMacros: String = '';


	onMount(() => {
        let script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
        console.log(sty);
        let latexMacros = sty; 
        

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

    let problems = ["Problem One", "Problem Two","Problem Three","Problem Four","Problem Five"]
    
</script>


<div class="Document">
    \(\usepackage{"{" + latexMacros + "}"}\)
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

    $$\land\infer[land Elim] &#123A B&#125&#123A\&B&#125$$
    
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
