//Named export
//내부에서만 호출되어서 export 구문을 제거함
let calculateMonthlyPayment = (principal, years, rate) => {
   let monthlyRate = 0;
   if (rate) {
       monthlyRate = rate / 100 / 12;
   }
   let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate),
           years * 12)));
   return {principal, years, rate, monthlyPayment, monthlyRate};
};

//Named export
let calculateAmortization = (principal, years, rate) => {
   let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
   let balance = principal;
   let amortization = [];
   for (let y=0; y<years; y++) {
       let interestY = 0;  //Interest payment for year y
       let principalY = 0; //Principal payment for year y
       for (let m=0; m<12; m++) {
           let interestM = balance * monthlyRate;       //Interest payment for month m
           let principalM = monthlyPayment - interestM; //Principal payment for month m
           interestY = interestY + interestM;
           principalY = principalY + principalM;
           balance = balance - principalM;
       }
       amortization.push({principalY, interestY, balance});
   }
   return {monthlyPayment, monthlyRate, amortization};
};

//Default export로 변경함.
export default calculateAmortization;