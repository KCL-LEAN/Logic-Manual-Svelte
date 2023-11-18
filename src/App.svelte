<script lang="ts">
    import Document  from './Document.svelte'
    import Monaco from './Monaco.svelte'

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
