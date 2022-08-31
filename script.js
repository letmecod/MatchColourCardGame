
var cards = []; // store 52 cards.
var suits=[];
var values=[];
var cardset=[]; //store unique 52 cards randomly generated from cards array
var commanstack=[]; //stack to match previous card's and newly generated card and count score of players

var classaddflaguser=false; // clear previous css class attributes
var classaddflagcomp=false; // clear previous css class attributes
var flag=false;

var cardValue; // values from 1 to K for computer
var cardSuit; // clubs, spades, diamonds, hearts for computer
var cardValue1; // values from 1 to K for user
var cardSuit1; // clubs, spades, diamonds, hearts for user
var score_user;
var score_comp;

var back_comp; // elements for backside card for computer
var back_user; // elements for backside card for computer
var plain_card; // element to show plain card
var card; //element to show front side card for user
var division; //element to seperate computer front side card from user front side card
var card1;  //element to show front side card for user
var scoreboard_comp; // elements for showing score for computer
var scoreboard_user; // elements for showing score for user
var count_click_comp; //counting clicks to open card
var count_click_user; //counting clicks to open card
var plain_cardopc
var turn;

document.addEventListener("load",deck());



function deck() {

    score_comp=0;
    score_user=0;

    count_click_comp=0;
    count_click_user=0;
    turn='a';

     values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    
    for (let st = 0; st < suits.length; st++) {
      for (let val = 0; val < values.length; val++) {
        const value = values[val];
        const suit =suits[st];
        cards.push({ value, suit });
      }
    }
    screen_design();
    return cards;
  }
  
function screen_design()
{  
     back_comp=document.createElement("div");
    back_comp.classList.add("backcard_comp");
    back_comp.innerHTML="my cards"
    document.body.appendChild(back_comp);

     back_user=document.createElement("div");
    back_user.classList.add("backcard_user");
    back_user.innerHTML="Click Me"
    document.body.appendChild(back_user);

     display_comp=document.createElement("div");

    plain_card=document.createElement("div");
    plain_card.classList.add("plaincard");
    plain_cardopc=document.createElement("div");
    plain_cardopc.classList.add("plaincardopc");

     card = document.createElement("div");
     division=document.createElement("div");
     card1 = document.createElement("div");

     scoreboard_comp=document.createElement("label");
    scoreboard_comp.innerHTML="Score: "+score_comp;
    scoreboard_comp.classList.add("scorec");
    document.body.appendChild(scoreboard_comp);

    scoreboard_user=document.createElement("label");
    scoreboard_user.innerHTML="Score: "+ score_user;
    scoreboard_user.classList.add("scoreu");
    document.body.appendChild(scoreboard_user);
}


    back_user.addEventListener('click', function fun1()
    {
      frontCard_user(cards);
    });
    
    back_comp.addEventListener('click', function fun2()
    {
      frontCard_comp(cards);
    });
  
  function frontCard_user(cards) {
    if(turn=='c'&& turn!='a')
    {
      console.log("Hey its not your turn!")
      return;

    }
    
    count_click_user++;
    

    if(classaddflaguser==true && cardset.length<=51&&count_click_user<=26)
    {
      card.classList.remove("card",cardSuit.toLowerCase());
      document.body.appendChild(plain_card);
    }
  
    while(cardset.length<=51 && flag===false && count_click_user<=26)
    {
        
        const random = Math.floor(Math.random() * 51);
        cardValue = cards[random].value;
        cardSuit = cards[random].suit;
        var obj=[cardValue,cardSuit]
        
          for(i=0;i<cardset.length;i++)
          {
            
            if(JSON.stringify(cardset[i])===JSON.stringify(obj))
            {
              
              flag=true;
              break;
            }
          }
           
            if(flag==false)
            {
              let name;
              cardSuit === "Diamonds"? (name = "&diams;"): (name = "&" + cardSuit.toLowerCase() + ";");
              card.classList.add("card", cardSuit.toLowerCase());
              card.innerHTML = '<span class="card-value-suit top">' + cardValue + name + "</span>" + '<span class="card-suit">' + name + "</span>" + '<span class="card-value-suit bot">' + cardValue + name + "</span></div>";
              division.innerHTML="</div>";
              document.body.appendChild(card);

              cardset.push(obj);
              
              stackops(obj,'u');
              break;
            }
            
              flag=false;          
            
    }
    classaddflaguser=true;
    turn='c';
        
  }
  
  

  function stackops(obj,player)
  {
    
    
    if(commanstack.length<=0)
    {
      commanstack.push(obj);
      return;
    }
   if(commanstack.length>=1)
   {
   var temp=commanstack.pop();
   commanstack.push(temp);
   commanstack.push(obj);
   console.log("  commanstack  ",commanstack);

   if(((JSON.stringify(temp)).match("Spades"))||(JSON.stringify(temp)).match("Clubs"))
   {
    if(((JSON.stringify(obj)).match("Spades"))||(JSON.stringify(obj)).match("Clubs"))
    {
      if(player=='u')
      {
        console.log("match black-black user")
        score_user=commanstack.length+score_user;
        commanstack=[]; 
        //card.classList.remove("card",cardSuit.toLowerCase());
        plain_cardopc.innerHTML="You got points"
        document.body.appendChild(plain_cardopc);
        
        console.log("  commanstack  ",commanstack);
        scoreboard_user.innerHTML="Score: "+score_user;
        return;
      }
      if(player=='c')
      {
        console.log("match black-black comp")
        score_comp=commanstack.length + score_comp;
        commanstack=[];
        plain_cardopc.innerHTML="I got points"

        //card.classList.remove("card",cardSuit.toLowerCase());
        document.body.appendChild(plain_cardopc);
          
        
        console.log("  commanstack  ",commanstack);

        scoreboard_comp.innerHTML="Score: "+score_comp;
        return;
      }
    }  
    }
   }
   if(((JSON.stringify(temp)).match("Diamonds"))||(JSON.stringify(temp)).match("Hearts"))
   {
    if(((JSON.stringify(obj)).match("Diamonds"))||(JSON.stringify(obj)).match("Hearts"))
    {
      if(player=='u')
      {
        console.log("match red-red user")
        score_user=commanstack.length+score_user; 
        commanstack=[];
        //card.classList.remove("card",cardSuit.toLowerCase());
        plain_cardopc.innerHTML="You got points"
        document.body.appendChild(plain_cardopc);
        
        scoreboard_user.innerHTML="Score: "+score_user;
        return;
      }
      if(player=='c')
      {
        console.log("match red-red comp")
        score_comp=commanstack.length + score_comp; 
        commanstack=[];
        //card.classList.remove("card",cardSuit.toLowerCase());
        plain_cardopc.innerHTML="I got points"
        document.body.appendChild(plain_cardopc);
        
        scoreboard_comp.innerHTML="Score: "+score_comp;
        return;
      }
    }
    if(player=='u')
      {
        scoreboard_user.innerHTML="Score: "+score_user;
        return ;
      }
      if(player=='c')
      {
        scoreboard_user.innerHTML="Score: "+score_comp;
        return ;
      }
    
   }

 }


  function frontCard_comp(cards) {
    if(turn=='u'&& turn!='a')
    {
      console.log("Hey its not my turn!")
      return;
    }
    count_click_comp++;
    

    if(classaddflagcomp==true && cardset.length<=51 && count_click_comp<=26)
    {
      card.classList.remove("card",cardSuit.toLowerCase());
      document.body.appendChild(plain_card);
    }
    
    while(cardset.length<=51 && flag===false && count_click_comp<=26)
    {
    
      const random = Math.floor(Math.random() * 51);
      cardValue = cards[random].value;
      cardSuit = cards[random].suit;

      let obj= [cardValue,cardSuit];
      for(i=0;i<cardset.length;i++)
      {
        if(JSON.stringify(cardset[i])===JSON.stringify(obj))
        {
          flag=true;
          break;
        }
      }
      if(flag==false)
      {
        
         let name;
         cardSuit === "Diamonds"? (name = "&diams;"): (name = "&" + cardSuit.toLowerCase() + ";");
         card.classList.add("card", cardSuit.toLowerCase());
         card.innerHTML = '<span class="card-value-suit top">' + cardValue + name + "</span>" + '<span class="card-suit">' + name + "</span>" + '<span class="card-value-suit bot">' + cardValue + name + "</span>";
         document.body.appendChild(card);
         cardset.push(obj);
         stackops(obj,'c');
         break;
      }
      
        flag=false;
  
      }
      classaddflagcomp=true;
      turn='u';
    }
  

    
  
