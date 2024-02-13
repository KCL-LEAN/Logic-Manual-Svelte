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
        <h5 class = "sidebar-title">Propositional Logic</h5>
        <ul>
          <button on:click={() => event("Propositional")}>Semantics</button>
        </ul>
        <h5 class = "sidebar-subtitle">Natural deduction</h5>
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
    width: 14vw;
    left: 0;
    border-color: #000000;
    background: white;
    border-right: 2px solid #000000;
    /* z-index: 3; */
    color: rgb(13, 13, 13);
    transition: all ease .3s;
    text-align: center;
    overflow: scroll;
  }
    

  .sidebar-title {
      color:black;
      font-size:medium;
      text-align:center;
      margin-left: 5px;
      border-top:1px solid hsl(0, 0%, 60%);
      border-bottom:1px solid hsl(0, 0%, 60%);

  }

  .sidebar-subtitle{
      color:black;
      font-size:medium;
      text-align:center;
      margin-left: 5px;
      border-bottom:1px solid hsl(0, 0%, 60%);

  }
  .links_to_pages{
    color: black;
    text-align: left;
    font-size:medium;
    margin-right: 10px;
    text-decoration: none;
    outline: 0;
    &:hover{
      text-decoration: none;
    }
  }
</style>
