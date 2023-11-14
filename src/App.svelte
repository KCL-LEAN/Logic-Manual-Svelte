<script>
    import  Document  from './Document.svelte'

/*What is it going to be like?
We want a side bar and NOT a top bar because people will probably mostly be using this on their laptop,
we want a funky lil css grid menu where you can select different challenges
we want to be able to render the documents
*/
</script>

<main>
    <Document>
        <svelte:fragment slot="content">
        <p>
            This is text that will contain Mathjax, look here is some mathjax, 
            $$\alpha 555123213123$$

        </p>

    <div>
            $$wow$$
    </div>
        </svelte:fragment>
    </Document>
</main>

<style>
    main {
        text-align: center;
    }


    @media (min-width: 640px) {
        main {
        	max-width: none;
        }
    }

</style>

