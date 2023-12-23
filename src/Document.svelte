<script lang="ts">
    import Swap from './Swap.svelte'
    import MathJax from './MathJax.svelte'
    
    export let ref; //for styling
    export let page: string; //for styling
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
