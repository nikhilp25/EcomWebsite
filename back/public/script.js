let names=["GAMERS","CODERS","DESIGNERS"]

let changingText=document.querySelector(".developer")
let idx=0;
let word=names[idx];
let text="";
let isDeleting=false;

let showcase=document.querySelector(".showcase");
let navlinks=document.querySelector(".navigation");

window.addEventListener("load",function(){
              typeWords();
              window.addEventListener("scroll",function(){
                          let {bottom} =showcase.getBoundingClientRect();
                          if(bottom<=-252)
                          {
                            navlinks.classList.add("fixed");
                          }
                          else
                          {
                            navlinks.classList.remove("fixed")
                          }

              })
})

function typeWords(){
              if(isDeleting==true && text.length==0)
              {
                            idx=(idx+1)%names.length;
                            word=names[idx];
                            isDeleting=false;
              }

              if(text.length==word.length)
              {
                            isDeleting=true;
              }

              text=isDeleting?word.substring(0,text.length-1) : word.substring(0,text.length+1);
              changingText.innerHTML=text;
              setTimeout(typeWords,text.length==word.length?1000:250);

}