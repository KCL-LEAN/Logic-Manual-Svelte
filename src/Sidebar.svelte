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
      <div class = "links_to_pages">
        <ul>
          <button on:click={() => event("Welcome")}>Welcome</button>
        </ul>
        <ul>
          <button on:click={() => event("Introduction")}>LEAN syntax</button>
        </ul>
        <h4>Propositional Logic</h4>
        <h5>Semantics</h5>
        <ul>
          <button on:click={() => event("Propositional")}>Semantics</button>
        </ul>
        <h5>Natural deduction</h5>
        
        <ul><li>
          
          <button on:click={() => event("Conjunction")}>Conjunction</button>
        </li></ul>

        <ul><li>
          <button on:click={() => event("Conditional")} >Conditional</button>
        </li></ul>
        <ul><li>
          <button on:click={() => event("Disjunction")} >Disjunction</button>
        </li></ul>
        <ul><li>
         <button on:click={() => event("Negation")} >Negation</button>
        </li></ul>
        <ul><li>
          <button on:click={() => event("CombinedRules")} >Combined Rules</button>
        </li></ul>
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
