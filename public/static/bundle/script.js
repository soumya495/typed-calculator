(()=>{"use strict";const e=document.querySelector("[data-previous]"),r=document.querySelector("[data-current]"),t=document.querySelector("[data-clear]"),n=document.querySelector("[data-delete]"),i=document.querySelector("[data-equals]"),s=document.querySelectorAll("[data-operator]"),a=document.querySelectorAll("[data-number]"),o=new class{constructor(e,r){this.previousOperandElement=e,this.currentOperandElement=r,this.previousOperand="",this.currentOperand="",this.operator=void 0,this.error=!1}appendNumber(e){this.error&&this.clear(),this.currentOperand.includes(".")&&"."===e||(this.currentOperand+=e,this.currentOperandElement.innerHTML=this.currentOperand)}chooseOperation(e){this.error||""!==this.currentOperand&&(this.previousOperand&&this.currentOperand&&(this.compute(),this.error)||(this.operator=e,this.previousOperand=this.currentOperand,this.currentOperand="",this.currentOperandElement.innerHTML="",this.previousOperandElement.innerHTML=this.previousOperand+" "+this.operator))}compute(){if(""===this.previousOperand||""===this.currentOperand||void 0===this.operator)return;let e;const r=parseFloat(this.previousOperand),t=parseFloat(this.currentOperand);switch(this.operator){case"+":e=r+t;break;case"-":e=r-t;break;case"*":e=r*t;break;case"÷":e=r/t;break;default:return}if(console.log("Result ",e),isNaN(e)||!isFinite(e))return this.error=!0,this.currentOperandElement.innerHTML="ERROR",this.previousOperandElement.innerHTML="",this.previousOperand="",this.currentOperand="",void(this.operator=void 0);this.previousOperandElement.innerHTML="",this.currentOperandElement.innerHTML=e.toString(),this.currentOperand=e.toString(),this.previousOperand="",this.operator=void 0}deleteNum(){this.error&&this.clear(),this.currentOperand=this.currentOperand.slice(0,-1),this.currentOperandElement.innerHTML=this.currentOperand}clear(){this.previousOperand="",this.currentOperand="",this.operator=void 0,this.error=!1,this.currentOperandElement.innerHTML="",this.previousOperandElement.innerHTML=""}}(e,r);a.forEach((e=>{e.addEventListener("click",(()=>{o.appendNumber(e.innerText)}))})),s.forEach((e=>{e.addEventListener("click",(()=>{o.chooseOperation(e.innerText)}))})),i.addEventListener("click",(()=>{o.compute()})),n.addEventListener("click",(()=>{o.deleteNum()})),t.addEventListener("click",(()=>{o.clear()}))})();