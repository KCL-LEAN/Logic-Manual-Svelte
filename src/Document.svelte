<script lang="ts">
    import Swap from './Swap.svelte'
    import MathJax from './MathJax.svelte'
    import CombinedRules from './static/documents/CombinedRules.x.html'
    import Conditional from './static/documents/Conditional.x.html'
    import Conjunction from './static/documents/Conjunction.x.html'
    import Disjunction from './static/documents/Disjunction.x.html'
    import Introduction from './static/documents/Introduction.x.html'
    import Negation from './static/documents/Negation.x.html'
    let map = new Map();
    map.set("CombinedRules", CombinedRules)
    map.set("Conditional", Conditional)
    map.set("Conjunction", Conjunction)
    map.set("Disjunction", Disjunction)
    map.set("Introduction", Introduction)
    map.set("Negation", Negation)
    
    export let ref; //for styling
    export let documentPath: string; //for styling
    let page = map.get(documentPath);
    console.log(page);

    export const load = (async () => {
        return page;
    })
</script>


<div class="document">
    \({"\\newcommand{\\infer}[3]{\\cfrac{#3}{#2}\\small{#1}}"}\)
        <Swap samp={page}/>
        <MathJax></MathJax>
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
