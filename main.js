// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
//creates new organisms
const pAequorFactory = (specimenNum, dna) => {
   return {
    specimenNum: specimenNum,
    dna: dna,
    //mutates 1 base of input strand
    mutate() {
      let originalBase = dna[Math.floor(Math.random() * dna.length)];
      let newBase = returnRandBase();
      dna.splice(dna.indexOf(originalBase), 1, newBase);
      return dna;
    },
    //compares 2 strands of DNA and ouputs percent match
    compareDNA(newDNA){
      let DNASum = 0;
      let matchPercent = 0;
      for(let i = 0; i < newDNA.length; i++){
        if(newDNA[i] === dna[i]){
          DNASum++;
        }
      }
        console.log(DNASum);
        matchPercent = (DNASum / newDNA.length) * 100;
        return matchPercent.toFixed(2);
    },
    //if stand has over 60% C and G, organism will survive
    willLikelySurvive(){
      let totalCandG = 0;
      let CandGPercent = 0;
      for(let i = 0; i < dna.length; i++){
        if((dna[i] === 'C') || (dna[i] === 'G')){
          totalCandG++;
        }
      }
        CandGPercent = totalCandG / dna.length;
        if(CandGPercent >= .6){
          return true;
        } else {
          return false;
      }
    },
    //returns the complementary DNA strand
    complementStrand(){
      let complementaryStrand = [];
      for(let i = 0; i < dna.length; i++){
        if(dna[i] === 'A'){
          complementaryStrand.push('T');
        } else if(dna[i] === 'T'){
          complementaryStrand.push('A');
        } else if(dna[i] === 'C'){
          complementaryStrand.push('G');
        } else if(dna[i] === 'G'){
          complementaryStrand.push('C');
        }
      }
      return complementaryStrand;
    }
  }
};
//making 30 instances of pAequor that can survive
let goodPAequor = [];
let i = 0;
while(goodPAequor.length <= 30){
  let tempDNA = pAequorFactory(i, mockUpStrand());
  if(tempDNA.willLikelySurvive() === true){
    goodPAequor.push(tempDNA);
  }
  i++;
}

