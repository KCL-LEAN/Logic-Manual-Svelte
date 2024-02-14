<script lang="ts">
    import Document  from './Document.svelte'
    import Sidebar from './Sidebar.svelte'
    import IFrameEditor from './IFrameEditor.svelte'

    import CombinedRules from './static/documents/CombinedRules.x.html'
    import Conditional from './static/documents/Conditional.x.html'
    import Conjunction from './static/documents/Conjunction.x.html'
    import Disjunction from './static/documents/Disjunction.x.html'
    import Syntax from './static/documents/Syntax.x.html'
    import Negation from './static/documents/Negation.x.html'
    import Semantics from './static/documents/Semantics.x.html'
    import Welcome from './static/documents/Welcomepage.x.html'


    import CombinedRulesT from './static/exercises/CombinedRules.txt'
    import ConditionalT from './static/exercises/Conditional.txt'
    import ConjunctionT from './static/exercises/Conjunction.txt'
    import DisjunctionT from './static/exercises/Disjunction.txt'
    import SyntaxT from './static/exercises/Syntax.txt'
    import NegationT from './static/exercises/Negation.txt'
    import SemanticsT from './static/exercises/Semantics.txt'
    import WelcomeT from './static/exercises/Welcome.txt'

    let map = new Map();
    map.set("CombinedRules", [ CombinedRules, CombinedRulesT ])
    map.set("Conditional", [ Conditional, ConditionalT ])
    map.set("Conjunction", [ Conjunction, ConjunctionT ])
    map.set("Disjunction", [ Disjunction, DisjunctionT ])
    map.set("Syntax", [ Syntax, SyntaxT ])
    map.set("Semantics", [Semantics, SemanticsT])
    map.set("Negation", [ Negation, NegationT ])
    map.set("Welcome", [Welcome, WelcomeT ])
    //console.log("NegationT is : " + NegationT);
    let selectedDocument = Welcome;
  let editorText = WelcomeT;//This sets text in editor and updates lean web editor component

    function handlePageChange(event) {
        const values = map.get(event.detail.document);
        selectedDocument = values[0];
        editorText = values[1]; //TODO: Resetting Editor Text Breaks IFrame Augh
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

    <IFrameEditor bind:editorUrl={editorText}/>

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
