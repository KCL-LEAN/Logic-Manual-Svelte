<script lang="ts">
let samp: string = `
    \\infer{E}{
            A
            &
            \\infer{D}{B & C}
        }
    `;
`\\newcommand{\\infer}[3]{\\cfrac{#2\\qquad #3}{#2 \\wedge #3}\\small{#1}}`

 //it has been so long since I have written code without using functional programming paradigms so I wanted to practice my fundamentals here
const map = {
    splitr: "&",
    splitrRep: "\\qquad",
    labelMark: "=",
    labelMarkRep: "="

};

let ns:string[] = [];
for(let i = 0; i < samp.length; i++){
    let char = samp.charAt(i)
    if(char == map.splitr){
        for(let ii = 0; ii < map.splitrRep.length; ii++){
            ns.push(map.splitrRep.charAt(ii));
        }
    }
    else if(char == map.labelMark){
        let labelIndices: Number[] = [];
        for(let ii=i; ii < samp.length; ii++){
            if(samp.charAt(ii) == "[" || samp.charAt(ii) == "]"){
                samp.
            }
        } 
        for(let ii = 0; ii < map.labelMarkRep.length; ii++){
            ns.push(map.splitrRep.charAt(ii));
        }
    }
    else{
        ns.push(samp.charAt(i));
    }

}


</script>
