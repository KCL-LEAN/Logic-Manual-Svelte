<script lang="ts">
    import Document  from './Document.svelte'
    import Sidebar from './Sidebar.svelte'
    import IFrameEditor from './IFrameEditor.svelte'
    let editorText = "";//This sets text in editor and updates lean web editor component
    let selectedDocument = "static/documents/Conjunction.html";
    function handlePageChange(event) {
        console.log("caught event in App.svelte: " + selectedDocument);
        selectedDocument = "static/documents/" + event.detail.document;
        //TODO: Also need code to change editor content
        
    }
</script>



<body>
  <Sidebar on:documentSelection={handlePageChange}></Sidebar>
  <main>
      <Document ref = "document" bind:documentPath = {selectedDocument}>
          <svelte:fragment slot="content">

      <div>
      </div>
          </svelte:fragment>
      </Document>

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

  main {
        text-align: center;
        display: flex;
        width: 80%;
        float: right;
    }


  #footer{
    background-color: white;
    color: #36454F;
    text-align: center;
    position: fixed;
    padding: 1em;
    bottom: 0;
  }



    :global([ref=monaco]){
        min-width: 500px;
        min-height: 500px;
        display: flex;
        justify-content: space-between;
        border-radius: 5%;
    }

    :global([ref=document]){
        display: flex;
        justify-content: space-between;
        border-radius: 5%;
        align-self: center;
    }
    @media (min-width: 640px) {
        main {
        	max-width: none;
        }
    }

</style>
