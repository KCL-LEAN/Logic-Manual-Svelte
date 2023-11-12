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
    labelMark: "="

};

let ns:string[] = [];
function addAll (arr: string[], str: string){
        for(let ii = 0; ii < str.length; ii++){
            arr.push(str.charAt(ii));
        }
    return arr;
}
for(let i = 0; i < samp.length; i++){
    let char = samp.charAt(i)
    if(char == map.splitr){
        ns = addAll(ns, map.splitrRep);
    }
    else if(char == map.labelMark){
        let labelIndices: number[] = [];
        for(let ii=i; ii < samp.length; ii++){
            if(samp.charAt(ii) == "[" || samp.charAt(ii) == "]"){
                labelIndices.push(ii);
            }
        } 
        const str = samp.substring(labelIndices[0], labelIndices[1]); //might be wrong
        ns = addAll(ns, str);
    }
    else{
        ns.push(samp.charAt(i));
    }

}


</script>
