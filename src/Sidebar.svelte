<div class = 'sidebar'>
   <!-- <slot/> -->

   <div>
    <h1>
      <a href="">Logic Manual</a>
    </h1>
      <div class = "links_to_pages">
        <ul>
          <a href="naturaldeduct.html">1. Introducion to using Lean</a>
        </ul>
        <ul>
          <a href="" >2. Syntax of Propositional Logic</a>
        </ul>
        <ul>
          <a href="">3. Semantics of Propositional Logic</a>
        </ul>
        <ul>
          <a href="" >4. Syntax of First Order Logic</a>
        </ul>
        <ul>
          <a id="" href="" >5. Semantics of First Order Logic</a>
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
