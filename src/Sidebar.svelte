<div class = 'sidebar'>
   <slot/>
</div>
<style>

div {}
.sidebar {
  position: fixed;
  
  width: 20%;
  left: 0%;
  top: 0%;
  border: 5px solid;
  border-color: green;
  background: black;
    border-radius: 40px;
  height: 100%;
  z-index: 3;
  color: white;
  padding: 10px;
  transition: all ease .3s;
  text-align: center;
  overflow: hidden;
  &:hover {
  border-radius: 50px;
  }
  }
</style>
