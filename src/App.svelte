<script lang="ts">
    import  Document  from './Document.svelte'
    import  Monaco from './Monaco.svelte'

/*What is it going to be like?
We want a side bar and NOT a top bar because people will probably mostly be using this on their laptop,
we want a funky lil css grid menu where you can select different challenges
we want to be able to render the documents
*/
</script>

<main>
    <Monaco ref = "monaco"/>
    <Document ref = "document">
        <svelte:fragment slot="content">
    
    <div>
    </div>
        </svelte:fragment>
    </Document>
</main>

<style>
    main {
        text-align: center;
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
