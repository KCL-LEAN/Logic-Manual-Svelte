<script context="module" lang="ts">
    declare var MathJax: any;
</script>
<script lang="ts">
    import Sidebar from './Sidebar.svelte'
    import sty from './static/proof.sty';

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();


	onMount(() => {
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

    let problems = ["Problem One", "Problem Two","Problem Three","Problem Four","Problem Five"]
    
</script>


<div class="Document">
    
    <!--\({sty}\)-->
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

    \({"\\newcommand{\\infer}[2]{\\cfrac{#1\\qquad #2}{#1 \\wedge #2}\\small{\\wedge_I}}"}\)
    \({"\\newcommand{\\infert}[2]{\\dfrac{#1\\qquad #2}{#1 \\wedge #2}\\wedge_I}"}\)

    $${"\\cfrac{\\cfrac{a\\hbox{asdf}}{b}}{\\cfrac{c}{d}}"}$$
    $$ {"\\infer{ \\infer{a}{b} }{c}"} $$
    $$ {"\\infer{a} {b}"} $$

    <main>
    <p>
        Rendering Latex
    </p>
        <slot name = "content"/>
        <p class = "missing"> No Content </p>
    </main>
    <h1>LEAN FOR LOGIC MANUAL</h1>
    <h2>Propositional Logic</h2>
    <div>
    The plan for this section is to review the natural deduction rules for propositional logic and learn their implementation in Lean.
    $${"\\frac{A}{B}"}$$
    $$\land\infer&;brack;land Elim&rbrack; &lbrack;&#123A B&#125&#123A\&B&#125&rbrack;$$
    
    $${"\\cfrac{ A \\vee B \\hbox{ true} \\quad \\begin{matrix} \\cfrac{}{A \\hbox{ true}}\\ u \\\\ \\vdots \\\\ C \\hbox{ true} \\end{matrix} \\quad \\begin{matrix} \\cfrac{}{B \\hbox{ true}}\\ w \\\\ \\vdots \\\\ C \\hbox{ true} \\end{matrix} }{C \\hbox{ true}}\\ \\vee_{E^{u,w}}"}$$
    </div>



</div>

<style> 
    div {
        background-color: #212730;
        padding-width: 0;
        color: #FFFFAA;
    }   
    h1 {
        font-family: "Eczar", serif;
        font-weight: bold;
    }
    p {
        font-family: "Eczar", serif;
    }
</style>
