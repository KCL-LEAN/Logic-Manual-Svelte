<script lang="ts">
    import Document  from './Document.svelte'
    import Monaco from './Monaco.svelte'

</script>

<container>
  <main>
      <!-- <Monaco ref = "monaco"/> -->
      <Document ref = "document">
          <svelte:fragment slot="content">

      <div>
      </div>
          </svelte:fragment>
      </Document>
      <Monaco ref = "monaco"/>
  </main>
</container>

<style>
    main {
        text-align: center;
        display: flex;
      flex-direction: row;
    }


    /* .container{
      display: flex;
      flex-direction: row;
    } */




    .document{
      display: order;

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
