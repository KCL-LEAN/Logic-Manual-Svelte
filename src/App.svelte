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
    let map = new Map();
    map.set("CombinedRules", CombinedRules)
    map.set("Conditional", Conditional)
    map.set("Conjunction", Conjunction)
    map.set("Disjunction", Disjunction)
    map.set("Introduction", Introduction)
    map.set("Negation", Negation)

    let editorText = "";//This sets text in editor and updates lean web editor component
    let selectedDocument = Introduction;
    function handlePageChange(event) {
        selectedDocument = map.get(event.detail.document);
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
    <IFrameEditor editorText={editorText}/>
  </main>
</body>
<footer id="footer">
  <p>© 2023 Logic Manual. All rights reserved.</p>
</footer>


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
