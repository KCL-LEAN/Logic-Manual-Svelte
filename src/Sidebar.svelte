<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    function event(documentName: string) {

        console.log("emitting event, button pressed: " + documentName);

        dispatch ('documentSelection', {
            document: documentName 
        });
    }

</script>

<div class = 'sidebar'>
   <!-- <slot/> -->

   <div>
    <h1>
      <a href="">Logic Manual</a>
    </h1>
      <div class = "links_to_pages">
        <ul>
          <button on:click={() => event("Introduction")}>Introduction to LEAN</button>
        </ul>
        <ul>
          <button on:click={() => event("Propositional")}>Propositional Logic</button>
        </ul>
        <ul>
          <button on:click={() => event("Conjunction")}>Conjunction</button>
        </ul>
        <ul>
          <button on:click={() => event("Conditional")} >Conditional</button>
        </ul>
        <ul>
          <button on:click={() => event("Disjunction")} >Disjunction</button>
        </ul>
        <ul>
          <button on:click={() => event("Negation")} >Negation</button>
        </ul>
        <ul>
          <button on:click={() => event("CombinedRules")} >Putting it all together</button>
        </ul>
      </div>
   </div>
</div>


<style>
  .sidebar {
    position: fixed;
    width: 15vw;
    left: 0;
    border: 3px solid;
    border-color: #36454F;
    background: white;
    border-radius: 35px;
    height: 100vh;
    /* z-index: 3; */
    color: rgb(13, 13, 13);
    transition: all ease .3s;
    text-align: center;
    overflow: hidden;
  }

  .links_to_pages{
    color: black;
    text-align: left;
    margin-right: 30px;
    text-decoration: none;
    &:hover{
      text-decoration: none;
    }
  }
</style>
