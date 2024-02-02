<script lang="ts">
    import Document  from './Document.svelte'
    import Sidebar from './Sidebar.svelte'
    import IFrameEditor from './IFrameEditor.svelte'

    import CombinedRules from './static/documents/CombinedRules.x.html'
    import Conditional from './static/documents/Conditional.x.html'
    import Conjunction from './static/documents/Conjunction.x.html'
    import Disjunction from './static/documents/Disjunction.x.html'
    import Introduction from './static/documents/Introduction.x.html'
    import Negation from './static/documents/Negation.x.html'

    import CombinedRulesT from './static/exercises/CombinedRules.txt'
    import ConditionalT from './static/exercises/Conditional.txt'
    import ConjunctionT from './static/exercises/Conjunction.txt'
    import DisjunctionT from './static/exercises/Disjunction.txt'
    import IntroductionT from './static/exercises/Introduction.txt'
    import NegationT from './static/exercises/Negation.txt'

    let map = new Map();
    map.set("CombinedRules", [ CombinedRules, CombinedRulesT ])
    map.set("Conditional", [ Conditional, ConditionalT ])
    map.set("Conjunction", [ Conjunction, ConjunctionT ])
    map.set("Disjunction", [ Disjunction, DisjunctionT ])
    map.set("Introduction", [ Introduction, IntroductionT ])
    map.set("Negation", [ Negation, NegationT ])
    console.log("NegationT is : " + NegationT);
    let selectedDocument = Introduction;
    let editorText = ConditionalT;//This sets text in editor and updates lean web editor component

    function handlePageChange(event) {
        const values = map.get(event.detail.document);
        selectedDocument = values[0];
        //editorText = values[1]; //TODO: Resetting Editor Text Breaks IFrame Augh
        console.log("caught event in App.svelte: " + selectedDocument);
        //TODO: Also need code to change editor content
        
    }
</script>
<body>
  <Sidebar on:documentSelection={handlePageChange}></Sidebar>
  <main>
    {#key selectedDocument}
        <Document ref="document" bind:page={selectedDocument}></Document>
    {/key}

    <IFrameEditor editorUrl={editorText}/>
  </main>
</body>


<style>

  .container {
    /* display: flex; */
    width: 100%;

  }



  #footer{
    background-color: white;
    color: #36454F;
    text-align: center;
    position: fixed;
    padding: 1em;
    bottom: 0;
  }



    

    @media (min-width: 640px) {
        main {
        	max-width: none;
        }
    }

</style>
