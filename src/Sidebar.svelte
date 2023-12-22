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
          <button on:click={() => event("Introduction")}>1. Introduction to using Lean</button>
        </ul>
        <ul>
          <button on:click={() => event("PropositionalLogic")} >Propositional Logic</button>
        </ul>
        <ul>
          <button on:click={() => event("Conjunction")}>Conjunction</button>
        </ul>
        <ul>
          <button on:click={() => event("Conditional")} >Conditionals</button>
        </ul>
        <ul>
          <button on:click={() => event("Disjunction")} >Disjunction</button>
        </ul>
        <ul>
          <button on:click={() => event("Negation")} >Negation</button>
        </ul>
        <ul>
          <button on:click={() => event("CombinedRules")} >Putting It All Together</button>
        </ul>
      </div>
   </div>
</div>


<style>
  .sidebar {
    margin-top: 30px;
    margin-left: 30px;
    padding: 20px;
    position: fixed;
    width: 220px;
    /* left: 0%;
    top: 0%; */
    border: 3px solid;
    border-color: #36454F;
    background: white;
      border-radius: 35px;
    height: 50%;
    /* z-index: 3; */
    color: rgb(13, 13, 13);
    transition: all ease .3s;
    text-align: center;
    overflow: hidden;
    &:hover {
    border-radius: 35px;
    width: 260px;
    /* margin-left: auto; */
    transition: width 0.5s ease-in-out, margin-left 0.5s ease-in-out;
    }
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
