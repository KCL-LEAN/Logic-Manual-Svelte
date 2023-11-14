
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
Propositional Logic and Lean
</h1>
<h2>
Introduction
</h2>
$$ $$
<div>
   <p>The plan for this section is to review the natural deduction rules for propositional logic and learn their implementation in Lean. 
    The rules are familiar for you from the lectures. This section provides no new content, the aim is to get to familiar with the basic lean syntax. At the end, we will look at more advanced proofs in Lean.
    </p> 
    <p>  The rules for conjunction are the following:
    
    This is an example natural deduction proof involving the rules for conjunction:</p> 
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
